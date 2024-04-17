<script lang="ts">
	import { Tabulator } from 'tabulator-tables';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	export let data: PageData;

	let tableDiv: HTMLDivElement;
	let tabulatorTable: Tabulator;
	let refreshState = false;
	$: tableHeight = window.innerHeight - 178;

	onMount(() => {
		tabulatorTable = new Tabulator(tableDiv, {
			layout: 'fitDataStretch',
			height: `${tableHeight}`,
			rowHeight: 50,
			selectable: false,
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
			ajaxURL: `/api/motto/getAllMotto`,
			columns: [
				{
					title: 'Id',
					field: 'id',
					sorter: 'number',
					vertAlign: 'middle',
					headerHozAlign: 'center',
					headerFilter: 'input',
					headerFilterPlaceholder: 'Search Id',
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
					resizable: false
				},
				{
					title: 'Author',
					field: 'author',
					sorter: 'string',
					vertAlign: 'middle',
					headerHozAlign: 'center',
					headerFilter: 'input',
					headerFilterPlaceholder: 'Search author',
					resizable: false
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
</script>

<div class="flex">
	<h1 class="text-3xl">Manage Motto</h1>
	<button
		class="variant-filled-surface btn ml-auto"
		disabled={refreshState}
		on:click={refreshTable}
	>
		{#if !refreshState}
			<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
				><path
					fill="currentColor"
					d="M20.5 5.835A10.485 10.485 0 0 0 12 1.5c-5.427 0-9.89 4.115-10.443 9.396l-.104.994l1.99.209l.103-.995A8.501 8.501 0 0 1 19.213 7.5H15.5v2h7v-7h-2zm.057 6.066l-.104.995A8.501 8.501 0 0 1 4.787 16.5H8.5v-2h-7v7h2v-3.335A10.485 10.485 0 0 0 12 22.5c5.426 0 9.89-4.115 10.442-9.396l.104-.994z"
				/></svg
			>
		{:else}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				style="margin: auto; background: none; display: block; shape-rendering: auto;"
				width="20px"
				height="20px"
				viewBox="0 0 100 100"
				preserveAspectRatio="xMidYMid"
			>
				<circle cx="84" cy="50" r="10" fill="#ffd14f">
					<animate
						attributeName="r"
						repeatCount="indefinite"
						dur="0.5s"
						calcMode="spline"
						keyTimes="0;1"
						values="10;0"
						keySplines="0 0.5 0.5 1"
						begin="0s"
					/>
					<animate
						attributeName="fill"
						repeatCount="indefinite"
						dur="2s"
						calcMode="discrete"
						keyTimes="0;0.25;0.5;0.75;1"
						values="#ffd14f;#ffd14f;#2882fb;#4ba761;#ffd14f"
						begin="0s"
					/>
				</circle><circle cx="16" cy="50" r="10" fill="#ffd14f">
					<animate
						attributeName="r"
						repeatCount="indefinite"
						dur="2s"
						calcMode="spline"
						keyTimes="0;0.25;0.5;0.75;1"
						values="0;0;10;10;10"
						keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
						begin="0s"
					/>
					<animate
						attributeName="cx"
						repeatCount="indefinite"
						dur="2s"
						calcMode="spline"
						keyTimes="0;0.25;0.5;0.75;1"
						values="16;16;16;50;84"
						keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
						begin="0s"
					/>
				</circle><circle cx="50" cy="50" r="10" fill="#4ba761">
					<animate
						attributeName="r"
						repeatCount="indefinite"
						dur="2s"
						calcMode="spline"
						keyTimes="0;0.25;0.5;0.75;1"
						values="0;0;10;10;10"
						keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
						begin="-0.5s"
					/>
					<animate
						attributeName="cx"
						repeatCount="indefinite"
						dur="2s"
						calcMode="spline"
						keyTimes="0;0.25;0.5;0.75;1"
						values="16;16;16;50;84"
						keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
						begin="-0.5s"
					/>
				</circle><circle cx="84" cy="50" r="10" fill="#2882fb">
					<animate
						attributeName="r"
						repeatCount="indefinite"
						dur="2s"
						calcMode="spline"
						keyTimes="0;0.25;0.5;0.75;1"
						values="0;0;10;10;10"
						keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
						begin="-1s"
					/>
					<animate
						attributeName="cx"
						repeatCount="indefinite"
						dur="2s"
						calcMode="spline"
						keyTimes="0;0.25;0.5;0.75;1"
						values="16;16;16;50;84"
						keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
						begin="-1s"
					/>
				</circle><circle cx="16" cy="50" r="10" fill="#ffd14f">
					<animate
						attributeName="r"
						repeatCount="indefinite"
						dur="2s"
						calcMode="spline"
						keyTimes="0;0.25;0.5;0.75;1"
						values="0;0;10;10;10"
						keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
						begin="-1.5s"
					/>
					<animate
						attributeName="cx"
						repeatCount="indefinite"
						dur="2s"
						calcMode="spline"
						keyTimes="0;0.25;0.5;0.75;1"
						values="16;16;16;50;84"
						keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
						begin="-1.5s"
					/>
				</circle>
			</svg>
		{/if}
	</button>
</div>
<div class="mt-4 h-full rounded-lg border border-gray-300 bg-white p-2">
	<div bind:this={tableDiv} />
</div>
