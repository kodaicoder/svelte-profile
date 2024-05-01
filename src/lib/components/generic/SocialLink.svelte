<script lang="ts">
	import type ISocialLink from '$lib/types/ISocialLink';

	export let socialLink: ISocialLink;
</script>

<li>
	<a
		href={socialLink.type.toLowerCase() != 'email' ? socialLink.link : 'mailto:' + socialLink.link}
		target="_blank"
		rel="noopener noreferrer"
		class="flex h-6 w-6 items-center justify-center"
	>
		<img
			src={socialLink.image.url}
			alt={socialLink.type}
			class="hover:!social-neon social-icon size-12"
		/>
	</a>
</li>
