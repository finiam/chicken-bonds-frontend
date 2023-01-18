<script lang="ts">
  import { account, connect } from "$lib/svark";
</script>

{#if $account.connected}
  <slot />
{:else}
  <button type="button" on:click={() => connect.connectWallet()}>
    Connect wallet
  </button>
{/if}
