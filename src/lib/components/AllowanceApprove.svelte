<script lang="ts">
  import userStore from "$lib/stores/user";
  import { contracts } from "$lib/svark";
  import { number, uint256 } from "starknet";
  import AuthedButton from "./AuthedButton.svelte";
  import BigInput from "./BigInput.svelte";
  import Button from "./Button.svelte";

  let step: "lusd" | "yearn" = "lusd";

  let lusdC = $contracts.lusd;
  let yearnC = $contracts.lusd;
  let spender = number.toFelt(import.meta.env.VITE_MANAGER_CONTRACT);

  async function handleSubmit(event: Event) {
    event.preventDefault();

    const data = new FormData(event.target as HTMLFormElement);
    const inputVal = data.get("amount") as string;
    const amount = uint256.bnToUint256(inputVal);

    if (step === "lusd") {
      await $lusdC.approve(spender, amount);
      step = "yearn";
    } else {
      await $yearnC.approve(spender, amount);
      userStore.getAllAllowances();
    }
  }
</script>

<div>
  <p class="mb-6 text-center text-grey-300 text-sm">
    To create a new bond, you'll first need to approve a LUSD and Yearn LUSD
    allowance to be managed by the smart contract
  </p>
  <form
    on:submit={handleSubmit}
    class="flex flex-col gap-4 justify-center items-center"
  >
    <BigInput
      type="number"
      name="amount"
      placeholder="{step === 'lusd' ? 'LUSD' : 'Yearn'} allowance"
      required
    />
    <AuthedButton>
      <Button fullWidth type="submit">Approve</Button>
    </AuthedButton>
  </form>
</div>
