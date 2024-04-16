<script lang="ts">
	// Default theme
	import '@splidejs/svelte-splide/css';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import ShowCaseCard from './ShowCaseCard.svelte';
	import type IShowCaseCard from '$lib/types/IShowCaseCard';
	import { isMobileStore } from '$lib/stores/IsMobileStore';

	export let cardDatas: IShowCaseCard[];
	export let imagePosition: 'left' | 'right' = 'left';

	$: splideOption = {
		rewind: true,
		gap: '4rem',
		padding: { left: $isMobileStore ? '0' : '4rem', right: $isMobileStore ? '0' : '4rem' },
		arrows: !$isMobileStore
	};

	let searchedDatas = cardDatas;

	function handleSearch(event: Event) {
		const searchValue = (event.target as HTMLInputElement).value.toLowerCase();
		if (searchValue) {
			searchedDatas = cardDatas.filter((data) => {
				return data.title.toLowerCase().includes(searchValue);
			});
		} else {
			searchedDatas = cardDatas;
		}
	}
</script>

<input
	class="input mx-auto mb-4 w-full md:mx-12 md:ml-16 md:w-60"
	title="Input (search)"
	type="search"
	placeholder="Search title ..."
	on:keyup={handleSearch}
/>

<Splide aria-label="Testing carousel" options={splideOption}>
	{#if searchedDatas.length === 0}
		<SplideSlide>
			<div class="grid h-full place-content-center">
				<h3>No data found</h3>
			</div>
		</SplideSlide>
	{:else}
		{#each searchedDatas as data}
			<SplideSlide>
				<ShowCaseCard cardData={data} {imagePosition} />
			</SplideSlide>
		{/each}
	{/if}
</Splide>
