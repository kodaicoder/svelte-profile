import type { RequestHandler } from './$types';
import prisma from '$lib/prismaInstance/prismaClient';

export const POST: RequestHandler = async ({ request }: { request: Request }) => {
	const { userId } = await request.json();
	const userRole = await dataAccess(userId)
		.then(async (data) => {
			await prisma.$disconnect();
			return data;
		})
		.catch(async (e) => {
			console.error(e);
			await prisma.$disconnect();
			process.exit(1);
		});

	const role = userRole?.role || 'USER';

	return new Response(JSON.stringify({ role }));
};

const dataAccess = async (userId: number) => {
	const userRole = await prisma.user.findFirst({
		where: {
			id: userId
		},
		select: {
			role: true
		}
	});
	return userRole;
};
