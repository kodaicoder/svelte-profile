import { z } from 'zod';
const uploadArticleImage = z
	.instanceof(File, {
		message: 'Please choose your article image.'
	})
	.refine((file) => file.size < 1000000, { message: 'File size must be less than 1 MB.' })
	.refine(
		(file) => {
			const allowedExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
			return allowedExtensions.includes(file.type);
		},
		{ message: 'File type must be .jpg, .jpeg .png or .webp.' }
	);

export const articleCreateSchema = z.object({
	uploadImage: uploadArticleImage,
	title: z
		.string()
		.min(1)
		.refine((content) => content.trim().length > 0, { message: 'Title must not be empty' }),
	content: z
		.string()
		.min(1)
		.refine((content) => content.trim().length > 0, { message: 'Content must not be empty' }),
	link: z
		.string()
		.url({ message: 'Please enter a valid URL' })
		.min(1)
		.refine((content) => content.trim().length > 0, { message: 'Link to article not be empty' })
});

export const articleUpdateSchema = z.object({
	id: z.number().min(1),
	uploadImage: uploadArticleImage.nullable().optional(),
	image: z
		.object({
			id: z.number().int().optional().nullable(),
			projectId: z.number().int().optional().nullable(),
			url: z.string().url(),
			isActive: z.boolean().default(true)
		})
		.optional()
		.nullable(),
	title: z
		.string()
		.min(1)
		.refine((content) => content.trim().length > 0, { message: 'Title must not be empty' }),
	content: z
		.string()
		.min(1)
		.refine((content) => content.trim().length > 0, { message: 'Content must not be empty' }),
	link: z
		.string()
		.url({ message: 'Please enter a valid URL' })
		.min(1)
		.refine((content) => content.trim().length > 0, {
			message: 'Link to article must not be empty'
		})
});

export const articleDeleteSchema = z.object({
	id: z.number().min(1)
});

export type ArticleCreateSchema = typeof articleCreateSchema;
export type ArticleUpdateSchema = typeof articleUpdateSchema;
export type ArticleDeleteSchema = typeof articleDeleteSchema;
