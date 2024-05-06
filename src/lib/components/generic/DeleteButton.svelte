<script lang="ts">
	import type { TabulatorFull } from 'tabulator-tables';
	import DeleteIcon from '$lib/components/icons/DeleteIcon.svelte';
	import axios from 'axios';
	import type { CustomModalSettings, IMetaData } from '$lib/types/IModal';
	import Spinner from '$lib/components/icons/Spinner.svelte';

	export let id: number;
	export let table: TabulatorFull;
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
				component: 'deleteModal',
				meta: { ...meta, initialData }
			};
			modalStore.trigger(modal);
		}
		buttonLoadState = false;
	}
</script>

<button
	class="variant-filled-error btn-icon p-2"
	on:click={handleClick}
	title="delete motto"
	disabled={buttonLoadState}
>
	{#if buttonLoadState}
		<Spinner class="h-6 w-6 text-surface-700" />
	{:else}
		<slot />
		<DeleteIcon class="h-6 w-6 text-surface-700" />
	{/if}
</button>
