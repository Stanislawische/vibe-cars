import { PaymentCallbackData } from '@/@types/acquering';
import { prisma } from '@/prisma/prisma-client';
import { OrderSuccecTemplate } from '@/shared/components/shared/email-templates/order-success';
import { sendEmail } from '@/shared/lib';
import { CartItemDTO } from '@/shared/services/dto/cart.dto';
import { OrderStatusDB } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Callback-функция для сервиса оплаты. Обновляет статус заказа и отправляет
 * письмо об успехе пользователю, если оплата прошла успешно.
 *
 * @param {NextRequest} req - Объект запроса
 * @returns {Promise<NextResponse>} Обновленный заказ и отправленное письмо,
 * если оплата прошла успешно, или ошибка, если что-то пошло не так
 */
export async function POST(req: NextRequest) {
	try {
		const body = (await req.json()) as PaymentCallbackData;

		const order = await prisma.orderDB.findFirst({
			where: {
				id: Number(body.object.metadata.order_id),
			},
		});

		if (!order) {
			return NextResponse.json({ error: 'Order not found' }, { status: 404 });
		}

		const isSucceeded = body.object.status === 'succeeded';

		await prisma.orderDB.update({
			where: {
				id: order.id,
			},
			data: {
				status: isSucceeded ? OrderStatusDB.SUCCEEDED : OrderStatusDB.CANCELLED,
			},
		});

		const items = JSON.parse(
			order?.items as unknown as string
		) as CartItemDTO[];

		if (isSucceeded) {
			await sendEmail(
				order.email,
				'VIBE CARS | Заказ No' + order.id + ' успешно оплачен',
				OrderSuccecTemplate({
					orderId: order.id,
					totalAmount: order.totalAmount,
					items,
				})
			);
		} else {
			//TODO: отправить письмо с отменой заказа
		}
	} catch (error) {
		console.log('[POST_CHECKOUT_CALLBACK] Error:', error);
		return NextResponse.json({ error: 'Server error' }, { status: 500 });
	}
}
