<script lang="ts">
  import { balance, contracts, account } from "$lib/svark";
  import { parseUnits } from "ethers/lib/utils";

  let open = false;
  let lusdBal = balance("lusd", {
    contract: $contracts.lusd
  });
  let yearnBal = balance("yearn", {
    contract: $contracts.yearn
  });
</script>

{#if $account.connected}
  <section class="relative -top-3">
    <button
      type="button"
      on:click={() => (open = !open)}
      class="flex items-center gap-2 p-4 rounded-2xl bg-gray-800 hover:bg-neutral-700 transition-opacity"
    >
      <div class="rounded-full h-3 w-3 bg-amber-400" />
      <p class="tracking-widest">
        {$account.address.substring(0, 6)}...{$account.address.slice(-4)}
      </p>
    </button>
    <div />
    <div
      class="mt-2 p-4 absolute border border-neutral-800 rounded-xl opacity-0 transition-opacity"
      class:opacity-100={open}
    >
      <p class="text-gray-400">
        {parseUnits($lusdBal.balance.toString())} LUSD
      </p>
      <p class="text-gray-400">
        {parseUnits($yearnBal.balance.toString())} Yearn LUSD
      </p>
    </div>
  </section>
{/if}
