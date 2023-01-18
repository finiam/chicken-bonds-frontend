<script lang="ts">
  import { page } from "$app/stores";
  import type { HTMLAnchorAttributes } from "svelte/elements";

  type $$Props = HTMLAnchorAttributes;

  $: active = $page.url.pathname === $$restProps.href;
</script>

<a
  class="text-amber-400 tracking-widest uppercase font-light"
  class:text-orange-500={active}
  class:font-heavy={active}
  href="/"
  {...$$restProps}
>
  <slot />
</a>
