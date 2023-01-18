<script lang="ts">
  import AuthedButton from "$lib/components/AuthedButton.svelte";
  import BigInput from "$lib/components/BigInput.svelte";
  import { uint256 } from "starknet";
  import userStore from "$lib/stores/user";
  import { account, balance, contracts } from "$lib/svark";
  import Button from "$lib/components/Button.svelte";

  $: hasFunds = $userStore.allowance.lusd > 0 && $userStore.allowance.yearn > 0;
  $: needsApprovals =
    !hasFunds && $account.connected && !$userStore.allowance.loading;

  let manager = $contracts.manager;

  function handleSubmit(event: Event) {
    const data = new FormData(event.target as HTMLFormElement);
    const input = data.get("amount") as string;
    const valueAsUint = uint256.bnToUint256(input);

    $manager.create_bond(valueAsUint);
  }
</script>

<div class="flex items-center h-full">
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

  <form
    on:submit|preventDefault={handleSubmit}
    class="flex flex-col gap-4 justify-center items-center w-96 mx-auto py-8 px-12 bg-gray-800 rounded-3xl drop-shadow-xl"
  >
    <p class="text-sm font-heavy text-center text-gray-300">New Chicken Bond</p>
    <BigInput type="number" name="amount" placeholder="LUSD amount" required />
    <AuthedButton>
      <Button
        fullWidth
        type="submit"
        disabled={needsApprovals || $userStore.allowance.loading}
      >
        Create
      </Button>
    </AuthedButton>
  </form>
</div>
