import { z } from 'zod';

export const CreateProductItemFormSchema = z.object({
	price: z.string(),
	productId: z.string(),
	color: z.string().optional(),
	horsepower: z.string(),
	gearbox: z.string().optional(),
	description: z.string(),
});

export type CreateProductItemFormValues = z.infer<
	typeof CreateProductItemFormSchema
>;
