'use client';

import React from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormInput } from '@/shared/components/shared/form/form-input';
import { useRouter, useParams } from 'next/navigation';
import { createPlans, updatePlans } from '@/app/actions';
import toast from 'react-hot-toast';
import { DashboardFormHeader } from '../../dashboard-form-header';
import {
	CreatePlansFormSchema,
	CreatePLansFormValues,
} from '@/shared/components/shared/dashboard/forms/create-plans-form/constants';
import { DeleteButton } from '../../delete-button';

type Plans = {
	id: number;
	name: string;
	price: number;
};

interface Props {
	values?: Plans | null;
}

/**
 * Компонент для создания или редактирования тарифного плана.
 *
 * @param {Props} props - Свойства компонента.
 * @param {PlanDB} [props.values] - Начальные значения для формы плана.
 *
 * Этот компонент использует форму с полями ввода для создания или редактирования
 * тарифных планов. Он обрабатывает отправку данных для создания или обновления
 * планов с помощью `react-hook-form` с валидацией, основанной на `zod`.
 * Отображает состояние загрузки и обрабатывает успешные и ошибочные уведомления
 * с помощью `react-hot-toast`.
 *
 * @returns {JSX.Element} Отрисованный компонент формы плана.
 */

export const CreatePlansForm: React.FC<Props> = ({ values }) => {
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

	/**
	 * Обработчик отправки формы.
	 *
	 * @param {CreatePLansFormValues} data - Данные формы.
	 *
	 * Если параметр `id` из `useParams` существует, то обновляет соответствующий
	 * тариф, иначе - создает новый.
	 *
	 * @throws {Error} - Если произошла ошибка.
	 */
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
