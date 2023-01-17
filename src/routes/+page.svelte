<script lang="ts">
  import contractStore from "$lib/svark/contract";
  import accountStore from "$lib/svark/accountStore";
  import connectStore from "$lib/svark/connectStore";
  import LUSD_ABI from "$lib/data/LUSD_ABI.json";
  import YEARN_ABI from "$lib/data/YEARN_ABI.json";
  import LusdApprove from "$lib/components/LUSDApprove.svelte";
  import YearnApprove from "$lib/components/YearnApprove.svelte";

  async function connect() {
    await connectStore.connectWallet();

    contractStore("LUSD", {
      contractAddress: import.meta.env.VITE_LUSD_CONTRACT,
      abi: LUSD_ABI,
      providerOrAccount: $accountStore.account
    });
    contractStore("yearnLUSD", {
      contractAddress: import.meta.env.VITE_YEARN_CONTRACT,
      abi: YEARN_ABI,
      providerOrAccount: $accountStore.account
    });
  }
</script>

<h1>Chicken bonds</h1>

{#if !$accountStore.connected}
  <button on:click={connect}>Connect</button>
{:else}
  <p>
    Hello, {$accountStore.address.substring(
      0,
      4
    )}...{$accountStore.address.slice(-5)}
  </p>
  <p>
    To begin, you'll have to authorize the smart contracts to manage your LUSD,
    and yearn LUSD. You can specify how much LUSD is controlled by the contract.
  </p>
  <LusdApprove />
  <YearnApprove />
{/if}
