<script lang="ts">
	import type IProject from '$lib/types/IProject';
	import CreateButton from '$lib/components/generic/CreateButton.svelte';
	import CreateModal from '$lib/components/generic/CreateModal.svelte';
	import ImagePreviewButton from '$lib/components/generic/ImagePreviewButton.svelte';
	import ImagePreviewModal from '$lib/components/generic/ImagePreviewModal.svelte';
	import EditButton from '$lib/components/generic/EditButton.svelte';
	import EditModal from '$lib/components/generic/EditModal.svelte';
	import DeleteButton from '$lib/components/generic/DeleteButton.svelte';
	import DeleteModal from '$lib/components/generic/DeleteModal.svelte';
	import Spinner from '$lib/components/icons/Spinner.svelte';
	import RefreshIcon from '$lib/components/icons/RefreshIcon.svelte';
	import { TabulatorFull as Tabulator, type CellComponent } from 'tabulator-tables';
	import { onMount } from 'svelte';
	import { Modal, getModalStore, type ModalComponent } from '@skeletonlabs/skeleton';
	import {
		projectCreateSchema,
		projectUpdateSchema,
		projectDeleteSchema
	} from '$lib/validators/projectSchema.js';

	let tableDiv: string | HTMLElement;
	let tabulatorTable: any;
	let refreshState = false;

	const modalStore = getModalStore(); //passing modal store to action components

	const typeOfDataCreateProject = {} as IProject;
	const typeOfDataEditProject = {} as IProject;
	const typeOfDataDeleteProject = {} as IProject;

	const createProjectMetaData = {
		title: 'Create Project',
		form: {
			name: 'createProject',
			method: 'POST',
			action: './project?/create',
			children: [
				{
					name: 'uploadImage',
					element: 'input',
					type: 'file',
					label: 'Project Image',
					accept: ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'],
					maxSize: 1000000
				},
				{
					name: 'title',
					element: 'input',
					type: 'text',
					label: 'Project Title'
				},
				{
					name: 'content',
					element: 'textarea',
					type: 'textarea',
					label: 'Content'
				},
				{
					name: 'sourceLink',
					element: 'input',
					type: 'text',
					label: 'Source Link'
				},
				{
					name: 'link',
					element: 'input',
					type: 'text',
					label: 'Demo Link'
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
				title: 'Create project success',
				text: 'Project data has been save successfully'
			},
			error: {
				title: 'Create project failed'
			}
		}
	};
	const editProjectMetaData = {
		title: 'Edit Project',
		form: {
			name: 'editProject',
			method: 'POST',
			action: './project?/update',
			children: [
				{
					name: 'id',
					element: 'input',
					type: 'hidden'
				},
				{
					name: 'uploadImage',
					element: 'input',
					type: 'file',
					label: 'Project Image',
					accept: ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'],
					maxSize: 1000000
				},
				{
					name: 'title',
					element: 'input',
					type: 'text',
					label: 'Project Title'
				},
				{
					name: 'content',
					element: 'textarea',
					type: 'textarea',
					label: 'Content'
				},
				{
					name: 'sourceLink',
					element: 'input',
					type: 'text',
					label: 'Source Link'
				},
				{
					name: 'link',
					element: 'input',
					type: 'text',
					label: 'Demo Link'
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
				title: 'Update project success',
				text: 'Project data has been save successfully'
			},
			error: {
				title: 'Update project failed'
			}
		}
	};
	const deleteProjectMetaData = {
		title: 'Delete Project',
		form: {
			name: 'deleteProject',
			method: 'POST',
			action: './project?/delete',
			children: [
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
				title: 'Delete project success',
				text: 'Project data has been remove successfully'
			},
			error: {
				title: 'Project motto failed'
			}
		}
	};

	onMount(() => {
		tabulatorTable = new Tabulator(tableDiv, {
			layout: 'fitData',
			height: 400,
			rowHeight: 65,
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
			ajaxURL: `/api/project/getProjectByParams`,
			columns: [
				{
					title: 'Id',
					field: 'id',
					sorter: 'number',
					width: 100,
					vertAlign: 'middle',
					hozAlign: 'center',
					headerHozAlign: 'center',
					resizable: false
				},
				{
					title: 'Image',
					field: 'image.url',
					vertAlign: 'middle',
					hozAlign: 'center',
					headerHozAlign: 'center',
					cssClass: 'flex justify-center gap-4',
					headerSort: false,
					resizable: false,
					formatter: buildImageModal
				},
				{
					title: 'Title',
					field: 'title',
					sorter: 'string',
					vertAlign: 'middle',

					headerHozAlign: 'center',
					headerFilter: 'input',
					headerFilterPlaceholder: 'Search title',
					resizable: false,
					formatter: (cell) => {
						cell
							.getElement()
							.classList.add('!truncate', '!inline-block', '!leading-[3rem]', '!w-44');
						return cell.getValue();
					}
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
						cell
							.getElement()
							.classList.add('!truncate', '!inline-block', '!leading-[3rem]', '!max-w-[500px]');
						return cell.getValue();
					}
				},
				{
					title: 'Source link',
					field: 'sourceLink',
					sorter: 'string',
					vertAlign: 'middle',
					headerHozAlign: 'center',
					headerFilter: 'input',
					headerFilterPlaceholder: 'Search source link',
					resizable: false,
					formatter: (cell) => {
						cell
							.getElement()
							.classList.add('!truncate', '!inline-block', '!leading-[3rem]', '!max-w-[500px]');
						return cell.getValue();
					}
				},
				{
					title: 'Demo link',
					field: 'link',
					sorter: 'string',
					vertAlign: 'middle',
					headerHozAlign: 'center',
					headerFilter: 'input',
					headerFilterPlaceholder: 'Search demo link',
					resizable: false,
					formatter: (cell) => {
						cell
							.getElement()
							.classList.add('!truncate', '!inline-block', '!leading-[3rem]', '!max-w-[500px]');
						return cell.getValue();
					}
				},
				{
					title: ' ',
					width: 100,
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
	function buildImageModal(cell: CellComponent, formatterParams: any, onRendered: Function) {
		return onRendered(function () {
			new ImagePreviewButton({
				target: cell.getElement(),
				hydrate: true,
				intro: true,
				props: {
					id: cell.getRow().getData().id,
					table: tabulatorTable,
					modalStore,
					urlToImage: cell.getRow().getData().image.url
				}
			});
		});
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
					typeOfData: typeOfDataEditProject,
					meta: editProjectMetaData,
					preFetchDataEndpoint: '/api/project/getByProjectId'
				}
			});
			new DeleteButton({
				target: cell.getElement(),
				props: {
					id: cell.getRow().getData().id,
					table: tabulatorTable,
					modalStore,
					typeOfData: typeOfDataDeleteProject,
					meta: deleteProjectMetaData,
					preFetchDataEndpoint: '/api/project/getByProjectId'
				}
			});
		});
	}

	const modalRegistry: Record<string, ModalComponent> = {
		// props: { data: data.mottoEditForm }
		createModal: {
			ref: CreateModal,
			props: {
				typeOfData: typeOfDataCreateProject,
				schema: projectCreateSchema
			}
		},
		editModal: {
			ref: EditModal,
			props: {
				typeOfData: typeOfDataEditProject,
				schema: projectUpdateSchema
			}
		},
		deleteModal: {
			ref: DeleteModal,
			props: {
				typeOfData: typeOfDataDeleteProject,
				schema: projectDeleteSchema
			}
		},
		imagePreviewModal: {
			ref: ImagePreviewModal
		}
	};
</script>

<Modal components={modalRegistry} />
<div class="card flex flex-col p-6">
	<h1 class="text-3xl">Manage Project</h1>

	<div class="ml-auto flex">
		<CreateButton
			table={tabulatorTable}
			{modalStore}
			typeOfData={typeOfDataCreateProject}
			meta={createProjectMetaData}
		>
			<span>New Project</span>
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
