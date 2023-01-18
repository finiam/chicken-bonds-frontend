<script lang="ts">
  import { connect } from "$lib/svark";
</script>

<section class="flex items-center justify-center h-full">
  <button on:click={() => connect.connectWallet()}>Connect</button>
</section>
