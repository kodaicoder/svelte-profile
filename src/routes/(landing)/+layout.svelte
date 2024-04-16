<script lang="ts">
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { AppShell } from '@skeletonlabs/skeleton';
	import NavigationBar from '$lib/components/layout/NavigationBar.svelte';

	import { isTopNavShowStore } from '$lib/stores/IsTopNavShowStore';
	import { socialLinkStore } from '$lib/stores/SocialLinkStore';
	import { mottoStore } from '$lib/stores/MottoStore';
	import SideBar from '$lib/components/layout/SideBar.svelte';

	import ToTopButton from '$lib/components/generic/ToTopButton.svelte';
	import { onMount } from 'svelte';

	injectSpeedInsights();

	const menuList: string[] = ['Skill', 'Article', 'Project', 'About Me'];
	const socialLinkList = $socialLinkStore;
	mottoStore.set([
		'"Make it work, make it right, make it fast." - Kent Beck',
		'"Code is like humor. When you have to explain it, it\'s bad." - Cory House',
		'"Before software can be reusable it first has to be usable." - Ralph Johnson',
		'"Fix the cause, not the symptom." - Steve Maguire',
		'"Good code is its own best documentation." - Steve McConnell',
		'"Code never lies, comments sometimes do." - Ron Jeffries',
		'"Don\'t repeat yourself." - Andrew Hunt and David Thomas',
		'"Simplicity is the ultimate sophistication." - Leonardo da Vinci',
		'"Programming isn\'t about what you know; it\'s about what you can figure out." - Chris Pine'
	]);

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
		// isTopNavShowStore.set(currentFromTop < previousFromTop);
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
			<NavigationBar {menuList} {socialLinkList} />
		{/if}
	</svelte:fragment>

	<div class="mx-6 md:mx-24">
		<slot {socialLinkList} />
	</div>

	<!-- <svelte:fragment slot="pageFooter">
		<FooterBar {socialLinkList} />
	</svelte:fragment> -->
</AppShell>
{#if isShowToTopButton}
	<ToTopButton />
{/if}
