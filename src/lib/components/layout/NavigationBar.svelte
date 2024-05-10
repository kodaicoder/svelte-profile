<script lang="ts">
	import GearIcon from './../icons/GearIcon.svelte';
	import type ISocialLink from '$lib/types/ISocialLink';
	import type IMenu from '$lib/types/IMenu';

	import { slide } from 'svelte/transition';
	import { AppBar } from '@skeletonlabs/skeleton';
	import SocialLink from '$lib/components/generic/SocialLink.svelte';
	import MenuLink from '$lib/components/generic/MenuLink.svelte';
	import { isMobileStore } from '$lib/stores/IsMobileStore';
	import { isHamburgerMenuOpenStore } from '$lib/stores/IsHamburgerMenuOpenStore';
	import { Hamburger } from 'svelte-hamburgers';
	import LogoutButton from '$lib/components/generic/LogoutButton.svelte';

	import { page } from '$app/stores';

	$: if (!$isMobileStore) isHamburgerMenuOpenStore.set(false);

	let windowWidth: number;
	export let isAdmin: boolean = false;
	export let menuList: IMenu[];
	export let socialLinkList: ISocialLink[] = [];
	export let isAuth: boolean = false;

	$: socialLinkList = [
		...socialLinkList,
		{
			id: 0,
			userId: 0,
			link: $page.data.email,
			isActive: true,
			image: {
				id: 0,
				url: 'https://0fcenei9aeidllgh.public.blob.vercel-storage.com/social/2/ic--baseline-email-145msE8P7595iiLv0OjoUz021Yjx4e.svg',
				isActive: true,
				socialLinkId: 0
			}
		}
	];
</script>

<svelte:window bind:outerWidth={windowWidth} />
<div transition:slide={{ delay: 20, duration: 200 }}>
	<AppBar
		slotDefault="place-self-center"
		slotLead=" ml-4 "
		slotTrail=" mr-4"
		padding="p-3 md:p-4"
		border="neon"
	>
		<svelte:fragment slot="lead">
			<h4 class="tracking-widest">
				{@html `<span class="text-2xl font-extrabold text-primary-500 leading-3">|<</span>odai Coder`}
			</h4>
			{#if isAdmin}
				<a href="/management" class="ml-4 h-8 w-8" title="go to management">
					<GearIcon class="hover:svg-neon" />
				</a>
			{/if}
		</svelte:fragment>
		{#if !$isMobileStore && windowWidth > 0}
			<ul class="flex gap-16">
				{#each menuList as menu}
					<MenuLink {menu} />
				{/each}
			</ul>
		{/if}

		<svelte:fragment slot="trail">
			{#if !$isMobileStore && windowWidth > 1200}
				<ul class="flex gap-8">
					{#each socialLinkList as socialLink}
						<SocialLink {socialLink} />
					{/each}
				</ul>
				{#if isAuth}
					<LogoutButton />
				{/if}
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
