<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";

  type $$Props = HTMLButtonAttributes & {
    fullWidth?: boolean;
  };

  export let fullWidth = false;
</script>

<button
  class="py-4 px-8 text-md text-center tracking-widest uppercase font-heavy text-gray-800 rounded-2xl bg-amber-500 enabled:hover:bg-amber-600 transition-colors drop-shadow-md"  
  class:opacity-80={$$restProps.disabled}
  class:w-full={fullWidth}
  on:click
  {...$$restProps}
>
  <slot />
</button>
