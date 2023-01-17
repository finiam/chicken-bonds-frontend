<script lang="ts">
  import contractsStore from "$lib/svark/contractsStore";
  import accountStore from "$lib/svark/accountStore";
  import { number, uint256 } from "starknet";
  import { onMount } from "svelte";
  import parseUint256 from "$lib/utils/parseUint256";

  let ready = false;
  let allowance = 0;
  let owner = "";
  let inputAmount = 0;

  const yearnCt = $contractsStore.yearnLUSD;

  onMount(async () => {
    let reqOwner = await $yearnCt.owner();

    owner = number.bigNumberishArrayToHexadecimalStringArray(reqOwner)[0];

    let allowanceReq = await $yearnCt.allowance(
      number.toFelt(owner),
      number.toFelt($accountStore.address)
    );

    allowance = parseUint256(allowanceReq);
    ready = true;
  });

  async function approveYearn() {
    const spender = number.toFelt($accountStore.address);
    const amount = uint256.bnToUint256(inputAmount.toString());

    $yearnCt.approve(spender, amount);
  }
</script>

<p>Yearn</p>
{#if !allowance && ready}
  <form on:submit|preventDefault={approveYearn}>
    <input type="number" name="amount" bind:value={inputAmount} />
    <button type="submit">Approve</button>
  </form>
{:else}
  <p>Current allowance: {allowance}</p>
{/if}
