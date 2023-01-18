<script lang="ts">
  import { uint256 } from "starknet";
  import { contracts } from "$lib/svark";

  let inputAmount: number;

  const manager = $contracts.manager;

  async function handleSubmit() {
    const amount = uint256.bnToUint256(inputAmount.toString());
    console.log($manager)
    $manager.create_bond(amount);
  }
</script>

<div>
  <h2 class="text-2xl">Create new bond</h2>

  <form on:submit|preventDefault={handleSubmit}>
    <input
      type="number"
      name="amount"
      bind:value={inputAmount}
      class="border border-gray-600"
    />
    <button type="submit">Create</button>
  </form>
</div>
