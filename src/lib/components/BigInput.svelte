<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";

  type $$Props = HTMLInputAttributes;

  export let value: string;
</script>

<input
  class="block text-xl py-4 px-4 text-center  bg-gray-900 rounded-2xl tracking-wider placeholder:text-neutral-600 w-full max-w-full"
  autocomplete="off"
  bind:value
  {...$$restProps}
/>

<style>
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
</style>
