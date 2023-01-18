<script lang="ts">
  import AuthedButton from "$lib/components/AuthedButton.svelte";
  import BigInput from "$lib/components/BigInput.svelte";
  import { uint256 } from "starknet";
  import userStore from "$lib/stores/user";
  import { account, contracts } from "$lib/svark";

  $: hasFunds = $userStore.allowance.lusd > 0 && $userStore.allowance.yearn > 0;
  $: needsApprovals =
    !hasFunds && $account.connected && !$userStore.allowance.loading;

  let amount: number;
  let manager = $contracts.manager;

  function handleSubmit() {
    const value = uint256.bnToUint256(amount.toString());
    $manager.create_bond(value);
  }
</script>

<div>
  <p>Create new chicken bond</p>

  {#if needsApprovals}
    <div>
      <p>
        Looks like you don't have any remaining balance. To create a chicken
        bond you'll first need to grant approval for our contract to manage your
        LUSD.
      </p>
      <a href="app/allowances">Manage allowances</a>
    </div>
  {/if}

  <form on:submit|preventDefault={handleSubmit}>
    <BigInput
      type="number"
      name="amount"
      class="border border-grey-400"
      bind:value={amount}
    />
    <AuthedButton><button type="submit">Create</button></AuthedButton>
  </form>
</div>
