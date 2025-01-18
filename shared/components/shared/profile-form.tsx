'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
	formRegisterSchema,
	TFormRegisterValues,
} from './modals/auth-modal/forms/schemas';
import { UserDB } from '@prisma/client';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import { Container } from './container';
import { FormInput, Title } from '.';
import { Button } from '../ui';
import { updateUserInfo } from '@/app/actions';
import { Label } from '../ui/label';

interface Props {
	data: UserDB;
}
export const ProfileForm: React.FC<Props> = ({ data }) => {
	const form = useForm({
		resolver: zodResolver(formRegisterSchema),
		defaultValues: {
			fullName: data.fullName,
			email: data.email,
			password: '',
			confirmPassword: '',
		},
	});

	const onSubmit = async (data: TFormRegisterValues) => {
		try {
			await updateUserInfo({
				email: data.email,
				fullName: data.fullName,
				password: data.password,
			});

			toast.success('Данные пользователя успешно обновлены', {
				style: {
					width: '220px',
					borderRadius: '50px',
					background: '#333',
					color: '#fff',
					border: '1px solid #666',
					fontSize: '14px',
					fontWeight: 'bold',
				},
				icon: '👍🏻',
				duration: 5000,
			});
		} catch (error) {
			console.log('[UPDATE_USER] Error:', error);
			return toast.error('Ошибка обновления данных пользователя', {
				style: {
					width: '240px',
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
	};

	const onClickSignOut = () => {
		signOut({
			callbackUrl: '/',
		});
	};

	const userRole = data.role === 'USER' ? 'пользователь' : 'администратор';

	return (
		<Container className="my-10 w-96">
			<Title
				text={`Личные данные | No ${data.id}`}
				size="md"
				className="font-extrabold flex"
			/>

			{   userRole === 'администратор' && (
				<Label className="text-base text-white font-bold">Вы {userRole}</Label>
			)}
			<FormProvider {...form}>
				<form
					className="flex flex-col gap-5 w-96 mt-10 "
					onSubmit={form.handleSubmit(onSubmit)}>
					<FormInput name="email" label="E-mail" required />
					<FormInput name="fullName" label="Полное имя" required />

					<FormInput
						type="password"
						name="password"
						label="Новый пароль"
						required
					/>
					<FormInput
						type="password"
						name="confirmPassword"
						label="Повторите пароль"
						required
					/>

					<Button
						disabled={form.formState.isSubmitting}
						className="text-base mt-10"
						type="submit">
						Обновить
					</Button>

					<Button
						onClick={onClickSignOut}
						variant="secondary"
						disabled={form.formState.isSubmitting}
						className="text-base"
						type="button">
						Выход из аккаунта
					</Button>
				</form>
			</FormProvider>
		</Container>
	);
};
