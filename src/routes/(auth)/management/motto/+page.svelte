<script lang="ts">
	import type { IMotto } from '$lib/types/IMotto';
	import type { PageData } from './$types';
	import CreateModal from '$lib/components/generic/CreateModal.svelte';
	import EditModal from '$lib/components/generic/EditModal.svelte';
	import DeleteModal from '$lib/components/generic/DeleteModal.svelte';
	import RefreshIcon from '$lib/components/icons/RefreshIcon.svelte';
	import { TabulatorFull as Tabulator, type CellComponent } from 'tabulator-tables';
	import { onMount } from 'svelte';
	import EditButton from '$lib/components/generic/EditButton.svelte';
	import DeleteButton from '$lib/components/generic/DeleteButton.svelte';
	import Spinner from '$lib/components/icons/Spinner.svelte';
	import { Modal, getModalStore, type ModalComponent } from '@skeletonlabs/skeleton';
	import {
		mottoCreateSchema,
		mottoUpdateSchema,
		mottoDeleteSchema
	} from '$lib/validators/mottoSchema.js';
	import CreateButton from '$lib/components/generic/CreateButton.svelte';

	let tableDiv: string | HTMLElement;
	let tabulatorTable: any;
	let refreshState = false;

	const modalStore = getModalStore(); //passing modal store to action components

	const typeOfDataCreateMotto = {} as IMotto;
	const typeOfDataEditMotto = {} as IMotto;
	const typeOfDataDeleteMotto = {} as IMotto;

	const createMottoMetaData = {
		title: 'Create Motto',
		form: {
			name: 'createMotto',
			method: 'POST',
			action: './motto?/create',
			children: [
				{
					name: 'userId',
					element: 'input',
					type: 'hidden'
				},
				{
					name: 'content',
					element: 'textarea',
					type: 'textarea',
					label: 'Content'
				},
				{
					name: 'author',
					element: 'input',
					type: 'text',
					label: 'Author name'
				}
			]
		},
		button: {
			submit: {
				label: 'Create'
			},
			cancel: {
				label: 'Cancel'
			}
		},
		swal: {
			success: {
				title: 'Create motto success',
				text: 'Motto data has been save successfully'
			},
			error: {
				title: 'Create motto failed'
			}
		}
	};
	const editMottoMetaData = {
		title: 'Edit Motto',
		form: {
			name: 'editMotto',
			method: 'POST',
			action: './motto?/update',
			children: [
				{
					name: 'userId',
					element: 'input',
					type: 'hidden'
				},
				{
					name: 'id',
					element: 'input',
					type: 'hidden'
				},
				{
					name: 'content',
					element: 'textarea',
					type: 'textarea',
					label: 'Content'
				},
				{
					name: 'author',
					element: 'input',
					type: 'text',
					label: 'Author name'
				}
			]
		},
		button: {
			submit: {
				label: 'Update'
			},
			cancel: {
				label: 'Cancel'
			}
		},
		swal: {
			success: {
				title: 'Update motto success',
				text: 'Motto data has been save successfully'
			},
			error: {
				title: 'Update motto failed'
			}
		}
	};
	const deleteMottoMetaData = {
		title: 'Delete Motto',
		form: {
			name: 'deleteMotto',
			method: 'POST',
			action: './motto?/delete',
			children: [
				{
					name: 'userId',
					element: 'input',
					type: 'hidden'
				},
				{
					name: 'id',
					element: 'input',
					type: 'hidden'
				}
			]
		},
		button: {
			submit: {
				label: 'Delete'
			},
			cancel: {
				label: 'Cancel'
			}
		},
		swal: {
			success: {
				title: 'Delete motto success',
				text: 'Motto data has been remove successfully'
			},
			error: {
				title: 'Delete motto failed'
			}
		}
	};

	onMount(() => {
		tabulatorTable = new Tabulator(tableDiv, {
			layout: 'fitColumns',
			height: 400,
			rowHeight: 50,
			selectable: false,
			placeholder: 'Not found data',
			pagination: true,
			paginationMode: 'remote',
			paginationSize: 10,
			paginationSizeSelector: [25, 50, 100],
			filterMode: 'remote',
			sortMode: 'remote',
			dataSendParams: {
				size: 'limit',
				page: 'skip',
				sorters: 'sort',
				filter: 'filter'
			},
			ajaxURL: `/api/motto/getMottoByParams`,
			columns: [
				{
					title: 'Id',
					field: 'id',
					sorter: 'number',
					vertAlign: 'middle',
					hozAlign: 'center',
					headerHozAlign: 'center',
					width: 100,
					resizable: false
				},
				{
					title: 'Content',
					field: 'content',
					sorter: 'string',
					vertAlign: 'middle',
					headerHozAlign: 'center',
					headerFilter: 'input',
					headerFilterPlaceholder: 'Search content',
					resizable: false,
					formatter: (cell) => {
						cell.getElement().classList.add('!truncate', '!inline-block', '!leading-8');
						return cell.getValue();
					}
				},
				{
					title: 'Author',
					field: 'author',
					sorter: 'string',
					width: 400,
					vertAlign: 'middle',
					headerHozAlign: 'center',
					headerFilter: 'input',
					headerFilterPlaceholder: 'Search author',
					resizable: false
				},
				{
					title: ' ',
					width: 200,
					vertAlign: 'middle',
					hozAlign: 'center',
					headerHozAlign: 'center',
					cssClass: 'flex justify-center gap-4',
					headerSort: false,
					resizable: false,
					formatter: buildActionsSection
				}
			]
		});

		window.refreshTable = refreshTable;

		tabulatorTable.on('renderComplete', () => {
			var filters = tabulatorTable.getHeaderFilters();
			if (filters.length > 0) {
				tabulatorTable.scrollToColumn(filters[filters.length - 1].field, 'middle', true);
			}
		});
	});

	async function refreshTable() {
		refreshState = true;
		// @ts-ignore
		await tabulatorTable.setData();
		refreshState = false;
	}

	function buildActionsSection(cell: CellComponent, formatterParams: any, onRendered: Function) {
		return onRendered(function () {
			new EditButton({
				target: cell.getElement(),
				hydrate: true,
				intro: true,
				props: {
					id: cell.getRow().getData().id,
					table: tabulatorTable,
					modalStore,
					typeOfData: typeOfDataEditMotto,
					meta: editMottoMetaData,
					preFetchDataEndpoint: '/api/motto/getByMottoId'
				}
			});
			new DeleteButton({
				target: cell.getElement(),
				props: {
					id: cell.getRow().getData().id,
					table: tabulatorTable,
					modalStore,
					typeOfData: typeOfDataDeleteMotto,
					meta: deleteMottoMetaData,
					preFetchDataEndpoint: '/api/motto/getByMottoId'
				}
			});
		});
	}

	const modalRegistry: Record<string, ModalComponent> = {
		// props: { data: data.mottoEditForm }
		createModal: {
			ref: CreateModal,
			props: {
				typeOfData: typeOfDataCreateMotto,
				schema: mottoCreateSchema
			}
		},
		editModal: {
			ref: EditModal,
			props: {
				typeOfData: typeOfDataEditMotto,
				schema: mottoUpdateSchema
			}
		},
		deleteModal: {
			ref: DeleteModal,
			props: {
				typeOfData: typeOfDataDeleteMotto,
				schema: mottoDeleteSchema
			}
		}
	};
</script>

<Modal components={modalRegistry} />
<div class="card flex flex-col p-6">
	<h1 class="text-3xl">Manage Motto</h1>

	<div class="ml-auto flex">
		<CreateButton
			table={tabulatorTable}
			{modalStore}
			typeOfData={typeOfDataCreateMotto}
			meta={createMottoMetaData}
		>
			<span>New Motto</span>
		</CreateButton>

		<button class="variant-filled-surface btn ml-6" disabled={refreshState} on:click={refreshTable}>
			{#if !refreshState}
				<RefreshIcon class="h-6 w-6" />
			{:else}
				<Spinner class="h-6 w-6" />
			{/if}
		</button>
	</div>

	<div class="mt-4 h-full rounded-lg border border-gray-300 bg-white p-2">
		<div bind:this={tableDiv} />
	</div>
</div>
