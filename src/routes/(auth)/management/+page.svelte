<script lang="ts">
	import ChatBubbleIcon from '$lib/components/icons/ChatBubbleIcon.svelte';
	import CodeDocumentIcon from '$lib/components/icons/CodeDocumentIcon.svelte';
	import ArticleIcon from '$lib/components/icons/ArticleIcon.svelte';
	import UserEditIcon from '$lib/components/icons/UserEditIcon.svelte';

	import ManagementCard from '$lib/components/generic/ManagementCard.svelte';

	import type IManagementCardData from '$lib/types/IManagementCardData';

	const managementCardDatas: IManagementCardData[] = [
		{
			icon: ChatBubbleIcon,
			text: 'Manage Motto',
			link: '/management/motto'
		},
		{
			icon: CodeDocumentIcon,
			text: 'Manage Project',
			link: '/management/project'
		},
		{
			icon: ArticleIcon,
			text: 'Manage Article',
			link: '/management/article'
		},
		{
			icon: UserEditIcon,
			text: 'Manage Profile',
			link: '/management/profile'
		}
	];
</script>

<div class="grid grid-cols-1 grid-rows-4 place-content-center gap-6 md:grid-cols-2 md:grid-rows-2">
	{#each managementCardDatas as managementCardData}
		<ManagementCard {managementCardData} />
	{/each}
</div>
