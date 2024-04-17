<script lang="ts">
	import type { IMotto } from '$lib/types/IMotto';
	import axios from 'axios';
	import Typewriter from 'svelte-typewriter';

	const typeWriterSetting = {
		mode: 'loop',
		wordInterval: 3000
	};

	async function getAllMotto(): Promise<string[]> {
		const data = await axios
			.get('/api/motto/getAllMotto')
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				console.error(error);
			});

		if (data) {
			return data.map((motto: IMotto) => `${motto.content} - ${motto.author}`);
		} else {
			return [];
		}
	}
</script>

<div class="neon relative min-h-16">
	<span class="absolute -left-3 -top-5 font-mono text-5xl">“</span>
	<div class="motto-container w-full p-4">
		{#await getAllMotto()}
			<p>Loading...</p>
		{:then mottoList}
			<!--! Typewriter <slot> receiving only string or string[] -->
			<Typewriter {...typeWriterSetting} --cursor-color="white" --cursor-width="0.15rem">
				{#each mottoList as motto}
					<p>{motto}</p>
				{/each}
			</Typewriter>
		{:catch error}
			<p class=" text-error-500">Something went wrong while fetch motto data.</p>
		{/await}
	</div>
	<span class="absolute -right-3 bottom-3 translate-y-full font-mono text-5xl">”</span>
</div>
