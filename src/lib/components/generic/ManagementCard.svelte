<script lang="ts">
	import { goto } from '$app/navigation';
	import type IManagementCardData from '$lib/types/IManagementCardData';
	export let managementCardData: IManagementCardData;
</script>

<button
	class="group card card-hover grid min-h-60 grid-flow-col place-content-center gap-4"
	on:click={() => goto(managementCardData.link)}
>
	<svelte:component this={managementCardData.icon} class="group-hover:svg-neon size-12" />
	<span class="group-hover:text-neon text-4xl">{managementCardData.text}</span>
</button>
