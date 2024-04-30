import type { RequestHandler } from './$types';
import prisma from '$lib/prismaInstance/prismaClient';
import { put, del } from '@vercel/blob';

export const POST: RequestHandler = async ({ request }: { request: Request }) => {
	const formData = await request.formData();
	const userId = formData.get('userId') as string;
	const uploadImage = formData.get('uploadImage') as File;
	const url = formData.get('url') as string;

	const profilePicture = await dataAccess(+userId, url, uploadImage)
		.then(async (data) => {
			await prisma.$disconnect();
			return data;
		})
		.catch(async (e) => {
			console.error(e);
			await prisma.$disconnect();
			process.exit(1);
		});

	return new Response(JSON.stringify({ profilePicture }));
};

const dataAccess = async (userId: number, oldImageUrl: string, uploadImage: File) => {
	//! delete old image
	await del(oldImageUrl);

	//! upload image to blob storage
	const blobResponse = await put(`profile/${userId}/${uploadImage.name}`, uploadImage, {
		access: 'public'
	});

	const newProfilePicture = await prisma.userImage.upsert({
		where: {
			userId: userId
		},
		update: {
			url: blobResponse.url, // default image
			isActive: true
		},
		create: {
			userId: userId,
			url: blobResponse.url // default image
		}
	});

	return newProfilePicture;
};
