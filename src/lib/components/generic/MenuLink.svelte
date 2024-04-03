<script lang="ts">
	import type { DrawerStore } from '@skeletonlabs/skeleton';

	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import { isHamburgerMenuOpenStore } from '$lib/stores/IsHamburgerMenuOpenStore';

	export let menu: string;
	let scrollY: number;
	let targetElement: HTMLElement | null;

	const drawerStore: DrawerStore = getDrawerStore();

	function menuClickHandler(event: Event) {
		drawerStore.close();
		isHamburgerMenuOpenStore.set(false);
	}
</script>

<svelte:window bind:scrollY />
<li>
	<a
		href={`#${menu.toLowerCase().replace(/\s/g, '')}`}
		class="flex h-10 w-full items-center justify-center whitespace-nowrap text-white hover:text-red-500 md:h-6"
		on:click={menuClickHandler}>{menu}</a
	>
</li>
