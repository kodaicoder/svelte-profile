<script lang="ts">
	import type { DrawerStore } from '@skeletonlabs/skeleton';

	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import { isHamburgerMenuOpenStore } from '$lib/stores/IsHamburgerMenuOpenStore';

	export let menu: string;
	let scrollY: number;
	let targetElement: HTMLElement | null;

	const drawerStore: DrawerStore = getDrawerStore();

	function menuClickHandler() {
		drawerStore.close();
		isHamburgerMenuOpenStore.set(false);

		const element = document.getElementById(menu.toLowerCase().replace(/\s/g, ''));
		if (element) element.scrollIntoView({ behavior: 'smooth' });
	}
</script>

<svelte:window bind:scrollY />
<li>
	<button
		class=" hover:text-neon flex h-10 w-full items-center justify-center whitespace-nowrap text-white md:h-6"
		on:click={menuClickHandler}
	>
		{menu}
	</button>
</li>
