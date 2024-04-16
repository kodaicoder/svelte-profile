<script lang="ts">
	import type ISkill from '$lib/types/ISkill';

	// your script goes here
	export let skillData: ISkill;
	export let starPosition: 'left' | 'right' = 'right';
</script>

<li class="flex flex-col items-center justify-start gap-6 md:flex-row">
	<div class=" min-w-60" class:order-2={starPosition == 'left'}>
		<a href={skillData.link} target="_blank" class="flex items-center gap-4">
			<img src={skillData.image} alt={skillData.name} class="size-20 object-contain" />
			<h4 class=" whitespace-nowrap">{skillData.name}</h4>
		</a>
	</div>
	<div class="flex items-center gap-2" class:order-1={starPosition == 'left'}>
		{#each Array(5) as _, index}
			{#if skillData.level - (index + 1) > 0.5}
				<svg
					class="h-10 w-10 text-primary-500"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
				>
					<path
						fill="currentColor"
						d="m5.825 21l1.625-7.025L2 9.25l7.2-.625L12 2l2.8 6.625l7.2.625l-5.45 4.725L18.175 21L12 17.275z"
					/>
				</svg>
			{:else if skillData.level - (index + 1) == 0.5}
				<svg
					class="h-10 w-10 text-primary-500"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
				>
					<path
						fill="currentColor"
						d="m15.15 16.85l-.825-3.6l2.775-2.4l-3.65-.325l-1.45-3.4v7.8zM5.825 21l1.625-7.025L2 9.25l7.2-.625L12 2l2.8 6.625l7.2.625l-5.45 4.725L18.175 21L12 17.275z"
					/>
				</svg>
			{:else}
				<svg
					class="h-10 w-10 text-primary-500"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
				>
					<path
						fill="currentColor"
						d="m8.85 16.825l3.15-1.9l3.15 1.925l-.825-3.6l2.775-2.4l-3.65-.325l-1.45-3.4l-1.45 3.375l-3.65.325l2.775 2.425zM5.825 21l1.625-7.025L2 9.25l7.2-.625L12 2l2.8 6.625l7.2.625l-5.45 4.725L18.175 21L12 17.275zM12 12.25"
					/>
				</svg>
			{/if}
		{/each}
	</div>
</li>
