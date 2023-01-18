<script lang="ts">
  import "../app.css";
  import { account } from "$lib/svark";
  import Connect from "$lib/components/Connect.svelte";
</script>

<main class="font-ibm h-full">
  {#if $account.connected}
    <slot />
  {:else}
    <Connect />
  {/if}
</main>

<style>
</style>
