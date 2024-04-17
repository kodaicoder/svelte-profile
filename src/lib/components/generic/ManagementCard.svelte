<script lang="ts">
	import { goto } from '$app/navigation';
	import type IManagementCardData from '$lib/types/IManagementCardData';
	export let managementCardData: IManagementCardData;
</script>

<a
	class=" group card card-hover grid min-h-56 grid-flow-col place-content-center gap-4"
	href={managementCardData.link}
>
	<svelte:component this={managementCardData.icon} class="group-hover:svg-neon size-8 md:size-10" />
	<span class="group-hover:text-neon text-2xl md:text-4xl">{managementCardData.text}</span>
</a>
