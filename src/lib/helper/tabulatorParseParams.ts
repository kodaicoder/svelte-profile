export interface ISort {
	field: string;
	dir: string;
}
export interface IFilter {
	field: string;
	type: string;
	value: string;
}
interface TabulatorParams {
	skip: number;
	limit: number;
	sort?: ISort[];
	filter?: IFilter[];
}

// @ts-expect-error this is only for parse a parameter from tabulator
export default function parseParams(params) {
	const obj = {} as TabulatorParams;
	for (const key of params.keys()) {
		if (key.includes('filter') || key.includes('sort')) {
			const property = key.includes('filter') ? 'filter' : 'sort';
			const index = key.match(/\d+/)[0];
			const field = key.split('[').pop().split(']')[0];
			obj[property] = obj[property] || [];
			obj[property][index] = obj[property][index] || {};
			obj[property][index][field] = params.get(key);
		} else {
			obj[key] = params.get(key);
		}
	}
	return obj;
}
