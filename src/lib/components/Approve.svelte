<script lang="ts">
  import accountStore from "$lib/svark/accountStore";
  import { number, uint256 } from "starknet";
  import contractsStore from "$lib/svark/contractsStore";
  import { onMount } from "svelte";
    import parseUint256 from "$lib/utils/parseUint256";

  let lusdAmount = 0;
  let yearnAmount = 0;
  let lusdOwner = "";
  let yearnOwner = "";

  const lusdCt = $contractsStore.LUSD;
  const yearnCt = $contractsStore.yearnLUSD;

  onMount(async () => {
    let reqOwner = await $lusdCt.owner();
    lusdOwner = number.bigNumberishArrayToHexadecimalStringArray(reqOwner)[0];
    let allowanceReq = await $lusdCt.allowance(
      number.toFelt(lusdOwner),
      number.toFelt($accountStore.address)
    );
        
  });

  async function approveLUSD() {
    const spender = number.toFelt($accountStore.address);
    const amount = uint256.bnToUint256(lusdAmount.toString());

    $lusdCt.approve(spender, amount);
  }

  async function approveYearnLUSD() {
    const spender = number.toFelt($accountStore.address);
    const amount = uint256.bnToUint256(yearnAmount.toString());
    console.log(amount);

    $yearnCt.approve(spender, amount);
  }
</script>

<p>
  To begin, you'll have to authorize the smart contracts to manage your LUSD,
  and yearn LUSD. You can specify how much LUSD is controlled by the contract.
</p>
<div>
  <p>LUSD</p>
  <form on:submit|preventDefault={approveLUSD}>
    <input type="number" name="amount" bind:value={lusdAmount} />
    <button type="submit">Approve</button>
  </form>
</div>
<div>
  <p>Yearn LUSD</p>
  <form on:submit|preventDefault={approveYearnLUSD}>
    <input type="number" name="amount" bind:value={yearnAmount} />
    <button type="submit">Approve</button>
  </form>
</div>
