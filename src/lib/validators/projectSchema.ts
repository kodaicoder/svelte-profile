import { z } from 'zod';
const uploadProjectImage = z
	.instanceof(File, {
		message: 'Please choose your project image.'
	})
	.refine((file) => file.size < 1000000, { message: 'File size must be less than 1 MB.' })
	.refine(
		(file) => {
			const allowedExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
			return allowedExtensions.includes(file.type);
		},
		{ message: 'File type must be .jpg, .jpeg .png or .webp.' }
	);

export const projectCreateSchema = z.object({
	uploadImage: uploadProjectImage,
	title: z
		.string()
		.min(1)
		.refine((content) => content.trim().length > 0, { message: 'Title must not be empty' }),
	content: z
		.string()
		.min(1)
		.refine((content) => content.trim().length > 0, { message: 'Content must not be empty' }),
	sourceLink: z
		.string()
		.url({ message: 'Please enter a valid URL' })
		.min(1)
		.refine((content) => content.trim().length > 0, { message: 'Link to source not be empty' }),
	link: z.string().url({ message: 'Please enter a valid URL' }).nullable()
});

export const projectUpdateSchema = z.object({
	id: z.number().min(1),
	uploadImage: uploadProjectImage.nullable().optional(),
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
	sourceLink: z
		.string()
		.url({ message: 'Please enter a valid URL' })
		.min(1)
		.refine((content) => content.trim().length > 0, {
			message: 'Link to source must not be empty'
		}),
	link: z.string().url({ message: 'Please enter a valid URL' }).nullable()
});

export const projectDeleteSchema = z.object({
	id: z.number().min(1)
});

export type ProjectCreateSchema = typeof projectCreateSchema;
export type ProjectUpdateSchema = typeof projectUpdateSchema;
export type ProjectDeleteSchema = typeof projectDeleteSchema;
