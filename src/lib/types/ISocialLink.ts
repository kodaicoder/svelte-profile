import type { ComponentType } from 'svelte';

export default interface ISocialLink {
	icon: ComponentType;
	name: 'github' | 'facebook' | 'instagram' | 'x' | 'line' | 'email';
	url: string;
	type: 'social' | 'email';
}
