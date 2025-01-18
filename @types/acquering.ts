/**
 * Интерфейс данных о платеже, возвращаемых после создания
 * платежа.
 *
 * @prop {string} id - ID платежа.
 * @prop {string} status - Состояние платежа.
 * @prop {Amount} amount - Информация о сумме платежа.
 * @prop {string} description - Описание платежа.
 * @prop {Recipient} recipient - Информация о получателе платежа.
 * @prop {string} created_at - Дата и время создания платежа.
 * @prop {Confirmation} confirmation - Информация о подтверждении платежа.
 * @prop {boolean} test - Флаг, указывающий, является ли платеж тестовым.
 * @prop {boolean} paid - Флаг, указывающий, был ли платеж оплачен.
 * @prop {boolean} refundable - Флаг, указывающий, может ли быть платеж
 *    возвращен.
 * @prop {Metadata} metadata - Метаданные платежа.
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
 * Интерфейс информации о сумме платежа.
 *
 * @prop {string} value - Сумма платежа.
 * @prop {string} currency - Валюта платежа.
 */
export interface Amount {
	value: string;
	currency: string;
}

/**
 * Интерфейс информации о получателе платежа.
 *
 * @prop {string} account_id - ID счета получателя.
 * @prop {string} gateway_id - ID шлюза получателя.
 */
export interface Recipient {
	account_id: string;
	gateway_id: string;
}

/**
 * Интерфейс информации о подтверждении платежа.
 *
 * @prop {string} type - Тип подтверждения.
 * @prop {string} confirmation_url - URL-адрес подтверждения.
 */
export interface Confirmation {
	type: string;
	confirmation_url: string;
}

/**
 * Интерфейс метаданных платежа.
 *
 * @prop {string} order_id - ID заказа.
 */
export interface Metadata {
	order_id: string;
}

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

