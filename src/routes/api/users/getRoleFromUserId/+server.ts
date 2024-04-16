import type { RequestHandler } from './$types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ request }: { request: Request }) => {
	const { userId } = await request.json();
	const userRoles = await dataAccess(userId)
		.then(async (data) => {
			await prisma.$disconnect();
			return data;
		})
		.catch(async (e) => {
			console.error(e);
			await prisma.$disconnect();
			process.exit(1);
		});

	const roles = userRoles.map((userRole) => userRole.role.name);

	return new Response(JSON.stringify({ roles }));
};

const dataAccess = async (userId: number) => {
	const userRole = await prisma.userRole.findMany({
		where: {
			userId: userId
		},
		include: {
			role: true
		}
	});
	return userRole;
};
