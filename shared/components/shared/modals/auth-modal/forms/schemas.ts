import { z } from 'zod';

const imageSizeLimit = 5 * 1024 * 1024;

export const passwordSchema = z
	.string()
	.min(6, { message: 'Введите корректный пароль' });

export const formLoginSchema = z.object({
	email: z.string().email({ message: 'Введите корректный email' }),
	password: passwordSchema,
});

export const imageScheme = z
  .instanceof(File)
  .refine(
    (file) =>
      [
        "image/png",
      ].includes(file.type),
    { message: "Неверный тип изображения" }
  )
  .refine((file) => file.size <= imageSizeLimit, {
    message: "Изоображение не может быть больше 5 Мб",
  });

export const formRegisterSchema = formLoginSchema
	.merge(
		z.object({
			fullName: z.string().min(2, { message: 'Введите имя и фамилию' }),
			confirmPassword: passwordSchema,
		})
	)
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Пароли не совпадают',
		path: ['confirmPassword'],
	});


export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;
