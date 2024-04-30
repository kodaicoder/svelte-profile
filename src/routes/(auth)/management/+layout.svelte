<script lang="ts">
	import type { LayoutData } from './$types';
	import type IMenu from '$lib/types/IMenu';

	import NavigationBar from '$lib/components/layout/NavigationBar.svelte';
	import SideBar from '$lib/components/layout/SideBar.svelte';
	import { AppShell } from '@skeletonlabs/skeleton';

	export let data: LayoutData;

	const menuList: IMenu[] = [
		{
			text: 'Home',
			link: '/'
		},
		{
			text: 'Motto',
			link: '/management/motto'
		},
		{
			text: 'Project',
			link: '/management/project'
		},
		{
			text: 'Article',
			link: '/management/article'
		},
		{
			text: 'Profile',
			link: '/management/profile'
		}
	];
</script>

<SideBar {menuList} isAuth={true} />
<AppShell
	regionPage="scroll-smooth snap-y snap-mandatory"
	slotPageHeader="left-1 z-20 m-1 mb-3 w-full pr-4 md:pr-8"
>
	<svelte:fragment slot="pageHeader">
		<NavigationBar {menuList} isAuth={true} isAdmin={data.isAdmin} />
	</svelte:fragment>

	<div class="mx-4 mt-4 md:mx-16">
		<slot />
	</div>
</AppShell>
