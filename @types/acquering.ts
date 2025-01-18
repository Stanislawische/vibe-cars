/**
 * Информация о платеже
 *
 * @prop {string} id - id платежа
 * @prop {string} status - статус платежа
 * @prop {Amount} amount - сумма платежа
 * @prop {string} description - описание платежа
 * @prop {Recipient} recipient - получатель платежа
 * @prop {string} created_at - дата создания платежа
 * @prop {Confirmation} confirmation - информация о подтверждении платежа
 * @prop {boolean} test - тестовый платеж
 * @prop {boolean} paid - оплачено
 * @prop {boolean} refundable - можно ли вернуть деньги
 * @prop {Metadata} metadata - metadata платежа
 */
export interface PaymentData {
	id: string;
	status: string;
	amount: Amount;
	description: string;
	recipient: Recipient;
	created_at: string;
	confirmation: Confirmation;
	test: boolean;
	paid: boolean;
	refundable: boolean;
	metadata: Metadata;
}

/**
 * Сумма платежа
 *
 * @prop {string} value - сумма
 * @prop {string} currency - валюта
 */
export interface Amount {
	value: string;
	currency: string;
}

/**
 * Получатель платежа
 *
 * @prop {string} account_id - id аккаунта
 * @prop {string} gateway_id - id шлюза
 */
export interface Recipient {
	account_id: string;
	gateway_id: string;
}

/**
 * Информация о подтверждении платежа
 *
 * @prop {string} type - тип подтверждения
 * @prop {string} confirmation_url - url подтверждения
 */
export interface Confirmation {
	type: string;
	confirmation_url: string;
}

/**
 * Metadata платежа
 *
 * @prop {string} order_id - id заказа
 */
export interface Metadata {
	order_id: string;
}

/**
 * Тип данных, приходящий в callback Acquiring
 *
 * @prop {string} type - тип события
 * @prop {string} event - тип события
 * @prop {object} object - объект с информацией о платеже
 * @prop {string} object.id - id платежа
 * @prop {string} object.status - статус платежа
 * @prop {object} object.amount - сумма платежа
 * @prop {string} object.amount.value - сумма
 * @prop {string} object.amount.currency - валюта
 * @prop {object} object.income_amount - сумма, приходящая на счет
 * @prop {string} object.income_amount.value - сумма
 * @prop {string} object.income_amount.currency - валюта
 * @prop {string} object.description - описание платежа
 * @prop {object} object.recipient - получатель платежа
 * @prop {string} object.recipient.account_id - id аккаунта
 * @prop {string} object.recipient.gateway_id - id шлюза
 * @prop {object} object.payment_method - информация о способе оплаты
 * @prop {string} object.payment_method.type - тип способа оплаты
 * @prop {string} object.payment_method.id - id способа оплаты
 * @prop {boolean} object.payment_method.saved - сохранен ли способ оплаты
 * @prop {string} object.payment_method.title - название способа оплаты
 * @prop {string} object.captured_at - дата подтверждения платежа
 * @prop {string} object.created_at - дата создания платежа
 * @prop {boolean} object.test - тестовый платеж
 * @prop {object} object.refunded_amount - сумма, возвращенная пользователю
 * @prop {string} object.refunded_amount.value - сумма
 * @prop {string} object.refunded_amount.currency - валюта
 * @prop {boolean} object.paid - оплачено
 * @prop {boolean} object.refundable - можно ли вернуть деньги
 * @prop {object} object.metadata - metadata платежа
 * @prop {string} object.metadata.order_id - id заказа
 * @prop {object} object.authorization_details - информация о подтверждении платежа
 * @prop {string} object.authorization_details.rrn - номер авторизации
 * @prop {string} object.authorization_details.auth_code - код авторизации
 */
export type PaymentCallbackData = {
	type: string;
	event: string;
	object: {
		id: string;
		status: string;
		amount: { value: string; currency: 'RUB' };
		income_amount: { value: string; currency: 'RUB' };
		description: string;
		recipient: { account_id: string; gateway_id: string };
		payment_method: {
			type: string;
			id: string;
			saved: boolean;
			title: string;
		};
		captured_at: string;
		created_at: string;
		test: boolean;
		refunded_amount: { value: string; currency: 'RUB' };
		paid: boolean;
		refundable: true;
		metadata: { order_id: string };
		authorization_details: {
			rrn: string;
			auth_code: string;
		};
	};
};
