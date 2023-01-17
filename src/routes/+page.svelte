<script lang="ts">
	import contractStore from '$lib/svark/contract';
	import accountStore from '$lib/svark/accountStore';
	import connectStore from '$lib/svark/connectStore';
	import LUSD_ABI from '$lib/data/LUSD_ABI.json';

	contractStore('LUSD', {
		contractAddress: import.meta.env.VITE_CONTRACT_ADDRESS,
		abi: LUSD_ABI,
		providerOrAccount: $accountStore.account
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<p>{$accountStore.address}</p>

{#if !$accountStore.connected}
	<button on:click={() => connectStore.connectWallet()}>Connect</button>
{/if}
