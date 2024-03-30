<script lang="ts">
	import anime from 'animejs';
	import ArrowDown from '../icons/ArrowDown.svelte';
	import { onMount } from 'svelte';

	let arrowAnimate: anime.AnimeInstance;
	onMount(() => {
		arrowAnimate = anime({
			autoplay: true,
			targets: '.toTopArrow',
			translateY: [3, -3],
			direction: 'alternate',
			loop: true,
			easing: 'easeInOutSine',
			duration: 1500
		});

		return () => {
			anime.remove('.toTopArrow');
		};
	});

	function toTopButtonClickHandler() {
		// id page is coming from skeleton ui app shell
		const element = document.getElementById('page');
		if (element) element.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<button
	aria-label="To top"
	class="variant-ghost btn-icon absolute bottom-8 right-8 flex flex-col items-center"
	on:click={toTopButtonClickHandler}
	on:mouseenter={() => arrowAnimate.pause()}
	on:mouseleave={() => arrowAnimate.play()}
>
	<span class="toTopArrow w-6">
		<ArrowDown class="rotate-180" />
	</span>
</button>
