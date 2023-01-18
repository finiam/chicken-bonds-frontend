<script lang="ts">
  import "../app.css";
  import { account } from "$lib/svark";
  import Connect from "$lib/components/Connect.svelte";
</script>

<div class="font-ibm h-full">
  {#if $account.connected}
    <main class="max-w-5xl pt-6 mx-auto">
      <slot />
    </main>
  {:else}
    <Connect />
  {/if}
</div>

<style>
</style>
