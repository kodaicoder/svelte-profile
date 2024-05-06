import type { RequestHandler } from './$types';
import prisma from '$lib/prismaInstance/prismaClient';

export const GET: RequestHandler = async () => {
	const projects = await dataAccess()
		.then(async (data) => {
			await prisma.$disconnect();
			return data;
		})
		.catch(async (e) => {
			console.error(e);
			await prisma.$disconnect();
			process.exit(1);
		});

	return new Response(JSON.stringify(projects));
};

const dataAccess = async () => {
	return await prisma.project.findMany({
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
