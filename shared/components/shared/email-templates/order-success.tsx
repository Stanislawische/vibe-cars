import { CartItemDTO } from '@/shared/services/dto/cart.dto';
import * as React from 'react';

interface Props {
	orderId: number;
	totalAmount: number;
	items: CartItemDTO[];
}

export const OrderSuccecTemplate: React.FC<Props> = ({
	orderId,
	totalAmount,
	items,
}) => (
	<div>
		<h1>Спасибо за заказ!</h1>

		<p>
			Ваш заказ No {orderId} на сумму: <b>{totalAmount} BYN</b> успешно оплачен.
			<br />
			В ближайшее время мы свяжемся с Вами для уточнения деталей, составления
			договора на прокат.
			<br />
			Список автомобилей:
		</p>

		<ul>
			{items.map((item) => (
				<li key={item.id}>
					{item.quantity} x {item.productItem.product.name} |{' '}
					<b>{item.productItem.price * item.quantity} BYN </b>
				</li>
			))}
		</ul>

		<hr />

		<p>
			Спасибо, Ваш VIBE CARS.
			<br />
			Сервис проката автомобилей
			<br />
			ул. Нововитебская, 138А
		</p>
	</div>
);
