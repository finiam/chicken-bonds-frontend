<script lang="ts">
  import { account, contract } from "$lib/svark";
  import LUSD_ABI from "$lib/data/LUSD_ABI.json";
  import YEARN_ABI from "$lib/data/YEARN_ABI.json";
  import MANAGER_ABI from "$lib/data/MANAGER_ABI.json";

  contract("lusd", {
    contractAddress: import.meta.env.VITE_LUSD_CONTRACT,
    abi: LUSD_ABI,
    providerOrAccount: $account.account
  });
  contract("yearn", {
    contractAddress: import.meta.env.VITE_YEARN_CONTRACT,
    abi: YEARN_ABI,
    providerOrAccount: $account.account
  });
  contract("manager", {
    contractAddress: import.meta.env.VITE_MANAGER_CONTRACT,
    abi: MANAGER_ABI,
    providerOrAccount: $account.account
  });
</script>

<!-- <div class="font-ibm h-full">
  {#if $account.connected}
    <main class="max-w-5xl pt-6 mx-auto">
      <slot />
    </main>
  {:else}
    <Connect />
  {/if}
</div>
 -->
<main>
  <nav>
    <a href="app/create-bond">Create bond</a>
    <a href="app/manage">Manage bonds</a>
    <a href="app/readeem">Redeem</a>
  </nav>
  <slot />
</main>
