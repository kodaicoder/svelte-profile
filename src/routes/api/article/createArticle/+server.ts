import type { RequestHandler } from './$types';
import prisma from '$lib/prismaInstance/prismaClient';
import { put } from '@vercel/blob';

export const POST: RequestHandler = async ({ request }: { request: Request }) => {
	const formData = await request.formData();

	const userId = formData.get('userId') as string;
	const title = formData.get('title') as string;
	const content = formData.get('content') as string;
	const link = formData.get('link') as string;
	const uploadImage = formData.get('uploadImage') as File;

	if (!userId) {
		return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
	}

	const article = await dataAccess(+userId, title, content, link, uploadImage)
		.then(async (data) => {
			await prisma.$disconnect();
			return data;
		})
		.catch(async (e) => {
			console.error(e);
			await prisma.$disconnect();
		});

	if (!article) {
		throw new Error('Article can not created');
	}

	return new Response(
		JSON.stringify({
			id: article.id
		})
	);
};

async function dataAccess(
	userId: number,
	title: string,
	content: string,
	link: string,
	uploadImage: File
) {
	//! upload image to blob storage
	const blobResponse = await put(`article/${userId}/${uploadImage.name}`, uploadImage, {
		access: 'public'
	});

	const newProject = await prisma.article.create({
		data: {
			title: title,
			content: content,
			link: link,
			userId: userId,
			image: {
				create: {
					url: blobResponse.url
				}
			}
		}
	});

	return newProject;
}
