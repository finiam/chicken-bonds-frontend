<script lang="ts">
  import { account, connect } from "$lib/svark";
  import Button from "./Button.svelte";
</script>

{#if $account.connected}
  <slot />
{:else}
  <Button
    type="button"
    on:click={() => connect.connectWallet()}
    disabled={$connect.loading}
    fullWidth
  >
    Connect wallet
  </Button>
{/if}
