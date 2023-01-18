<script lang="ts">
  import { contracts, account, contract } from "$lib/svark";
  import LUSD_ABI from "$lib/data/LUSD_ABI.json";
  import YEARN_ABI from "$lib/data/YEARN_ABI.json";
  import MANAGER_ABI from "$lib/data/MANAGER_ABI.json";
  import Approve from "$lib/components/Approve.svelte";
  import user from "$lib/stores/user";
  import { onMount } from "svelte";
  import AllowanceStatus from "$lib/components/AllowanceStatus.svelte";
  import CreateBond from "$lib/components/CreateBond.svelte";

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

  let ready = false;

  onMount(async () => {
    await user.getAllAllowances();

    ready = true;
  });
</script>

<header class="mb-4">
  <h1 class="text-2xl font-heavy">Chicken bonds</h1>
  <p class="text-gray-600">
    Hello, {$account.address.substring(0, 4)}...{$account.address.slice(-5)}
  </p>
</header>

{#if ready}
  <div>
    <div class="flex gap-8 mb-8">
      <AllowanceStatus type="lusd" contract={$contracts.lusd}>
        <h2 slot="header" class="text-xl">LUSD</h2>
        <Approve contract={$contracts.lusd} slot="approve" />
      </AllowanceStatus>

      <AllowanceStatus type="yearn" contract={$contracts.yearn}>
        <h2 slot="header" class="text-xl">Yearn LUSD</h2>
        <Approve contract={$contracts.yearn} slot="approve" />
      </AllowanceStatus>
    </div>
    {#if $user.canCreateBond}
      <CreateBond />
    {/if}
  </div>
{:else}
  <p>getting the chickens...</p>
{/if}
