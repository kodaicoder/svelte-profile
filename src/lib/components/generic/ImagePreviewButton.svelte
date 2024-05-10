<script lang="ts">
	import type { TabulatorFull } from 'tabulator-tables';
	import EditIcon from '$lib/components/icons/EditIcon.svelte';
	import axios from 'axios';
	import type { CustomModalSettings, IMetaData } from '$lib/types/IModal.js';
	import Spinner from '$lib/components/icons/Spinner.svelte';
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	import ImageIcon from '../icons/ImageIcon.svelte';

	export let id: number;
	export let table: TabulatorFull; // may be need some callback to table
	export let modalStore: any;
	export let urlToImage: string;

	let buttonLoadState = false;

	async function handleClick() {
		buttonLoadState = true;
		if (urlToImage) {
			const modal: ModalSettings = {
				type: 'component',
				component: 'imagePreviewModal',
				meta: {
					imageUrl: urlToImage
				}
			};
			modalStore.trigger(modal);
		}
		buttonLoadState = false;
	}
</script>

<button
	class="variant-filled-warning btn-icon p-1"
	on:click={handleClick}
	title="edit motto"
	disabled={buttonLoadState}
>
	{#if buttonLoadState}
		<Spinner class="h-6 w-6 text-surface-700" />
	{:else}
		<slot />
		<ImageIcon class="h-6 w-6 text-surface-700" />
	{/if}
</button>
