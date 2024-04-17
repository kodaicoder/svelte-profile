<script lang="ts">
	import type IShowCaseCard from '$lib/types/IShowCaseCard';
	import { isMobileStore } from '$lib/stores/IsMobileStore';
	import GithubIcon from '$lib/components/icons/GithubIcon.svelte';
	// import LinkIcon from '$lib/components//icons/LinkIcon.svelte';

	export let cardData: IShowCaseCard;
	export let imagePosition: 'left' | 'right' = 'left';
</script>

<div class="card flex h-full flex-col gap-4 p-4 md:flex-row">
	<div>
		<img
			src={cardData.images[0]}
			alt={cardData.title}
			class="size-full rounded-xl object-cover"
			class:order-1={imagePosition == 'right' && !$isMobileStore}
		/>
	</div>
	<div class="flex w-full flex-1 flex-col gap-4">
		<h1>{cardData.title}</h1>
		<p class="max-h-[30dvh] flex-1 overflow-auto md:max-h-[45dvh]">
			{cardData.content}
		</p>
		<div class="mt-auto flex w-full items-center justify-between">
			<ul class="flex items-center justify-around gap-8">
				{#if cardData.sourceLink}
					<li>
						<a
							title="Source code"
							href={cardData.sourceLink}
							target="_blank"
							rel="noopener noreferrer"
							class="flex h-8 w-8 items-center justify-center"
						>
							<GithubIcon />
						</a>
					</li>
				{/if}
			</ul>
			<a
				class="btn variant-gradient-primary-secondary ml-auto bg-gradient-to-br"
				href={cardData.link}
				target="_blank"
				rel="noopener noreferrer"
			>
				{#if cardData.sourceLink}
					Demo link
				{:else}
					Read more ...
				{/if}
			</a>
		</div>
	</div>
</div>

<!-- <div class="card grid grid-cols-1 grid-rows-4 gap-4 p-4 md:grid-cols-2 md:grid-rows-3">
	<img
		src={cardData.images[0]}
		alt={cardData.title}
		class="size-[400px] rounded-lg object-cover md:row-span-3"
		class:order-1={imagePosition == 'right' && !$isMobileStore}
	/>
	<h1>{cardData.title}</h1>
	<p class=" h-[50px] overflow-hidden text-sm lg:text-base">
		{cardData.content}
	</p>

	<div class="mt-auto flex w-full items-center justify-between">
		<ul class="flex items-center justify-around gap-8">
			{#if cardData.sourceLink}
				<li>
					<a
						title="Source code"
						href={cardData.sourceLink}
						target="_blank"
						rel="noopener noreferrer"
						class="flex h-8 w-8 items-center justify-center"
					>
						<GithubIcon />
					</a>
				</li>
			{/if}
		</ul>
		<a
			class="btn variant-gradient-primary-secondary ml-auto bg-gradient-to-br"
			href={cardData.link}
			target="_blank"
			rel="noopener noreferrer"
		>
			{#if cardData.sourceLink}
				Demo link
			{:else}
				Read more ...
			{/if}
		</a>
	</div>
</div> -->

<!-- 
<div class="card grid h-full grid-cols-1 gap-4 p-4 md:p-8 lg:grid-cols-2 lg:gap-8">
	<img
		src={cardData.images[0]}
		alt={cardData.title}
		class="h-full w-full rounded-lg object-cover"
		class:order-1={imagePosition == 'right' && !$isMobileStore}
	/>
	<div
		class="flex flex-col items-start gap-4"
		class:order-0={imagePosition == 'right' && !$isMobileStore}
	>
		<h1>{cardData.title}</h1>

		<p
			class="max-h-[30dvh] min-h-[30dvh] overflow-auto text-sm lg:max-h-[42dvh] lg:min-h-[42dvh] lg:text-base"
		>
			{cardData.content}
		</p>

		<div class="mt-auto flex w-full items-center justify-between">
			<ul class="flex items-center justify-around gap-8">
				{#if cardData.sourceLink}
					<li>
						<a
							title="Source code"
							href={cardData.sourceLink}
							target="_blank"
							rel="noopener noreferrer"
							class="flex h-8 w-8 items-center justify-center"
						>
							<GithubIcon />
						</a>
					</li>
				{/if}
			</ul>
			<a
				class="btn variant-gradient-primary-secondary ml-auto bg-gradient-to-br"
				href={cardData.link}
				target="_blank"
				rel="noopener noreferrer"
			>
				{#if cardData.sourceLink}
					Demo link
				{:else}
					Read more ...
				{/if}
			</a>
		</div>
	</div>
</div> -->
