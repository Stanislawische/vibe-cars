import { PaymentData } from '@/@types/acquering';
import axios from 'axios';

interface Props {
	description: string;
	orderId: number;
	amount: number;
}

export async function createPayment(details: Props): Promise<PaymentData> {
	try {
		const { data } = await axios.post<PaymentData>(
			process.env.ACQUERING_PAYMENT_URL as string,
			{
				amount: {
					value: details.amount,
					currency: 'RUB',
				},
				capture: true,
				description: details.description,
				metadata: {
					order_id: details.orderId,
				},
				confirmation: {
					type: 'redirect',
					return_url: process.env.ACQUERING_CALLBACK_URL,
				},
			},
			{
				auth: {
					username: process.env.ACQUERING_STORE_ID as string,
					password: process.env.ACQUERING_API_KEY as string,
				},
				headers: {
					'Idempotence-Key': Math.random().toString(36).substring(7),
				},
			}
		);
		return data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error(error.response?.data);
		} else {
			console.error(error);
		}
		throw new Error('Ошибка при создании платежа');
	}
}

