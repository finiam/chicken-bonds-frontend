import { account, contracts } from "$lib/svark";
import type { ContractStore } from "$lib/svark/contract";
import parseUint256 from "$lib/utils/parseUint256";
import { number } from "starknet";
import { get, writable } from "svelte/store";

export type User = {
  allowance: {
    lusd: number;
    yearn: number;
  };
  canCreateBond: boolean;
};

function user() {
  const store = writable<User>({
    allowance: {
      lusd: 0,
      yearn: 0
    },
    canCreateBond: false
  });

  async function getAllowance(contract: ContractStore) {
    const userAddress = get(account).address;
    const spender = number.toFelt(import.meta.env.VITE_MANAGER_CONTRACT);
    const owner = number.toFelt(userAddress);

    const allowanceReq = await get(contract).allowance(owner, spender);

    return parseUint256(allowanceReq.remaining);
  }

  async function getAllAllowances() {
    const { lusd, yearn } = get(contracts);

    if (!lusd || !yearn) {
      return;
    }

    const lusdVal = await getAllowance(lusd);
    const yearnVal = await getAllowance(yearn);

    store.update((st) => ({
      ...st,
      canCreateBond: lusdVal > 0 && yearnVal > 0,
      allowance: {
        lusd: lusdVal,
        yearn: yearnVal
      }
    }));
  }

  return {
    subscribe: store.subscribe,
    update: store.update,
    getAllAllowances
  };
}

const userStore = user();

account.subscribe(() => userStore.getAllAllowances());

export default userStore;
