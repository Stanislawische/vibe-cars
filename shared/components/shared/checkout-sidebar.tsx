import React from 'react';
import { ZincBlock } from './zinc-block';
import { CheckoutItemDetails } from './checkout-item-details';
import { Button, Skeleton } from '../ui';
import { Car, Percent, Truck, ArrowRight } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { CartStateItem } from '@/shared/lib/get-cart-details';

interface Props {
	totalAmount: number;
	items: CartStateItem[];
	className?: string;
	loading?: boolean;
}

const TAX = 20;
const DELIVERY_PRICE = 30;

/**
 * Компонент, отображающий информацию о корзине,
 * включая сумму заказа, налог, доставку и кнопку для
 * перехода к оплате.
 *
 * @param {Object} props - Объект с пропсами.
 * @prop {number} totalAmount - Полная сумма заказа.
 * @prop {CartStateItem[]} items - Массив объектов, содержащий
 *    информацию о добавленных в корзину автомобилях.
 * @prop {string} [className] - Дополнительные CSS-классы для
 *    применения к блоку.
 *
 * @returns {ReactElement} Отрисовываемый блок.
 */
export const CheckoutSidebar: React.FC<Props> = ({
	totalAmount,
	items,
	className,
	loading,
}) => {
	const taxPrice = (totalAmount * TAX) / 100;
	const deliveryPrice =
		items.map((item) => item.quantity).reduce((acc, item) => acc + item, 0) *
			DELIVERY_PRICE || 25;
	const totalPrice = totalAmount + taxPrice + deliveryPrice;

	return (
		<ZincBlock className={cn('p-6 sticky top-4', className)}>
			<div className="flex flex-col gap-1">
				<span className="text-xl">Итого:</span>
				{loading ? (
					<Skeleton className="w-full h-8 rounded-sm" />
				) : (
					<span className="h-8 text-2xl font-bold">
						{totalPrice.toFixed(2)} BYN
					</span>
				)}
			</div>

			<CheckoutItemDetails
				title={
					<div className="flex items-center">
						<Car size={18} className="h-7 mr-2 text-neutral-400" />
						Стоимость корзины:
					</div>
				}
				value={
					loading ? (
						<Skeleton className="w-28 h-7 rounded-sm" />
					) : (
						`${totalAmount.toFixed(2)} BYN`
					)
				}
			/>
			<CheckoutItemDetails
				title={
					<div className="flex items-center">
						<Percent size={18} className="h-7 mr-2 text-neutral-400" />
						НДС:
					</div>
				}
				value={
					loading ? (
						<Skeleton className="w-28 h-7 rounded-sm" />
					) : (
						`${taxPrice.toFixed(2)} BYN`
					)
				}
			/>
			<CheckoutItemDetails
				title={
					<div className="flex items-center">
						<Truck size={18} className="mr-2 h-7 text-neutral-400" />
						Доставка:
					</div>
				}
				value={
					loading ? (
						<Skeleton className="w-28 h-7 rounded-sm" />
					) : (
						`${deliveryPrice} BYN`
					)
				}
			/>

			<Button
				loading={loading}
				type="submit"
				className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
				Перейти к оплате
				<ArrowRight className="w-5 ml-2" />
			</Button>
		</ZincBlock>
	);
};
