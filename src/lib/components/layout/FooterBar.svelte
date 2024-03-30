<script lang="ts">
	import type ISocialLink from '$lib/types/ISocialLink';

	import { AppBar } from '@skeletonlabs/skeleton';
	import SocialLink from '$lib/components/generic/SocialLink.svelte';

	import { isMobileStore } from '$lib/stores/IsMobileStore';
	import { isHamburgerMenuOpenStore } from '$lib/stores/IsHamburgerMenuOpenStore';

	$: if (!$isMobileStore) isHamburgerMenuOpenStore.set(false);

	let windowWidth: number;

	export let socialLinkList: ISocialLink[];
</script>

<svelte:window bind:outerWidth={windowWidth} />
<!-- <AppBar
	regionRowMain="mt-4"
	gridColumns="grid-cols-1"
	slotDefault="place-self-center"
	border="neon !rounded-none !border-0 !border-t-2"
> -->
<div class="footer">
	<div class="my-8 flex justify-center">
		<hr class="neon w-full" />
	</div>
	<div class="flex flex-col items-center justify-center gap-5 text-center tracking-widest">
		<ul class="grid grid-cols-3 grid-rows-2 gap-x-12 gap-y-6 md:grid-cols-6 md:grid-rows-1">
			{#each socialLinkList as socialLink}
				<SocialLink {socialLink} />
			{/each}
		</ul>
		<small>© Copyright 2024. All rights reserved.</small>
	</div>
</div>
<!-- </AppBar> -->
