<script lang="ts">
  import { page } from "$app/stores";
  import type { HTMLAnchorAttributes } from "svelte/elements";

  type $$Props = HTMLAnchorAttributes;

  $: active = $page.url.pathname === $$restProps.href;
</script>

<a
  class="text-amber-400 tracking-widest uppercase"
  class:text-amber-500={active}
  class:font-heavy={active}
  class:font-light={!active}
  href="/"
  {...$$restProps}
>
  <slot />
</a>
