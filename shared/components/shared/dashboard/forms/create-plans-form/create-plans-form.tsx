'use client';

import React from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormInput } from '@/shared/components/shared/form/form-input';
import { useRouter, useParams } from 'next/navigation';
import { createPlans, updatePlans } from '@/app/actions';
import toast from 'react-hot-toast';
import { DashboardFormHeader } from '../../dashboard-form-header';
import { PlanDB } from '@prisma/client';
import {
	CreatePlansFormSchema,
	CreatePLansFormValues,
} from '@/shared/components/shared/dashboard/forms/create-plans-form/constants';
import { DeleteButton } from '../../delete-button';
import { Label } from '@/shared/components/ui/label';

interface Props {
	values?: PlanDB;
}

export const CreatePLansForm: React.FC<Props> = ({ values }) => {
	const params = useParams<{ id: string }>();
	const router = useRouter();
	const [loading, setLoading] = React.useState(false);

	const form = useForm<CreatePLansFormValues>({
		defaultValues: {
			name: values?.name || '',
			price: values?.price ? String(values?.price) : '',
		},
		resolver: zodResolver(CreatePlansFormSchema),
	});

	const onSubmit: SubmitHandler<CreatePLansFormValues> = async (data) => {
		try {
			setLoading(true);

			const fields = {
				...data,
				price: Number(data.price),
			};

			if (params.id) {
				await updatePlans(+params.id, fields);
			} else {
				await createPlans(fields);
				router.push('/dashboard/plans');
			}
			toast.success('Тариф успешно создан');
			console.log(data);
		} catch (error) {
			console.log('Error [CREATE_PLANS]', error);
			toast.error('Произошла ошибка');
		} finally {
			setLoading(false);
		}
	};

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<DashboardFormHeader isEdit={!!values} loading={loading} />
				<div className="flex items-center border shadow-sm rounded-lg grid grid-cols-2 gap-5 p-5">
					<div>
						<FormInput name="name" label="Название" required />
						<FormInput name="price" label="Цена" required className='mb-2'/>
						<DeleteButton id={+params.id} type="plan" />
					</div>
				</div>
			</form>
		</FormProvider>
	);
};
