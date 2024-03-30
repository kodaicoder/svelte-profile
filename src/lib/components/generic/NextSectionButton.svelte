<script lang="ts">
	import anime from 'animejs/lib/anime.js';

	import ArrowDown from '$lib/components/icons/ArrowDown.svelte';
	import { onMount } from 'svelte';

	export let scrollTo: string;

	onMount(() => {
		anime({
			targets: '.nextSectionArrow',
			translateY: [-3, 3],
			direction: 'alternate',
			loop: true,
			easing: 'easeInOutSine',
			duration: 1500
		});

		return () => {
			anime.remove('.toTopArrow');
		};
	});

	function clickHandler() {
		const element = document.getElementById(scrollTo);
		if (element) element.scrollIntoView({ behavior: 'smooth' });
	}
</script>

<!-- <a href={`#${scrollTo}`} class="variant-ghost btn-icon">
	<ArrowDown class="nextSectionArrow w-6" />
</a> -->
<button on:click={clickHandler} class="variant-ghost btn-icon">
	<ArrowDown class="nextSectionArrow w-6" />
</button>
