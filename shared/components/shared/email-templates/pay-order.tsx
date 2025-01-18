import * as React from 'react';

interface Props {
	orderId: number;
	totalAmount: number;
	paymentUrl: string;
}

export const PayOrderTemplate: React.FC<Props> = ({
	orderId,
	totalAmount,
	paymentUrl,
}) => (
	<div>
		<h1>Заказ No {orderId}. </h1>
		<p>
			Здравствуйте, этим письмом мы уведомляем Вас о необходимости оплаты
			заказа.
		</p>
		<hr />
		<p>
			Произведите оплату по заказу на сумму: <b>{totalAmount} BYN.</b>
			<br />
			Перейдите <a href={paymentUrl}>по этой ссылке</a> для оплаты.
		</p>
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
