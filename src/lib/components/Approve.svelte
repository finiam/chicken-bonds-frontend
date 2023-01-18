<script lang="ts">
  import accountStore from "$lib/svark/accountStore";
  import { number, uint256 } from "starknet";
  import { onMount } from "svelte";
  import parseUint256 from "$lib/utils/parseUint256";
  import type { ContractStore } from "$lib/svark/contract";

  export let contract: ContractStore;
  export let name: string;

  let ready = false;
  let allowance = 0;
  let owner = "";
  let inputAmount = 0;

  onMount(async () => {
    let reqOwner = await $contract.owner();

    owner = number.bigNumberishArrayToHexadecimalStringArray(reqOwner)[0];

    let allowanceReq = await $contract.allowance(
      number.toFelt(owner),
      number.toFelt($accountStore.address)
    );

    allowance = parseUint256(allowanceReq);
    ready = true;
  });

  async function approve() {
    const spender = number.toFelt($accountStore.address);
    const amount = uint256.bnToUint256(inputAmount.toString());

    $contract.approve(spender, amount);
  }
</script>

<p>{name}</p>
{#if !allowance && ready}
  <form on:submit|preventDefault={approve}>
    <input type="number" name="amount" bind:value={inputAmount} />
    <button type="submit">Approve</button>
  </form>
{:else}
  <p>Current allowance: {allowance}</p>
{/if}
