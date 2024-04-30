import { z } from 'zod';

export const mottoCreateSchema = z.object({
	content: z
		.string()
		.min(1)
		.refine((content) => content.trim().length > 0, { message: 'Content must not be empty' }),
	author: z.string().nullable()
});

export const mottoUpdateSchema = z.object({
	id: z.number().min(1),
	content: z
		.string()
		.min(1)
		.refine((content) => content.trim().length > 0, { message: 'Content must not be empty' }),
	author: z.string().nullable()
});

export const mottoDeleteSchema = z.object({
	id: z.number().min(1)
});

export type MottoCreateSchema = typeof mottoCreateSchema;
export type MottoUpdateSchema = typeof mottoUpdateSchema;
export type MottoDeleteSchema = typeof mottoDeleteSchema;
