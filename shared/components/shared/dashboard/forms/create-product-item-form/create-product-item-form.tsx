'use client';

import React from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormInput } from '@/shared/components/shared/form/form-input';
import type { ProductDB, ProductItemDB } from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { createProductItemDB, updateProductItemDB } from '@/app/actions';
import { DashboardFormHeader } from '../../dashboard-form-header';
import {
	CreateProductItemFormSchema,
	CreateProductItemFormValues,
} from './constants';
import { FormSelect } from '@/shared/components/shared/form/form-select';
import { DeleteButton } from '../../delete-button';

interface Props {
	values?: ProductItemDB;
	products: ProductDB[];
}

export const CreateProductItemForm: React.FC<Props> = ({
	values,
	products,
}) => {
	const params = useParams<{ id: string }>();
	const router = useRouter();
	const [loading, setLoading] = React.useState(false);

	const form = useForm<CreateProductItemFormValues>({
		defaultValues: {
			price: values?.price ? String(values?.price) : '',
			productId: values?.productId ? String(values?.productId) : '',
			description: values?.description ? String(values?.description) : '',
			color: values?.color ? String(values?.color) : '',
			horsepower: values?.horsepower ? String(values?.horsepower) : '',
			gearbox: values?.gearbox ? String(values?.gearbox) : '',
		},
		resolver: zodResolver(CreateProductItemFormSchema),
	});

	const onSubmit: SubmitHandler<CreateProductItemFormValues> = async (data) => {
		try {
			setLoading(true);

			const fields = {
				price: Number(data.price),
				productId: Number(data.productId),
				description: String(data.description),
				color: Number(data.color),
				horsepower: Number(data.horsepower),
				gearbox: Number(data.gearbox),
			};

			if (params.id) {
				await updateProductItemDB(+params.id, fields);
			} else {
				await createProductItemDB(fields);
				router.push('/dashboard/product-items');
			}
			toast.success('Автомобиль успешно создан');
			console.log(data);
		} catch (error) {
			console.log('Error [CREATE_PRODUCT_ITEM]', error);
			toast.error('Произошла ошибка');
		} finally {
			setLoading(false);
		}
	};

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<DashboardFormHeader isEdit={!!values} loading={loading} />
				<div className="border shadow-sm rounded-lg grid grid-cols-2 gap-5 p-5">
					<FormInput name="price" label="Цена" required />
					<FormInput name="description" label="Описание" required />
					<FormInput name="horsepower" label="Мощность" required />
					<FormSelect
						name="gearbox"
						label="Коробка передач"
						placeholder="Выберите коробку передач..."
						items={[
							{
								value: '1',
								label: 'Автомат',
							},
							{
								value: '2',
								label: 'Механика',
							},
						]}
					/>
					<FormSelect
						name="color"
						label="Цвет"
						placeholder="Выберите цвет..."
						items={[
							{
								value: '1',
								label: 'Черный',
							},
							{
								value: '2',
								label: 'Белый',
							},
							{
								value: '3',
								label: 'Серый',
							},
							{
								value: '4',
								label: 'Красный',
							},
							{
								value: '5',
								label: 'Зеленый',
							},
							{
								value: '6',
								label: 'Синий',
							},
							{
								value: '7',
								label: 'Желтый',
							},
							{
								value: '8',
								label: 'Голубой',
							},
							{
								value: '9',
								label: 'Оранжевый',
							},
							{
								value: '10',
								label: 'Розовый',
							},
						]}
					/>
					<FormSelect
						name="productId"
						label="Продукт"
						placeholder="Выберите продукт..."
						items={products.map((product) => ({
							value: product.id.toString(),
							label: product.name,
						}))}
						defaultValue={values?.productId?.toString()}
					/>
					
				<DeleteButton id={Number(params.id)} type="product" /> 
				</div>
			</form>
		</FormProvider>
	);
};
