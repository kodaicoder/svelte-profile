<script lang="ts">
	import type IShowCaseCard from '$lib/types/IShowCaseCard';
	import { isMobileStore } from '$lib/stores/IsMobileStore';
	import GithubIcon from '$lib/components/icons/GithubIcon.svelte';
	// import LinkIcon from '$lib/components//icons/LinkIcon.svelte';

	export let cardData: IShowCaseCard;
	export let imagePosition: 'left' | 'right' = 'left';
</script>

<div class="card flex h-full flex-col gap-4 p-4 md:flex-row">
	{#if cardData.images}
		<img
			src={cardData.images[0]}
			alt={cardData.title}
			class="h-36 rounded-xl object-cover object-top md:h-[470px] md:w-[600px]"
			class:order-1={imagePosition == 'right' && !$isMobileStore}
		/>
	{/if}

	<div class="flex w-full flex-1 flex-col gap-4 p-2">
		<h2>{cardData.title}</h2>
		<p class="max-h-[30vh] flex-1 overflow-auto md:max-h-[45vh]">
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
							<GithubIcon class="hover:svg-neon fill-on-surface-token" />
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
