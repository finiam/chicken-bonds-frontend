<script lang="ts">
  import contractStore from "$lib/svark/contract";
  import accountStore from "$lib/svark/accountStore";
  import connectStore from "$lib/svark/connectStore";
  import LUSD_ABI from "$lib/data/LUSD_ABI.json";
  import YEARN_ABI from "$lib/data/YEARN_ABI.json";
  import Approve from "$lib/components/Approve.svelte";

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
  <Approve />
{/if}
