<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";

  type $$Props = HTMLInputAttributes;

  export let value: string;
</script>

<input bind:value {...$$restProps} />
