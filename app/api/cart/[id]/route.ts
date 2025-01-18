import { prisma } from '@/prisma/prisma-client';
import { updateCartTotalAmount } from '@/shared/lib';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Обновляет количество товара в корзине.
 *
 * @param {NextRequest} req - Объект запроса.
 * @param {Object} params - Объект параметров, содержащий ID позиции корзины.
 *
 * @returns {NextResponse} Объект ответа, содержащий обновленный объект передачи данных корзины.
 */
export async function PATCH(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const props = await params;
	const { id } = props;

	try {
		const data = (await req.json()) as { quantity: number };
		const token = req.cookies.get('cartToken')?.value;

		if (!token) {
			return NextResponse.json({ message: 'Корзина не найдена' });
		}

		const cartItem = await prisma.cartItemDB.findFirst({
			where: {
				id: Number(id),
			},
		});

		if (!cartItem) {
			return NextResponse.json({ message: 'Товар не найден' });
		}

		await prisma.cartItemDB.update({
			where: {
				id: Number(id),
			},
			data: {
				quantity: data.quantity,
			},
		});

		const updatedUserCart = await updateCartTotalAmount(token);

		return NextResponse.json(updatedUserCart);
	} catch (error) {
		console.log('[PATCH_CART] Server Error', error);
		return NextResponse.json(
			{ message: 'Не удалось обновить корзину' },
			{ status: 500 }
		);
	}
}

/**
 * Удаляет позицию из корзины пользователя.
 *
 * @param {NextRequest} req - Объект запроса.
 * @param {Object} params - Объект параметров, содержащий ID позиции корзины.
 *
 * @returns {NextResponse} Объект ответа, содержащий обновленный объект передачи данных корзины
 * или сообщение об ошибке в случае неудачи.
 */

export async function DELETE(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const props = await params;
	const { id } = props;

	try {
		const token = req.cookies.get('cartToken')?.value;

		if (!token) {
			return NextResponse.json({ message: 'Корзина не найдена' });
		}

		const cartItem = await prisma.cartItemDB.findFirst({
			where: {
				id: Number(id),
			},
		});

		if (!cartItem) {
			return NextResponse.json({ message: 'Товар не найден' });
		}

		await prisma.cartItemDB.delete({
			where: {
				id: Number(id),
			},
		});

		const updatedUserCart = await updateCartTotalAmount(token);

		return NextResponse.json(updatedUserCart);
	} catch (error) {
		console.log('[CART_DELETE] Server Error', error);
		return NextResponse.json(
			{ message: 'Не удалось удалить корзину' },
			{ status: 500 }
		);
	}
}
