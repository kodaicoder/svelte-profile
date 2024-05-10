<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import type { CustomModalSettings } from '$lib/types/IModal';

	import { getModalStore } from '@skeletonlabs/skeleton';
	import {
		superForm,
		type Infer,
		type SuperValidated,
		defaults,
		fileProxy
	} from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import Swal from 'sweetalert2';
	import ErrorMessage from '$lib/components/generic/ErrorMessage.svelte';
	import Spinner from '$lib/components/icons/Spinner.svelte';

	export let parent: SvelteComponent;

	export let typeOfData: any;
	export let schema: any;

	let fileInputMeta:
		| {
				name: string;
				element: string;
				type: string;
				label?: string | null | undefined;
				accept?: string[] | null | undefined;
		  }
		| undefined;

	let imageStore;
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

	$: {
		fileInputMeta = data.meta?.form?.children.find((item) => item.type === 'file');
		if (fileInputMeta) {
			imageStore = fileProxy(form, `${fileInputMeta.name}`);
		}
	}

	function handdleCloseModal() {
		reset();
		modalStore.close();
	}
</script>

{#if data}
	<div class="card w-modal space-y-4 p-4 shadow-xl">
		<header class="text-2xl font-bold">{data.meta?.title}</header>
		<!-- Enable for debugging: -->
		<!--  -->
		<form
			id={data.meta?.form?.name}
			name={data.meta?.form?.name}
			method={data.meta?.form?.method}
			action={data.meta?.form?.action}
			enctype={fileInputMeta ? 'multipart/form-data' : 'application/x-www-form-urlencoded'}
			class="modal-form space-y-4 border border-surface-500 p-4 rounded-container-token"
			use:enhance
		>
			{#if data.meta?.form}
				{#each data.meta?.form?.children as item}
					{#if item.element === 'input'}
						{#if item.type === 'hidden'}
							<input type="hidden" name={item.name} bind:value={$form[item.name]} />
						{:else if item.type === 'file'}
							<div class="flex gap-4">
								<label class="label relative" for={item.name}>
									<span
										>{item.label}
										{#if $errors[item.name]}
											<ErrorMessage
												class="absolute -top-2 right-2"
												errorMessage={$errors[item.name]
													? $errors[item.name][$errors[item.name].length - 1]
													: ''}
											/>
										{/if}</span
									>
									{#if item.maxSize}
										<small class="ml-2"
											>{`(size <= ${item.maxSize >= 1000000 ? item.maxSize / 1000000 + ` mb` : item.maxSize + ` kb`})`}</small
										>
									{/if}
									<input
										id={item.name}
										name={item.name}
										class="input"
										type="file"
										accept={item.accept?.join(',')}
										aria-invalid={$errors[item.name] ? 'true' : undefined}
										bind:files={$imageStore}
									/>
								</label>
								{#if $form[item.name]}
									<img
										src={URL.createObjectURL($form[item.name])}
										alt="preview"
										class="h-20 w-20 object-cover"
									/>
								{/if}
							</div>
						{:else}
							<label class="label relative" for={item.name}>
								<span class="">
									{item.label}
									{#if $errors[item.name]}
										<ErrorMessage
											class="absolute -top-2 right-2"
											errorMessage={$errors[item.name]
												? $errors[item.name][$errors[item.name].length - 1]
												: ''}
										/>
									{/if}
								</span>
								<input
									id={item.name}
									name={item.name}
									class="input"
									type="text"
									aria-invalid={$errors[item.name] ? 'true' : undefined}
									bind:value={$form[item.name]}
									placeholder={`Enter ${item.label?.toLowerCase()}...`}
								/>
							</label>
						{/if}
					{:else if item.element === 'textarea'}
						<label class="label relative" for={item.name}>
							<span>
								{item.label}
								{#if $errors[item.name]}
									<ErrorMessage
										class="absolute -top-2 right-2"
										errorMessage={$errors[item.name]
											? $errors[item.name][$errors[item.name].length - 1]
											: ''}
									/>
								{/if}
							</span>
							<textarea
								id={item.name}
								name={item.name}
								class="textarea"
								rows="6"
								aria-invalid={$errors[item.name] ? 'true' : undefined}
								bind:value={$form[item.name]}
								placeholder={`Enter ${item.label?.toLowerCase()}...`}
							/>
						</label>
					{/if}
				{/each}
			{/if}
		</form>
		<!-- prettier-ignore -->
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
					class="variant-ringed-error btn w-28 hover:bg-red-900"
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
