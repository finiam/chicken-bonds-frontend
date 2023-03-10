import { connect, type StarknetWindowObject } from "get-starknet";
/* import { getStarknet } from "get-starknet"; */

import { constants } from "starknet";
import { get, writable } from "svelte/store";
import _baseStore from "./_baseStore";

// Store for the starknet object. Handles account change updates.

const store = writable<StarknetWindowObject>();

const starknetStore = _baseStore(
  store,
  ({ set, subscribe, _subscribeOnce }) => {
    function networkId() {
      try {
        const { chainId } = get(store).provider;

        if (chainId === constants.StarknetChainId.MAINNET) {
          return "mainnet-alpha";
        }

        if (chainId === constants.StarknetChainId.TESTNET) {
          return "goerli-alpha";
        }

        return "localhost";
      } catch (err) {
        console.log(err);

        return null;
      }
    }

    async function handleAccountsChange() {
      const newStarknet = await connect();

      if (newStarknet.account) {
        console.log(`accountsChanged: ${newStarknet.account?.address}`);

        set(newStarknet);
      } else {
        const [address] = await newStarknet.enable({
          showModal: false,
          starknetVersion: "v4"
        } as any);

        console.log(`accountsChanged: ${address}`);

        if (address) set(newStarknet);
      }
    }

    _subscribeOnce((data) => {
      if (!data) {
        console.log("no starknet object available");

        return false;
      }

      data?.on("accountsChanged", handleAccountsChange);

      console.log(
        "starknet object available: accountsChanged listener attached"
      );

      return true;
    });

    return {
      subscribe,
      set,
      networkId,
      handleAccountsChange
    };
  }
);

export default starknetStore;
