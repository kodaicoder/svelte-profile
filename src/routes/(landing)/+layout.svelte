<script lang="ts">
	import type { LayoutData } from './$types';
	import type IMenu from '$lib/types/IMenu';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { AppShell } from '@skeletonlabs/skeleton';
	import NavigationBar from '$lib/components/layout/NavigationBar.svelte';

	import { isTopNavShowStore } from '$lib/stores/IsTopNavShowStore';

	import SideBar from '$lib/components/layout/SideBar.svelte';

	import ToTopButton from '$lib/components/generic/ToTopButton.svelte';
	import { onMount } from 'svelte';

	injectSpeedInsights();

	export let data: LayoutData;

	const menuList: IMenu[] = [
		{ text: 'Skill' },
		{ text: 'Article' },
		{ text: 'Project' },
		{ text: 'About Me' }
	];
	const socialLinkList = data.socialLinks;
	let previousFromTop = 0;
	let isShowToTopButton = false;

	function scrollEventHandler(event: Event) {
		const currentFromTop = (event.target as HTMLElement).scrollTop;

		if (currentFromTop > 600) {
			isShowToTopButton = true;
		}

		if (currentFromTop > previousFromTop) {
			isTopNavShowStore.set(false);
		}
		if (currentFromTop <= 100) {
			isTopNavShowStore.set(true);
			isShowToTopButton = false;
		}

		previousFromTop = currentFromTop;
	}

	onMount(() => {
		isTopNavShowStore.set(true);
	});
</script>

<SideBar {menuList} {socialLinkList} />
<AppShell
	regionPage="scroll-smooth snap-y  snap-mandatory"
	slotPageHeader="fixed top-1 left-1 z-20 m-1 mb-3 w-full pr-4 md:pr-8"
	on:scroll={scrollEventHandler}
>
	<svelte:fragment slot="pageHeader">
		{#if $isTopNavShowStore}
			<NavigationBar {menuList} {socialLinkList} isAdmin={data.isAdmin} />
		{/if}
	</svelte:fragment>

	<div class="mx-6 md:mx-24">
		<slot {socialLinkList} />
	</div>
</AppShell>
{#if isShowToTopButton}
	<ToTopButton />
{/if}
