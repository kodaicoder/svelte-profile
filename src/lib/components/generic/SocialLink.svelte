<script lang="ts">
	import type ISocialLink from '$lib/types/ISocialLink';

	export let socialLink: ISocialLink;
</script>

<li>
	<a
		href={socialLink.type != 'email' ? socialLink.url : 'mailto:' + socialLink.url}
		target="_blank"
		rel="noopener noreferrer"
		class="flex h-6 w-6 items-center justify-center"
	>
		<svelte:component this={socialLink.icon} class="hover:svg-neon fill-on-surface-token" />
	</a>
</li>
