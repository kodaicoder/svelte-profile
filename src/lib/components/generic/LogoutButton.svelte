<!-- <form action="/logout" data-sveltekit-preload-data="off">
	<button class="variant-ghost-error btn {$$props.class}" on:click>Logout</button>
</form> -->

<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import axios from 'axios';
	import Spinner from '$lib/components/icons/Spinner.svelte';

	let loadState = false;

	async function handleLogout(ev: Event) {
		loadState = true;
		ev.preventDefault();
		const response = await axios.get('/api/users/logout');
		if (response.status === 200) {
			window.location.href = '/';
			await invalidateAll();
		}
		loadState = false;
	}
</script>

<button class="variant-ghost-error btn {$$props.class} w-32" on:click={handleLogout}>
	{#if !loadState}
		Logout
	{:else}
		<span class="size-5">
			<Spinner />
		</span>
	{/if}
</button>
