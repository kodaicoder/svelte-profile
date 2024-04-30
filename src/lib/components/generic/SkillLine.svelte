<script lang="ts">
	import type ISkill from '$lib/types/ISkill';
	import BlankStarIcon from '../icons/BlankStarIcon.svelte';
	import FullStarIcon from '../icons/FullStarIcon.svelte';
	import HalfStarIcon from '../icons/HalfStarIcon.svelte';

	// your script goes here
	export let skillData: ISkill;
	export let starPosition: 'left' | 'right' = 'right';
</script>

<li class="flex flex-col items-center justify-start gap-6 md:flex-row">
	<div class=" min-w-60" class:order-2={starPosition == 'left'}>
		<a href={skillData.link} target="_blank" class="flex items-center gap-4">
			<img src={skillData.image.url} alt={skillData.name} class="size-20 object-contain" />
			<h4 class=" whitespace-nowrap">{skillData.name}</h4>
		</a>
	</div>
	<div class="flex items-center gap-2 *:h-8 *:w-8" class:order-1={starPosition == 'left'}>
		{#each Array(5) as _, index}
			{#if skillData.level - index > 0.5}
				<FullStarIcon class="svg-neon" />
			{:else if skillData.level - index == 0.5}
				<HalfStarIcon class="svg-neon" />
			{:else}
				<BlankStarIcon class="svg-neon" />
			{/if}
		{/each}
	</div>
</li>
