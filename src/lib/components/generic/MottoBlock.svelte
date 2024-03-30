<script lang="ts">
	import Typewriter from 'svelte-typewriter';
	export let mottoList: string[];

	const typeWriterSetting = {
		mode: 'loop',
		wordInterval: 3000
	};
</script>

<div class="neon relative min-h-16">
	<span class="absolute -left-3 -top-5 font-mono text-5xl">“</span>
	<div class="motto-container w-full p-4">
		<Typewriter {...typeWriterSetting} --cursor-color="white" --cursor-width="0.15rem">
			{#each mottoList as motto}
				<p>{motto}</p>
			{/each}
		</Typewriter>
	</div>
	<span class="absolute -right-3 bottom-3 translate-y-full font-mono text-5xl">”</span>
</div>
