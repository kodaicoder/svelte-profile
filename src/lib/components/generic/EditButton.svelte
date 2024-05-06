<script lang="ts">
	import type { TabulatorFull } from 'tabulator-tables';
	import EditIcon from '$lib/components/icons/EditIcon.svelte';
	import axios from 'axios';
	import type { CustomModalSettings, IMetaData } from '$lib/types/IModal.js';
	import Spinner from '$lib/components/icons/Spinner.svelte';

	export let id: number;
	export let table: TabulatorFull; // may be need some callback to table
	export let modalStore: any;
	export let typeOfData: any; //this used as type for data
	export let meta: IMetaData<typeof typeOfData>;
	export let preFetchDataEndpoint: string;

	let buttonLoadState = false;

	async function handleClick() {
		buttonLoadState = true;
		const initialData = await axios
			.post<typeof typeOfData | null>(preFetchDataEndpoint, { id })
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				console.log(error);
			});
		if (initialData) {
			const modal: CustomModalSettings<typeof typeOfData> = {
				type: 'component',
				component: 'editModal',
				meta: { ...meta, initialData }
			};
			modalStore.trigger(modal);
		}
		buttonLoadState = false;
	}
</script>

<button
	class="variant-filled-warning btn-icon p-2"
	on:click={handleClick}
	title="edit motto"
	disabled={buttonLoadState}
>
	{#if buttonLoadState}
		<Spinner class="h-6 w-6 text-surface-700" />
	{:else}
		<slot />
		<EditIcon class="h-6 w-6 text-surface-700" />
	{/if}
</button>
