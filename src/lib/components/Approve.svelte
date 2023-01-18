<script lang="ts">
  import { number, uint256 } from "starknet";
  import type { ContractStore } from "$lib/svark/contract";

  export let contract: ContractStore;
  let inputAmount = 0;

  async function approve() {
    const spender = number.toFelt(import.meta.env.VITE_MANAGER_CONTRACT);
    const amount = uint256.bnToUint256(inputAmount.toString());

    $contract.approve(spender, amount);
  }
</script>

<form on:submit|preventDefault={approve}>
  <input
    type="number"
    name="amount"
    bind:value={inputAmount}
    class="border border-gray-600"
  />
  <button type="submit">Approve</button>
</form>
