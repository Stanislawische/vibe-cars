'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { formRegisterSchema, TFormRegisterValues } from './schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerUser } from '@/app/actions';
import toast from 'react-hot-toast';
import { FormInput } from '../../../form';
import { Button } from '@/shared/components/ui';
import React from 'react';
import { useDriverLicenseCheck, usePassportCheck } from '@/shared/hooks';

interface Props {
	onClose?: VoidFunction;
	onClickLogin?: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({ onClose }) => {
	const { passport, passportError, passportChange } = usePassportCheck();
	const { driverLicense, driverLicenseError, driverLicenseChange } =
		useDriverLicenseCheck();

	const form = useForm<TFormRegisterValues>({
		resolver: zodResolver(formRegisterSchema),
		defaultValues: {
			email: '',
			fullName: '',
			password: '',
			confirmPassword: '',
		},
	});

	const onSubmit = async (data: TFormRegisterValues) => {
		try {
			console.log(data);
			await registerUser({
				email: data.email,
				fullName: data.fullName,
				password: data.password,
			});

			toast.custom((t) => (
				<div
					className={`${
						t.visible ? 'animate-enter' : 'animate-leave'
					} max-w-md w-full bg-background border-2 border-primary shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
					<div className="flex-1 w-0 p-4">
						<div className="flex items-start">
							<div className="flex-shrink-0 pt-0.5">
								<img
									className="h-10 w-10"
									src="/assets/images/register.png"
									alt="Register"
								/>
							</div>
							<div className="ml-3 flex-1">
								<p className="mt-1 text-sm text-base text-white">
									Регистрация прошла успешно. На вашу почту было отправлено
									письмо с подтверждением.
								</p>
							</div>
						</div>
					</div>
					<div className="flex border-l border-gray-200">
						<button
							onClick={() => toast.dismiss(t.id)}
							className="w-full border bg-primary border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-lg font-bold text-black hover:text-white">
							Понятно!
						</button>
					</div>
				</div>
			));

			onClose?.();
		} catch (error) {
			console.log(error, '11');
			return toast.error('Неверный E-Mail или пароль', {
				style: {
					width: '270px',
					borderRadius: '50px',
					background: '#333',
					color: '#fff',
					border: '1px solid #666',
					fontSize: '14px',
					fontWeight: 'bold',
				},
				icon: '🙅🏻',
				duration: 5000,
			});
		}
	};

	console.log(form.formState);

	return (
		<FormProvider {...form}>
			<form
				className="flex flex-col gap-2"
				onSubmit={form.handleSubmit(onSubmit)}>
				<FormInput name="email" label="E-Mail" required type="email" />
				<FormInput name="fullName" label="Полное имя" required />
				<FormInput name="password" label="Пароль" type="password" required />
				<FormInput
					name="confirmPassword"
					label="Подтвердите пароль"
					type="password"
					required
				/>
				<FormInput
					className='text-sm' 
					onChange={passportChange}
					type="file"
					name="passport"
					label="Фото 25, 31, 33 страниц паспорта"
					accept="image/png"
					required
					multiple
				/>
				<FormInput
				className='text-sm'
					onChange={driverLicenseChange}
					type="file"
					name="driverLicense"
					content="Водительское удостоверение"
					label="Фото лицевой стороны водительского удостоверения"
					accept="image/png"					
					required
				/>
				<Button
					disabled={
						!!passportError.passport_upload ||
						!passport ||
						!driverLicense ||
						!!driverLicenseError.driveLicense_upload
					}
					loading={form.formState.isSubmitting}
					className="h-10 mt-4 text-base"
					type="submit">
					Зарегистрироваться
				</Button>
			</form>
		</FormProvider>
	);
};

