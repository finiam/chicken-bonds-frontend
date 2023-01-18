<script lang="ts">
  import { uint256 } from "starknet";
  import { connect, account, contracts } from "$lib/svark";

  let inputAmount: number;

  const manager = $contracts.manager;

  console.log(manager)

  async function handleSubmit() {
    const amount = uint256.bnToUint256(inputAmount.toString());
    $manager.create_bond(amount);
  }
</script>

<div>
  <form on:submit|preventDefault={handleSubmit}>
    <input
      type="number"
      name="amount"
      bind:value={inputAmount}
      class="border border-gray-600"
    />

    {#if $account.connected}
      <button type="submit">Create</button>
    {:else}
      <button type="button" on:click={() => connect.connectWallet()}>
        Connect wallet
      </button>
    {/if}
  </form>
</div>
