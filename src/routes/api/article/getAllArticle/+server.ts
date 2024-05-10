import type { RequestHandler } from './$types';
import prisma from '$lib/prismaInstance/prismaClient';

export const GET: RequestHandler = async () => {
	const articles = await dataAccess()
		.then(async (data) => {
			await prisma.$disconnect();
			return data;
		})
		.catch(async (e) => {
			console.error(e);
			await prisma.$disconnect();
			process.exit(1);
		});

	return new Response(JSON.stringify(articles));
};

const dataAccess = async () => {
	return await prisma.article.findMany({
		orderBy: {
			id: 'asc'
		},
		include: {
			image: {
				where: {
					isActive: true
				}
			}
		},
		where: {
			user: {
				role: 'ADMIN'
			}
		}
	});
};
