<script lang="ts">
	import type IArticle from '$lib/types/IArticle';
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
		articleCreateSchema,
		articleUpdateSchema,
		articleDeleteSchema
	} from '$lib/validators/articleSchema.js';

	let tableDiv: string | HTMLElement;
	let tabulatorTable: any;
	let refreshState = false;

	const modalStore = getModalStore(); //passing modal store to action components

	const typeOfDataCreateArticle = {} as IArticle;
	const typeOfDataEditArticle = {} as IArticle;
	const typeOfDataDeleteArticle = {} as IArticle;

	const createArticleMetaData = {
		title: 'Create Article',
		form: {
			name: 'createArticle',
			method: 'POST',
			action: './article?/create',
			children: [
				{
					name: 'uploadImage',
					element: 'input',
					type: 'file',
					label: 'Article Image',
					accept: ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'],
					maxSize: 1000000
				},
				{
					name: 'title',
					element: 'input',
					type: 'text',
					label: 'Article Title'
				},
				{
					name: 'content',
					element: 'textarea',
					type: 'textarea',
					label: 'Content'
				},
				{
					name: 'link',
					element: 'input',
					type: 'text',
					label: 'Link'
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
				title: 'Create article success',
				text: 'Article data has been save successfully'
			},
			error: {
				title: 'Create article failed'
			}
		}
	};
	const editArticleMetaData = {
		title: 'Edit Article',
		form: {
			name: 'editArticle',
			method: 'POST',
			action: './article?/update',
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
					label: 'Article Image',
					accept: ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'],
					maxSize: 1000000
				},
				{
					name: 'title',
					element: 'input',
					type: 'text',
					label: 'Article Title'
				},
				{
					name: 'content',
					element: 'textarea',
					type: 'textarea',
					label: 'Content'
				},

				{
					name: 'link',
					element: 'input',
					type: 'text',
					label: 'Link'
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
				title: 'Update article success',
				text: 'Article data has been save successfully'
			},
			error: {
				title: 'Update article failed'
			}
		}
	};
	const deleteArticleMetaData = {
		title: 'Delete Article',
		form: {
			name: 'deleteArticle',
			method: 'POST',
			action: './article?/delete',
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
				title: 'Delete article success',
				text: 'Article data has been remove successfully'
			},
			error: {
				title: 'Article motto failed'
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
			ajaxURL: `/api/article/getArticleByParams`,
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
					title: 'Link',
					field: 'link',
					sorter: 'string',
					vertAlign: 'middle',
					headerHozAlign: 'center',
					headerFilter: 'input',
					headerFilterPlaceholder: 'Search link',
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
					typeOfData: typeOfDataEditArticle,
					meta: editArticleMetaData,
					preFetchDataEndpoint: '/api/article/getByArticleId'
				}
			});
			new DeleteButton({
				target: cell.getElement(),
				props: {
					id: cell.getRow().getData().id,
					table: tabulatorTable,
					modalStore,
					typeOfData: typeOfDataDeleteArticle,
					meta: deleteArticleMetaData,
					preFetchDataEndpoint: '/api/article/getByArticleId'
				}
			});
		});
	}

	const modalRegistry: Record<string, ModalComponent> = {
		createModal: {
			ref: CreateModal,
			props: {
				typeOfData: typeOfDataCreateArticle,
				schema: articleCreateSchema
			}
		},
		editModal: {
			ref: EditModal,
			props: {
				typeOfData: typeOfDataEditArticle,
				schema: articleUpdateSchema
			}
		},
		deleteModal: {
			ref: DeleteModal,
			props: {
				typeOfData: typeOfDataDeleteArticle,
				schema: articleDeleteSchema
			}
		},
		imagePreviewModal: {
			ref: ImagePreviewModal
		}
	};
</script>

<Modal components={modalRegistry} />
<div class="card flex flex-col p-6">
	<h1 class="text-3xl">Manage Article</h1>

	<div class="ml-auto flex">
		<CreateButton
			table={tabulatorTable}
			{modalStore}
			typeOfData={typeOfDataCreateArticle}
			meta={createArticleMetaData}
		>
			<span>New Article</span>
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
