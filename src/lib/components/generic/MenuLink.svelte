<script lang="ts">
	import type { DrawerStore } from '@skeletonlabs/skeleton';
	import type IMenu from '$lib/types/IMenu';

	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import { isHamburgerMenuOpenStore } from '$lib/stores/IsHamburgerMenuOpenStore';
	import { page } from '$app/stores';

	export let menu: IMenu;
	let scrollY: number;

	const drawerStore: DrawerStore = getDrawerStore();

	function menuClickHandler() {
		drawerStore.close();
		isHamburgerMenuOpenStore.set(false);

		const element = document.getElementById(menu.text.toLowerCase().replace(/\s/g, ''));
		if (element) element.scrollIntoView({ behavior: 'smooth' });
	}
</script>

<svelte:window bind:scrollY />
<li>
	{#if menu.link === '' || menu.link === undefined}
		<button
			class=" hover:text-neon flex h-10 w-full items-center justify-center whitespace-nowrap text-white md:h-6"
			on:click={menuClickHandler}
		>
			{menu.text}
		</button>
	{:else}
		<a
			href={menu.link}
			class=" hover:text-neon flex h-10 w-full items-center justify-center whitespace-nowrap text-white md:h-6"
			class:text-neon={$page.url.pathname === menu.link}
		>
			{menu.text}
		</a>
	{/if}
</li>
