import type ISocialLink from '$lib/types/ISocialLink';
import { readable } from 'svelte/store';
import GithubIcon from '$lib/components/icons/GithubIcon.svelte';
import FacebookIcon from '$lib/components/icons/FacebookIcon.svelte';
import XIcon from '$lib/components/icons/XIcon.svelte';
import InstagramIcon from '$lib/components/icons/InstagramIcon.svelte';
import LineIcon from '$lib/components/icons/LineIcon.svelte';
import MailIcon from '$lib/components/icons/MailIcon.svelte';

const socialLinkList: ISocialLink[] = [
	{
		icon: GithubIcon,
		name: 'github',
		url: 'https://github.com/kodaicoder',
		type: 'social'
	},
	{
		icon: FacebookIcon,
		name: 'facebook',
		url: 'https://www.google.com',
		type: 'social'
	},
	{
		icon: XIcon,
		name: 'x',
		url: 'https://www.google.com',
		type: 'social'
	},

	{
		icon: InstagramIcon,
		name: 'instagram',
		url: 'https://www.google.com',
		type: 'social'
	},
	{
		icon: LineIcon,
		name: 'line',
		url: 'https://www.google.com',
		type: 'social'
	},
	{
		icon: MailIcon,
		name: 'email',
		url: 'nutchapon.make@gmail.com',
		type: 'email'
	}
];

export const socialLinkStore = readable(socialLinkList, (set) => {
	set(socialLinkList);
});
