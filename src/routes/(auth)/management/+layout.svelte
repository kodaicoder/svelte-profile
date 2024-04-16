<script lang="ts">
	import NavigationBar from '$lib/components/layout/NavigationBar.svelte';
	import SideBar from '$lib/components/layout/SideBar.svelte';
	import { AppShell } from '@skeletonlabs/skeleton';

	const menuList: string[] = ['Motto', 'Project', 'Article', 'Profile'];
</script>

<SideBar {menuList} isAuth={true} />
<AppShell
	regionPage="scroll-smooth snap-y snap-mandatory"
	slotPageHeader="left-1 z-20 m-1 mb-3 w-full pr-4 md:pr-8"
>
	<svelte:fragment slot="pageHeader">
		<NavigationBar {menuList} isAuth={true} />
	</svelte:fragment>

	<div class="mx-6 md:mx-24">
		<slot />
	</div>
</AppShell>
