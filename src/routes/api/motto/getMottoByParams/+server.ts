import type { RequestHandler } from './$types';
import prisma from '$lib/prismaInstance/prismaClient';
import type { IMotto } from '$lib/types/IMotto';
import parseParams, { type IFilter, type ISort } from '$lib/helper/tabulatorParseParams';

export const GET: RequestHandler = async ({ url, locals }) => {
	let allMotto: IMotto[] | void = [];

	const { skip, limit, sort, filter } = parseParams(url.searchParams);

	let last_page = 1;
	let last_row = 1;

	if (skip && limit) {
		if (locals.user?.role !== 'ADMIN') {
			return new Response(JSON.stringify([]));
		}
		const totalRows = await getTotalRows();
		if (totalRows > 0) {
			allMotto = await getByParams(+skip, +limit, sort, filter)
				.then(async (data) => {
					await prisma.$disconnect();
					return data;
				})
				.catch(async (e) => {
					console.error(e);
					await prisma.$disconnect();
				});

			last_page = Math.ceil(totalRows / +limit);
			last_row = totalRows;
		}
	}

	return new Response(
		JSON.stringify({
			last_page,
			last_row,
			data: allMotto
		})
	);
};

async function getTotalRows() {
	return await prisma.motto.count();
}

async function getByParams(
	skip: number,
	limit: number,
	sort: ISort[] | undefined,
	filter: IFilter[] | undefined
) {
	//crete sort object if sort is exist
	let orderBy = {};
	if (sort) {
		orderBy = { [sort[0].field]: sort[0].dir === 'asc' ? 'asc' : ('desc' as 'asc' | 'desc') };
	}

	//create filter object if filter is exist
	let where = {};
	if (filter) {
		where = filter.reduce((acc, f) => {
			return {
				...acc,
				[f.field]: {
					contains: f.value,
					mode: 'insensitive'
				}
			};
		}, {});
	}

	return await prisma.motto.findMany({
		skip: (skip - 1) * limit,
		take: limit,
		orderBy: sort ? orderBy : undefined,
		where: filter ? where : undefined
	});
}
