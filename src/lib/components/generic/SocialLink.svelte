<script lang="ts">
	import type ISocialLink from '$lib/types/ISocialLink';

	export let socialLink: ISocialLink;

	const isEmail = (link: string | null) => {
		if (!link) return false; // If link is null or undefined, return false
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(link);
	};
</script>

<li>
	<a
		href={isEmail(socialLink.link) ? socialLink.link : 'mailto:' + socialLink.link}
		target="_blank"
		rel="noopener noreferrer"
		class="flex h-6 w-6 items-center justify-center"
	>
		<img
			src={socialLink?.image?.url ?? 'https://placehold.co/150'}
			alt={socialLink.link}
			class="hover:!social-neon social-icon size-12"
		/>
	</a>
</li>
