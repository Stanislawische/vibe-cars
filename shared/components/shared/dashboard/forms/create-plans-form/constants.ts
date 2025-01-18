import { z } from 'zod';

export const CreatePlansFormSchema = z.object({
	name: z.string(),
	price: z.string(),
});

export type CreatePLansFormValues = z.infer<typeof CreatePlansFormSchema>;
