<script lang="ts">
	import { initializeStores } from '@skeletonlabs/skeleton';
	import { isMobileStore } from '$lib/stores/IsMobileStore';
	import '../app.pcss';

	initializeStores();

	let windowWidth: number;
	$: isMobileStore.set(windowWidth < 1024);
</script>

<svelte:window bind:outerWidth={windowWidth} />
<svelte:head>
	<title>KodaiCoder</title>
</svelte:head>

<slot />
