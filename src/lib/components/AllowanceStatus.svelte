<script lang="ts">
  import user from "$lib/stores/user";
  import type { ContractStore } from "$lib/svark/contract";
  import { number, uint256 } from "starknet";

  export let type: "yearn" | "lusd";
  export let contract: ContractStore;

  let action: string;
  let inputAmount: number;

  async function handleAction() {
    const spender = number.toFelt(import.meta.env.VITE_MANAGER_CONTRACT);
    const amount = uint256.bnToUint256(inputAmount.toString());

    if (action === "increase") {
      $contract.increaseAllowance(spender, amount);
    } else {
      $contract.decreaseAllowance(spender, amount);
    }
  }
</script>

<div>
  <slot name="header" />

  <p>Allowance: {$user.allowance[type]}</p>
  {#if !$user.allowance[type]}
    <p>
      Looks like you don't have any allowance left. You'll need to increase it.
    </p>
  {/if}

  <button
    class="bg-blue-500 text-2xl text-white w-10 h-10 rounded-full"
    on:click={() => (action = "decrease")}>-</button
  >
  <button
    class="bg-blue-500 text-2xl text-white w-10 h-10 rounded-full"
    on:click={() => (action = "increase")}>+</button
  >

  {#if action}
    <form on:submit|preventDefault={handleAction} class="mt-2">
      <input
        type="number"
        name="amount"
        bind:value={inputAmount}
        class="border border-gray-600"
        placeholder="Amount to {action}"
      />
      <button type="submit">OK</button>
    </form>
  {/if}

  {#if !$user.allowance[type]}
    <p>
      Have you approved the contract to manage your allowance yet? You need to
      do that first.
    </p>
    <slot name="approve" />
  {/if}
</div>
