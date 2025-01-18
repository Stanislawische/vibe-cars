'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
	CheckoutAdressForm,
	CheckoutCart,
	CheckoutPersonalForm,
	CheckoutSidebar,
	Container,
	Title,
} from '@/shared/components';
import { checkoutFormSchema, TCheckoutFormValues } from '@/shared/constants';
import { useCart } from '@/shared/hooks';
import { createOrder } from '@/app/actions';
import toast from 'react-hot-toast';
import React from 'react';

/**
 * Отрисовывает страницу оформления заказа, где пользователи могут просматривать
 * добавленные в корзину автомобили, заполнять персональную и адресную
 * форму, и продолжить оформление заказа.
 *
 * Использует react-hook-form для управления формами и zod для валидации
 * схемы. Получает данные о корзине и действиях через хук useCart.
 * Обрабатывает создание заказа и отображает уведомления toast об успешном
 * или ошибочном результате.
 *
 * @returns {ReactElement} Отрисовываемый компонент страницы оформления
 *          заказа.
 */

export default function CheckoutPage() {
	const { totalAmount, items, updateItemQuantity, removeCartItem, loading } =
		useCart();
	const [submiting, setSubmiting] = React.useState(false);

	const form = useForm<TCheckoutFormValues>({
		resolver: zodResolver(checkoutFormSchema),
		defaultValues: {
			email: '',
			firstName: '',
			lastName: '',
			phone: '',
			address: '',
			comment: '',
		},
	});

	const onSubmit = async (data: TCheckoutFormValues) => {
		try {
			setSubmiting(true);

			const url = await createOrder(data);

			toast.success('Заказ успешно оформлен! 📤 Переход на оплату...', {
				style: {
					width: '600px',
					borderRadius: '50px',
					background: '#333',
					color: '#fff',
					border: '1px solid #666',
					fontSize: '14px',
					fontWeight: 'bold',
				},
			});

			if (url) {
				location.href = url;
			}
		} catch (err) {
			console.error(err);
			setSubmiting(false);
			toast.error('Не удалось создать заказ', {
				icon: '❌',
				style: {
					width: '600px',
					borderRadius: '50px',
					background: '#333',
					color: '#fff',
					border: '1px solid #666',
					fontSize: '14px',
					fontWeight: 'bold',
				},
			});
		}
	};

	const onClickCountButton = (
		id: number,
		quantity: number,
		type: 'plus' | 'minus'
	) => {
		const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
		updateItemQuantity(id, newQuantity);
	};

	return (
		<Container className="mt-10">
			<Title text="Оформление заказа" className="font-bold mb-8 text-[36px]" />
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="flex gap-10">
						{/* Левая сторона */}
						<div className="flex flex-col gap-10 flex-1 mb-20">
							<CheckoutCart
								onClickCountButton={onClickCountButton}
								removeCartItem={removeCartItem}
								items={items}
								loading={loading}
							/>

							<CheckoutPersonalForm
								className={loading ? 'opacity-40 pointer-events-none' : ''}
							/>

							<CheckoutAdressForm
								className={loading ? 'opacity-40 pointer-events-none' : ''}
							/>
						</div>

						{/* Правая сторона */}
						<div className="w-[450px]">
							<CheckoutSidebar
								totalAmount={totalAmount}
								items={items}
								loading={loading || submiting}
							/>
						</div>
					</div>
				</form>
			</FormProvider>
		</Container>
	);
}
