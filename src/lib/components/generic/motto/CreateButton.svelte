<script lang="ts">
	import type { TabulatorFull } from 'tabulator-tables';
	import type { IMetaData } from '$lib/types/IModal';
	import type { CustomModalSettings } from '$lib/types/IModal.js';

	import Spinner from '$lib/components/icons/Spinner.svelte';

	export let table: TabulatorFull; // may be need some callback to table
	export let modalStore: any;
	export let typeOfData: any; //this used as type for data
	export let meta: IMetaData<typeof typeOfData>;

	let buttonLoadState = false;

	async function handleClick() {
		buttonLoadState = true;
		const modal: CustomModalSettings<typeof typeOfData> = {
			type: 'component',
			component: 'createModal',
			meta
		};
		modalStore.trigger(modal);
		buttonLoadState = false;
	}
</script>

<button
	{...$$restProps}
	class="variant-filled-success btn p-2"
	on:click={handleClick}
	disabled={buttonLoadState}
>
	{#if buttonLoadState}
		<Spinner class="h-6 w-6 text-surface-700" />
	{:else}
		<slot />
	{/if}
</button>
