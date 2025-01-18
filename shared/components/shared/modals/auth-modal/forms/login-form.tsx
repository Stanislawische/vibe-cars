import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { formLoginSchema, TFormLoginValues } from './schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Title } from '../../../title';
import { FormInput } from '../../../form';
import { Button } from '@/shared/components/ui';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';

interface Props {
	onClose?: VoidFunction;
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
	const form = useForm<TFormLoginValues>({
		resolver: zodResolver(formLoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (data: TFormLoginValues) => {
		try {
			const resp = await signIn('credentials', {
				...data,
				redirect: false,
			});

			if (resp?.error) {
				return toast.error('Не удалось войти в аккаунт', {
					style: {
						width: '270px',
						borderRadius: '50px',
						background: '#333',
						color: '#fff',
						border: '1px solid #666',
						fontSize: '14px',
						fontWeight: 'bold',
					},
					icon: '🤷🏻',
					duration: 5000,
				});
			}
		} catch (error) {
			throw error;
		}

		toast.success('Вы успешно вошли в аккаунт', {
			style: {
				width: '270px',
				borderRadius: '50px',
				background: '#333',
				color: '#fff',
				border: '1px solid #666',
				fontSize: '14px',
				fontWeight: 'bold',
			},
			icon: '🙋🏻',
			duration: 5000,
		});

		onClose?.();
	};

	return (
		<FormProvider {...form}>
			<form
				className="flex flex-col gap-2"
				onSubmit={form.handleSubmit(onSubmit)}>
				<div className="flex justify-between items-center">
					<div className="mr-2">
						<Title text="Вход в аккаунт" size="md" className="font-bold" />
						<p className="text-base">
							Введите свою почту и пароль, чтобы войти в аккаунт
						</p>
					</div>
					<img
						src="/assets/images/login.png"
						alt="Login"
						width={60}
						height={60}
					/>
				</div>

				<FormInput name="email" label="E-mail" required />
				<FormInput name="password" label="Пароль" type="password" required />

				<Button
					loading={form.formState.isSubmitting}
					className="h-10 text-base flex mt-[175px]"
					type="submit">
					Войти
				</Button>
				<div className="flex gap-2 mt-2">
					<Button 
						variant={'secondary'}
						onClick={() => {
							signIn('github', {
								callbackUrl: process.env.NEXTAUTH_CALLBACK as string,
								redirect: true,
							});
						}}
						type="button"
						className="gap-2 h-10 p-2 flex-1">
						<img
							className="w-6 h-6"
							src="https://github.githubassets.com/favicons/favicon.svg"
							alt="Avatar"
						/>
						GitHub
					</Button>
					<Button
						disabled
						variant={'secondary'}
						onClick={() => {
							signIn('google', {
								callbackUrl: process.env.NEXTAUTH_CALLBACK as string,
								redirect: true,
							});
						}}
						type="button"
						className="gap-2 h-10 p-2 flex-1">
						<img
							className="w-6 h-6"
							src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
							alt="Avatar"
						/>
						Google
					</Button>
				</div>
			</form>
		</FormProvider>
	);
};
