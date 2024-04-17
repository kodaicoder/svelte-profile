import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.min(6, { message: 'Password must be at least 6 characters' })
		.max(25, { message: 'Password must be at most 25 characters' })
});
