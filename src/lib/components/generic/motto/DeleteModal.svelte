<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import type { CustomModalSettings } from '$lib/types/IModal';

	// Stores
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { superForm, type Infer, type SuperValidated, defaults } from 'sveltekit-superforms';
	import { mottoUpdateSchema, type MottoUpdateSchema } from '$lib/validators/mottoSchema';
	import { zod } from 'sveltekit-superforms/adapters';
	import Swal from 'sweetalert2';
	import ErrorMessage from '$lib/components/generic/ErrorMessage.svelte';
	import Spinner from '$lib/components/icons/Spinner.svelte';

	// Props
	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;

	export let typeOfData: any;
	export let schema: any;
	// export let data: SuperValidated<Infer<MottoUpdateSchema>>;
	let buttonLoadState = false;

	const modalStore = getModalStore();

	const data: CustomModalSettings<typeof typeOfData> = $modalStore[0];

	const { form, errors, enhance, reset } = superForm(
		defaults(data.meta?.initialData, zod(schema)),
		{
			validators: zod(schema),
			invalidateAll: false,
			onSubmit: () => {
				buttonLoadState = true;
			},
			onUpdate: ({ form }) => {
				if (Object.keys(form.errors).length === 0) {
					Swal.fire({
						title: data.meta?.swal?.success?.title,
						text: data.meta?.swal?.success?.text,
						icon: 'success',
						confirmButtonText: 'Ok',
						allowOutsideClick: false
					})
						.then(() => {
							window.refreshTable();
							modalStore.close();
						})
						.catch((err) => {
							console.log(err);
						});
				} else {
					buttonLoadState = false;
				}
			},
			onError: ({ result }) => {
				buttonLoadState = false;
				let error, html;
				error = JSON.parse(result.error.message);
				html = 'Error occurred <br>' + error.status + ': ' + error.statusText;
				Swal.fire({
					title: data.meta?.swal?.error?.title,
					html,
					icon: 'error',
					confirmButtonText: 'Close',
					allowOutsideClick: false
				});
			}
		}
	);

	function handdleCloseModal() {
		reset();
		modalStore.close();
	}
</script>

{#if data}
	<div class="card w-modal space-y-4 p-4 shadow-xl">
		<header class="text-center text-2xl font-bold">{data.meta?.title}</header>
		<form
			id={data.meta?.form?.name}
			name={data.meta?.form?.name}
			method={data.meta?.form?.method}
			action={data.meta?.form?.action}
			class="modal-form flex justify-center space-y-4 p-4"
			use:enhance
		>
			<h3>Are you sure to {data.meta?.title.toLowerCase()} ?</h3>
			{#if data.meta?.form}
				{#each data.meta.form.children as item}
					{#if item.element === 'input' && item.type === 'hidden'}
						<input type="hidden" name={item.name} bind:value={$form[item.name]} />
					{/if}
				{/each}
			{/if}
		</form>
		<footer class="modal-footer {parent.regionFooter}">
			<button
				type="submit"
				form={data.meta?.form?.name}
				class="btn w-28 {parent.buttonPositive}"
				disabled={buttonLoadState}
			>
				{#if buttonLoadState}
					<Spinner class="h-6 w-6 text-surface-700" />
				{:else}
					{data.meta?.button.submit.label}
				{/if}
			</button>

			<button
				class="btn w-28 {parent.buttonNeutral}"
				on:click={() => handdleCloseModal()}
				disabled={buttonLoadState}
			>
				{#if buttonLoadState}
					<Spinner class="h-6 w-6 text-surface-700" />
				{:else}
					{data.meta?.button.cancel.label}
				{/if}
			</button>
		</footer>
	</div>
{/if}
