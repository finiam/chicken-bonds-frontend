<script lang="ts">
  import { account, contract } from "$lib/svark";
  import LUSD_ABI from "$lib/data/LUSD_ABI.json";
  import YEARN_ABI from "$lib/data/YEARN_ABI.json";
  import MANAGER_ABI from "$lib/data/MANAGER_ABI.json";
  import NavLink from "$lib/components/NavLink.svelte";

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

<main class="w-11/12 md:max-w-5xl mx-auto md:py-8">
  <nav class="flex gap-8 w-full justify-center mt-16 mb-10">
    <NavLink href="/app/create-bond">Create bond</NavLink>
    <NavLink href="/app/manage-bonds">Manage bonds</NavLink>
    <NavLink href="/app/redeem">Redeem</NavLink>
  </nav>
  <slot />
</main>
