<script lang="ts">
	import type { DrawerSettings, DrawerStore } from '@skeletonlabs/skeleton';
	import type ISocialLink from '$lib/types/ISocialLink';
	import type IMenu from '$lib/types/IMenu';

	import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import { Hamburger } from 'svelte-hamburgers';
	import SocialLink from '$lib/components/generic/SocialLink.svelte';
	import { isHamburgerMenuOpenStore } from '$lib/stores/IsHamburgerMenuOpenStore';

	import MenuLink from '$lib/components/generic/MenuLink.svelte';
	import LogoutButton from '$lib/components/generic/LogoutButton.svelte';

	export let menuList: IMenu[];
	export let socialLinkList: ISocialLink[] = [];
	export let isAuth: boolean = false;

	const drawerStore: DrawerStore = getDrawerStore();
	const drawerSettings: DrawerSettings = {
		id: 'main-side-bar',
		position: 'right',
		width: 'w-full',
		rounded: 'rounded-none'
	};

	$: $isHamburgerMenuOpenStore ? drawerStore.open(drawerSettings) : drawerStore.close();
</script>

<Drawer>
	{#if $drawerStore.id === 'main-side-bar'}
		<div class="absolute right-8 top-4">
			<Hamburger
				bind:open={$isHamburgerMenuOpenStore}
				--color="white"
				--padding="0"
				--layer-width="25px"
				--layer-height="3px"
				--layer-spacing="5px"
				--border-radius="99px"
			/>
		</div>

		<div class="flex h-full flex-col items-center justify-evenly p-4">
			{#each menuList as menu, idx}
				<ul class="w-full">
					<MenuLink {menu} />
				</ul>
			{/each}
			<ul class="grid grid-cols-3 grid-rows-2 gap-x-12 gap-y-6 md:grid-cols-6 md:grid-rows-1">
				{#each socialLinkList as socialLink, idx}
					<SocialLink {socialLink} />
				{/each}
			</ul>
			{#if isAuth}
				<LogoutButton />
			{/if}
		</div>
	{/if}
</Drawer>
