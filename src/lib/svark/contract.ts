import type { Abi } from "starknet";
import { AccountInterface, Contract, ProviderInterface } from "starknet";
import { get, writable } from "svelte/store";
import type { Writable } from "svelte/store";
import contractsStore from "./contractsStore";

// Contract instance store. Adds the instance to the balances store, allowing the
// contract to be accessed and methods called from anywhere in the app

export type ContractStore = Writable<Contract>;

type ContractProps = {
  contractAddress: string;
  abi: Abi;
  providerOrAccount: ProviderInterface | AccountInterface;
};

export default function contract(
  name: string,
  config: ContractProps
): ContractStore {
  const store = writable<Contract>(
    new Contract(config.abi, config.contractAddress, config.providerOrAccount)
  );

  contractsStore.addContract(name, store);

  return store;
}
