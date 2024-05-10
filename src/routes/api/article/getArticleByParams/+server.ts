import type { RequestHandler } from './$types';
import type IArticle from '$lib/types/IArticle';
import prisma from '$lib/prismaInstance/prismaClient';
import parseParams, { type IFilter, type ISort } from '$lib/helper/tabulatorParseParams';

export const GET: RequestHandler = async ({ url, locals }: { url: URL; locals: App.Locals }) => {
	let allArticle: IArticle[] | void = [];

	const { skip, limit, sort, filter } = parseParams(url.searchParams);

	let last_page = 1;
	let last_row = 1;

	if (skip && limit) {
		if (locals.user?.role !== 'ADMIN') {
			return new Response(JSON.stringify([]));
		}
		const totalRows = await getTotalRows();
		if (totalRows > 0) {
			const userId = locals.user.id;
			allArticle = await getByParams(+skip, +limit, sort, filter, +userId)
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
			data: allArticle
		})
	);
};

async function getTotalRows() {
	return await prisma.article.count();
}

async function getByParams(
	skip: number,
	limit: number,
	sort: ISort[] | undefined,
	filter: IFilter[] | undefined,
	userId: number
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

	return await prisma.article.findMany({
		where: {
			user: {
				id: userId,
				role: 'ADMIN'
			},
			...where
		},
		include: {
			image: {
				where: {
					isActive: true
				}
			}
		},
		skip: (skip - 1) * limit,
		take: limit,
		orderBy: sort ? orderBy : undefined
	});
}
