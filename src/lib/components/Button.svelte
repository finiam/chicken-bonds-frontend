<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";

  type $$Props = HTMLButtonAttributes & {
    fullWidth?: boolean;
  };

  export let fullWidth = false;
</script>

<button
  class="py-4 px-8 text-xl text-center tracking-widest rounded-xl bg-orange-800 hover:bg-orange-700"
  class:w-full={fullWidth}
  on:click
  {...$$restProps}
>
  <slot />
</button>
