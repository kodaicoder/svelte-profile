<script lang="ts">
	import type ISocialLink from '$lib/types/ISocialLink';

	import { slide } from 'svelte/transition';
	import { AppBar, LightSwitch } from '@skeletonlabs/skeleton';
	import SocialLink from '$lib/components/generic/SocialLink.svelte';
	import MenuLink from '$lib/components/generic/MenuLink.svelte';
	import { isMobileStore } from '$lib/stores/IsMobileStore';
	import { isHamburgerMenuOpenStore } from '$lib/stores/IsHamburgerMenuOpenStore';
	import { Hamburger } from 'svelte-hamburgers';

	$: if (!$isMobileStore) isHamburgerMenuOpenStore.set(false);

	let windowWidth: number;
	export let menuList: string[];
	export let socialLinkList: ISocialLink[];
</script>

<svelte:window bind:outerWidth={windowWidth} />
<div transition:slide={{ delay: 20, duration: 200 }}>
	<AppBar
		gridColumns="grid-cols-3"
		slotDefault="place-self-center"
		slotLead="place-content-start ml-4 min-w-72"
		slotTrail="place-content-end mr-4"
		padding="p-3 md:p-4"
		border="neon"
	>
		<svelte:fragment slot="lead">
			<h4 class="tracking-widest">
				{@html `<span class="text-2xl font-extrabold text-primary-500 leading-3">|<</span>odai Coder`}
			</h4>
		</svelte:fragment>
		{#if !$isMobileStore && windowWidth > 0}
			<ul class="flex gap-16">
				{#each menuList as menu, idx}
					<MenuLink {menu} />
				{/each}
			</ul>
		{/if}

		<svelte:fragment slot="trail">
			{#if !$isMobileStore && windowWidth > 1200}
				<ul class="flex gap-8">
					{#each socialLinkList as socialLink, idx}
						<SocialLink {socialLink} />
					{/each}
				</ul>
			{/if}
			{#if $isMobileStore}
				<Hamburger
					bind:open={$isHamburgerMenuOpenStore}
					--color="white"
					--padding="0"
					--layer-width="25px"
					--layer-height="3px"
					--layer-spacing="5px"
					--border-radius="99px"
				/>
			{/if}
		</svelte:fragment>
	</AppBar>
</div>
