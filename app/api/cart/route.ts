import { prisma } from '@/prisma/prisma-client';
import { updateCartTotalAmount } from '@/shared/lib';
import { findOrCreateCart } from '@/shared/lib/find-or-create-cart';
import { CreateCartItemValues } from '@/shared/services/dto/cart.dto';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Получает корзину пользователя, используя token из cookies.
 * Если token корзины не найден, возвращает пустую корзину с нулевой общей суммой.
 *
 * @param {NextRequest} req - Объект входящего запроса, содержащий cookies.
 *
 * @returns {Promise<NextResponse>} Ответ в формате JSON, содержащий
 * детали корзины пользователя, включая элементы: автомобили и тарифы.
 *
 * Если происходит ошибка, возвращает ответ в формате JSON с
 * сообщением об ошибке и кодом состояния 500.
 */

/**
 * Добавляет элемент в корзину или увеличивает количество существующего элемента.
 *
 * @param {NextRequest} req - Объект входящего запроса, содержащий данные элемента и cookies.
 *
 * @returns {Promise<NextResponse>} Ответ в формате JSON, содержащий обновленные детали корзины,
 * включая элементы: автомобили и тарифы. Устанавливает cookie `cartToken` если он отсутствует.
 *
 * Если происходит ошибка, возвращает ответ в формате JSON с
 * сообщением об ошибке и кодом состояния 500.
 */

export async function GET(req: NextRequest) {
	try {
		const token = req.cookies.get('cartToken')?.value;

		if (!token) {
			return NextResponse.json({ totalAmount: 0, items: [] });
		}

		// Находим корзину пользователя, используя token
		const userCart = await prisma.cartDB.findFirst({
			where: {
				token,
			},
			include: {
				items: {
					orderBy: {
						createdAt: 'desc', // Упорядочиваем элементы по дате создания в порядке убывания
					},
					include: {
						productItem: {
							include: {
								product: true, // Включаем автомобиль в каждый элемент корзины
							},
						},
						plan: true, // Включаем тариф в каждый элемент корзины
					},
				},
			},
		});

		return NextResponse.json(userCart);
	} catch (error) {
		console.log('[GET_CART] Server Error', error);
		return NextResponse.json(
			{ message: 'Не удалось получить корзину' },
			{ status: 500 }
		);
	}
}

export async function POST(req: NextRequest) {
	try {
		// Получаем токен из cookies
		let token = req.cookies.get('cartToken')?.value;

		// Генерируем случайный токен, если он отсутствует
		if (!token) {
			token = crypto.randomUUID();
		}

		// Находим или создаем корзину пользователя
		const userCart = await findOrCreateCart(token);

		// Получаем данные из тела запроса
		const data = (await req.json()) as CreateCartItemValues;

		/**
		 * Ищем элемент корзины, который соответствует полученным данным.
		 * Если он существует, то увеличиваем его количество, если нет - то создаем новый.
		 *
		 * @param {number} data.productItemId - ID позиции автомобиля
		 * @param {number[]} data.plan - ID тарифов
		 *
		 * @returns {Promise<CartItemDB | null>} - Найденный элемент корзины или null
		 */
		const findCartItem = await prisma.cartItemDB.findFirst({
			where: {
				cartId: userCart.id,
				productItemId: data.productItemId,
				plan: { every: { id: { in: data.plan } } },
			},
		});

		if (findCartItem) {
			await prisma.cartItemDB.update({
				where: {
					id: findCartItem.id,
				},
				data: {
					quantity: findCartItem.quantity + 1,
				},
			});
		} else {
			await prisma.cartItemDB.create({
				data: {
					cartId: userCart.id,
					productItemId: data.productItemId,
					quantity: 1,
					plan: { connect: data.plan?.map((id) => ({ id })) },
				},
			});
		}

		const updatedUserCart = await updateCartTotalAmount(token);
		const resp = NextResponse.json(updatedUserCart);
		resp.cookies.set('cartToken', token);
		return resp;
	} catch (error) {
		console.log('[POST_CART] Server Error', error);
		return NextResponse.json(
			{ message: 'Не удалось создать корзину' },
			{ status: 500 }
		);
	}
}
