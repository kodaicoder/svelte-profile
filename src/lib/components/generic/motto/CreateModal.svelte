<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import type { CustomModalSettings } from '$lib/types/IModal';

	import { getModalStore } from '@skeletonlabs/skeleton';
	import { superForm, type Infer, type SuperValidated, defaults } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import Swal from 'sweetalert2';
	import ErrorMessage from '$lib/components/generic/ErrorMessage.svelte';
	import Spinner from '$lib/components/icons/Spinner.svelte';

	export let parent: SvelteComponent;

	export let typeOfData: any;
	export let schema: any;

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
		<header class="text-2xl font-bold">{data.meta?.title}</header>
		<!-- Enable for debugging: -->
		<form
			id={data.meta?.form?.name}
			name={data.meta?.form?.name}
			method={data.meta?.form?.method}
			action={data.meta?.form?.action}
			class="modal-form space-y-4 border border-surface-500 p-4 rounded-container-token"
			use:enhance
		>
			{#if data.meta?.form}
				{#each data.meta?.form?.children as item}
					{#if item.element === 'input'}
						{#if item.type === 'hidden'}
							<input type="hidden" name={item.name} bind:value={$form[item.name]} />
						{:else}
							<label class="label relative" for={item.name}>
								<span class="relative">
									{item.label}
									{#if $errors[item.name]}
										<ErrorMessage
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
						<label class="label" for={item.name}>
							<span class="relative">
								{item.label}
								{#if $errors[item.name]}
									<ErrorMessage
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
			<!-- <input type="hidden" name="id" bind:value={$form.id} />
			<label class="label" for="content">
				<span class="relative">
					Content
					{#if $errors.content}
						<ErrorMessage
							errorMessage={$errors.content ? $errors.content[$errors.content.length - 1] : ''}
						/>
					{/if}
				</span>
				<textarea
					id="content"
					name="content"
					class="textarea"
					rows="6"
					aria-invalid={$errors.content ? 'true' : undefined}
					bind:value={$form.content}
					placeholder="Enter content..."
				/>
			</label>
			<label class="label relative" for="author">
				<span class="relative">
					Author name
					{#if $errors.author}
						<ErrorMessage
							errorMessage={$errors.author ? $errors.author[$errors.author.length - 1] : ''}
						/>
					{/if}
				</span>
				<input
					id="author"
					name="author"
					class="input"
					type="text"
					aria-invalid={$errors.author ? 'true' : undefined}
					bind:value={$form.author}
					placeholder="Enter author name..."
				/>
			</label> -->
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
