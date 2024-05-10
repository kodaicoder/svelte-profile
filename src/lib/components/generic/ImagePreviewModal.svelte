<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import type { CustomModalSettings } from '$lib/types/IModal';

	// Stores
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { superForm, type Infer, type SuperValidated, defaults } from 'sveltekit-superforms';
	import { mottoUpdateSchema, type MottoUpdateSchema } from '$lib/validators/mottoSchema';
	import { zod } from 'sveltekit-superforms/adapters';
	import Swal from 'sweetalert2';
	import ErrorMessage from '$lib/components/generic/ErrorMessage.svelte';
	import Spinner from '$lib/components/icons/Spinner.svelte';

	// Props
	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;

	// export let data: SuperValidated<Infer<MottoUpdateSchema>>;
	let buttonLoadState = false;
	const modalStore = getModalStore();
	const data: ModalSettings = $modalStore[0];

	const imageUrl = data.meta.imageUrl as string;
</script>

{#if imageUrl}
	<div class="card w-modal space-y-4 p-4 shadow-xl">
		<img src={imageUrl} alt="preview" />
		<footer class="modal-footer {parent.regionFooter}">
			<button
				class="variant-ringed-error btn w-28 hover:bg-red-900"
				on:click={() => modalStore.close()}
				disabled={buttonLoadState}
			>
				{#if buttonLoadState}
					<Spinner class="h-6 w-6 text-surface-700" />
				{:else}
					Close
				{/if}
			</button>
		</footer>
	</div>
{/if}
