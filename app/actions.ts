'use server';

import { prisma } from '@/prisma/prisma-client';
import {
	PayOrderTemplate,
	VerificationUserTemplate,
} from '@/shared/components';
import { TCheckoutFormValues } from '@/shared/constants';
import { createPayment, sendEmail } from '@/shared/lib';
import { getUserSession } from '@/shared/lib/get-user-session';
import { OrderStatusDB, Prisma, UserRoleDB } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const TAX = 20;
const DELIVERY_PRICE = 25;

/**
 * Создает заказ на основе данных из формы.
 *
 * @param {TCheckoutFormValues} data - Объект с данными формы.
 *
 * @throws {Error} если корзина не найдена, или она пуста, или
 *                  не удалось создать платеж.
 */
export async function createOrder(data: TCheckoutFormValues) {
	const session = await getUserSession();

	if (!session) {
		return redirect('/not-auth');
	}

	const user = await prisma.userDB.findFirst({
		where: {
			id: Number(session?.id),
		},
	});

	if (!user) {
		return redirect('/not-auth');
	}
	try {
		// Получаем cookie с токеном корзины
		const cookieStore = await cookies();
		const cartToken = cookieStore.get('cartToken')?.value;

		// Если cookie с токеном корзины не существует, выбрасываем ошибку
		if (!cartToken) {
			throw new Error('Корзина не найдена. Возможно корзины не существует.');
		}

		// Поиск корзины пользователя с указанным токеном
		const userCart = await prisma.cartDB.findFirst({
			// Включаем связанные данные: пользователя, элементы корзины, тарифы и информацию о продукте
			include: {
				user: true,
				items: {
					include: {
						plan: true,
						productItem: {
							include: {
								product: true,
							},
						},
					},
				},
			},
			// Условие поиска по токену корзины
			where: {
				token: cartToken,
			},
		});

		// Если корзина не найдена, то кидаем ошибку
		if (!userCart) {
			throw new Error('Корзина не найдена');
		}

		// Проверяем, является ли общая сумма корзины равной нулю
		if (userCart?.totalAmount === 0) {
			// Если да, выбрасываем ошибку, указывая, что корзина пуста
			throw new Error('Корзина пуста');
		}
		
	
		const taxPrice = (userCart.totalAmount * TAX) / 100;
		const deliveryPrice =
		userCart.items.map((item) => item.quantity).reduce((acc, item) => acc + item, 0) *
			DELIVERY_PRICE || 0;
		const totalPrice = userCart.totalAmount + taxPrice + deliveryPrice;

		// Создаем новый заказ, связываем его с корзиной,
		// указываем полное имя, телефон, email, адрес, комментарий,
		// статус (ожидает) и общую сумму заказа
		// а также JSON-строку из элементов корзины
		const order = await prisma.orderDB.create({
			data: {
				token: cartToken,
				fullName: data.firstName + ' ' + data.lastName,
				phone: data.phone,
				email: data.email,
				address: data.address,
				comment: data.comment,
				status: OrderStatusDB.PENDING,
				totalAmount: totalPrice,
				items: JSON.stringify(userCart.items),
			},
		});

		// Создаем новый платеж, связываем его с только что созданным заказом,
		// указываем сумму платежа, id заказа, описание
		const paymentData = await createPayment({
			amount: order.totalAmount,
			orderId: order.id,
			description: 'Оплата заказа #' + order.id,
		});
		

		// Обнуляем общую сумму корзины, чтобы не было
		// возможности оформить заказ с обнуленной корзиной
		await prisma.cartDB.update({
			where: {
				id: userCart.id,
			},
			data: {
				totalAmount: 0,
			},
		});

		// Удаляем все элементы корзины, связанные с данным идентификатором корзины
		await prisma.cartItemDB.deleteMany({
			where: {
				cartId: userCart.id,
			},
		});

		// Если платеж не создан, выбрасываем ошибку
		if (!paymentData) {
			throw new Error('Платеж не создан');
		}

		// Обновляем заказ, добавляя id платежа
		await prisma.orderDB.update({
			where: {
				id: order.id,
			},
			data: {
				paymentId: paymentData.id,
			},
		});

		const paymentUrl = paymentData.confirmation.confirmation_url;

		// Отправляем письмо на email, содержащее сумму заказа
		// и ссылку на оплату
		await sendEmail(
			data.email,
			'VIBE CARS | Запрос на оплату заказа No ' + order.id,
			PayOrderTemplate({
				orderId: order.id,
				totalAmount: order.totalAmount,
				paymentUrl: paymentUrl,
			})
		);

		return paymentUrl;
	} catch (err) {
		console.log('[CREATE_ORDER_ERROR] Server Error', err);
	}
}

export async function updateUserInfo(body: Prisma.UserDBUpdateInput) {
	try {
		const currentUser = await getUserSession();

		if (!currentUser) {
			throw new Error('Пользователь не авторизован');
		}

		const findUser = await prisma.userDB.findFirst({
			where: {
				id: Number(currentUser.id),
			},
		});

		if (!findUser) {
			throw new Error('Пользователь не найден');
		}

		await prisma.userDB.update({
			where: {
				id: Number(currentUser.id),
			},
			data: {
				fullName: body.fullName,
				email: body.email,
				password: body.password
					? hashSync(body.password as string, 10)
					: findUser?.password,
			},
		});
	} catch (error) {
		console.log('[UPDATE_USER] Error:', error);
	}
}

export async function registerUser(body: Prisma.UserDBCreateInput) {
	try {
		const user = await prisma.userDB.findFirst({
			where: {
				email: body.email,
			},
		});

		if (user) {
			if (!user.verified) {
				throw new Error('Аккаунт не подтвержден');
			}

			throw new Error('Пользователь с таким email уже существует');
		}

		const createdUser = await prisma.userDB.create({
			data: {
				email: body.email,
				password: hashSync(body.password as string, 10),
				fullName: body.fullName,
				role: UserRoleDB.USER,
			},
		});

		const code = Math.floor(100000 + Math.random() * 900000).toString();

		await prisma.verificationCodeDB.create({
			data: {
				code,
				userId: createdUser.id,
			},
		});

		await sendEmail(
			createdUser.email,
			'VIBE CARS | Подтверждение аккаунта',
			VerificationUserTemplate({ code })
		);
	} catch (error) {
		console.log('[REGISTER_USER] Error:', error);
		throw error;
	}
}

/* Dashboard Actions */

/**
 * Обновляет данные пользователя.
 *
 * @param {number} id - ID пользователя.
 * @param {Prisma.UserDBUpdateInput} data - Обновленные данные пользователя.
 * @throws {Error} - Если произошла ошибка.
 */
export async function updateUser(id: number, data: Prisma.UserDBUpdateInput) {
	try {
		await prisma.userDB.update({
			where: {
				id,
			},
			data: {
				...data,
				verified: new Date(),
				...(data.password && { password: hashSync(String(data.password), 10) }),
			},
		});
	} catch (error) {
		console.log('Error [UPDATE_USER]', error);
		throw error;
	}
}

/**
 * Создает нового пользователя.
 *
 * @param {Prisma.UserDBCreateInput} data - Данные нового пользователя.
 * @throws {Error} - Если произошла ошибка.
 */
export async function createUser(data: Prisma.UserDBCreateInput) {
	try {
		await prisma.userDB.create({
			data: {
				...data,
				password: hashSync(data.password, 10),
			},
		});

		revalidatePath('/dashboard/users');
	} catch (error) {
		console.log('Error [CREATE_USER]', error);
		throw error;
	}
}

/**
 * Удаляет пользователя.
 *
 * @param {number} id - ID пользователя.
 * @throws {Error} - Если произошла ошибка.
 */
export async function deleteUser(id: number) {
	await prisma.userDB.delete({
		where: {
			id,
		},
	});

	revalidatePath('/dashboard/users');
}

/**
 * Обновляет данные категории.
 *
 * @param {number} id - ID категории.
 * @param {Prisma.CategoryDBUpdateInput} data - Обновленные данные категории.
 * @throws {Error} - Если произошла ошибка.
 */
export async function updateCategory(
	id: number,
	data: Prisma.CategoryDBUpdateInput
) {
	try {
		await prisma.categoryDB.update({
			where: {
				id,
			},
			data,
		});
	} catch (error) {
		console.log('Error [UPDATE_CATEGORY]', error);
		throw error;
	}
}

/**
 * Создает новую категорию.
 *
 * @param {Prisma.CategoryDBCreateInput} data - Данные новой категории.
 * @throws {Error} - Если произошла ошибка.
 */
export async function createCategory(data: Prisma.CategoryDBCreateInput) {
	try {
		await prisma.categoryDB.create({
			data,
		});

		revalidatePath('/dashboard/categories');
	} catch (error) {
		console.log('Error [CREATE_CATEGORY]', error);
		throw error;
	}
}

/**
 * Удаляет категорию.
 *
 * @param {number} id - ID категории.
 * @throws {Error} - Если произошла ошибка.
 */
export async function deleteCategory(id: number) {
	await prisma.categoryDB.delete({
		where: {
			id,
		},
	});

	revalidatePath('/dashboard/categories');
}

/**
 * Обновляет данные продукта.
 *
 * @param {number} id - ID продукта.
 * @param {Prisma.ProductDBUpdateInput} data - Обновленные данные продукта.
 * @throws {Error} - Если произошла ошибка.
 */
export async function updateProduct(
	id: number,
	data: Prisma.ProductDBUpdateInput
) {
	try {
		await prisma.productDB.update({
			where: {
				id,
			},
			data,
		});
	} catch (error) {
		console.log('Error [UPDATE_PRODUCT]', error);
		throw error;
	}
}

/**
 * Создает новый продукт.
 *
 * @param {Prisma.ProductDBCreateInput} data - Данные нового продукта.
 * @throws {Error} - Если произошла ошибка.
 */
export async function createProduct(data: Prisma.ProductDBCreateInput) {
	try {
		await prisma.productDB.create({
			data,
		});

		revalidatePath('/dashboard/products');
	} catch (error) {
		console.log('Error [CREATE_PRODUCT]', error);
		throw error;
	}
}

/**
 * Удаляет продукт.
 *
 * @param {number} id - ID продукта.
 * @throws {Error} - Если произошла ошибка.
 */
export async function deleteProduct(id: number) {
	await prisma.productDB.delete({
		where: {
			id,
		},
	});

	revalidatePath('/dashboard/products');
}

/**
 * Обновляет данные тарифа.
 *
 * @param {number} id - ID тарифа.
 * @param {Prisma.PlanDBUpdateInput} data - Обновленные данные тарифа.
 * @throws {Error} - Если произошла ошибка.
 */
export async function updatePlans(id: number, data: Prisma.PlanDBUpdateInput) {
	try {
		await prisma.planDB.update({
			where: {
				id,
			},
			data,
		});
	} catch (error) {
		console.log('Error [UPDATE_PLANS]', error);
		throw error;
	}
}

/**
 * Создает новый тариф.
 *
 * @param {Prisma.PlanDBCreateInput} data - Данные нового тарифа.
 * @throws {Error} - Если произошла ошибка.
 */
export async function createPlans(data: Prisma.PlanDBCreateInput) {
	try {
		await prisma.planDB.create({
			data: {
				name: data.name,
				price: data.price,
			},
		});

		revalidatePath('/dashboard/PLANS');
	} catch (error) {
		console.log('Error [CREATE_PLANS]', error);
		throw error;
	}
}

/**
 * Удаляет тариф.
 *
 * @param {number} id - ID тарифа.
 * @throws {Error} - Если произошла ошибка.
 */
export async function deletePLans(id: number) {
	try {
		await prisma.planDB.delete({
			where: {
				id,
			},
		});

		revalidatePath('/dashboard/plans');
	} catch (error) {
		console.log('Error [DELETE_PLANS]', error);
		throw error;
	}
}

/**
 * Обновляет данные элемента продукта.
 *
 * @param {number} id - ID элемента продукта.
 * @param {Prisma.ProductItemDBUpdateInput} data - Обновленные данные элемента продукта.
 * @throws {Error} - Если произошла ошибка.
 */
export async function updateProductItemDB(
	id: number,
	data: Prisma.ProductItemDBUpdateInput
) {
	try {
		await prisma.productItemDB.update({
			where: {
				id,
			},
			data,
		});
	} catch (error) {
		console.log('Error [UPDATE_PRODUCT_ITEM]', error);
		throw error;
	}
}

/**
 * Создает новый элемент продукта.
 *
 * @param {Prisma.ProductItemDBUncheckedCreateInput} data - Данные нового элемента продукта.
 * @throws {Error} - Если произошла ошибка.
 */
export async function createProductItemDB(
	data: Prisma.ProductItemDBUncheckedCreateInput
) {
	try {
		await prisma.productItemDB.create({
			data: {
				price: data.price,
				productId: data.productId,
				description: data.description,
				color: data.color,
				horsepower: data.horsepower,
				gearbox: data.gearbox,
			},
		});

		revalidatePath('/dashboard/product-items');
	} catch (error) {
		console.log('Error [CREATE_PRODUCT_ITEM]', error);
		throw error;
	}
}

/**
 * Удаляет элемент продукта.
 *
 * @param {number} id - ID элемента продукта.
 * @throws {Error} - Если произошла ошибка.
 */
export async function deleteProductItemDB(id: number) {
	try {
		await prisma.productItemDB.delete({
			where: {
				id,
			},
		});

		revalidatePath('/dashboard/product-items');
	} catch (error) {
		console.log('Error [DELETE_PRODUCT_ITEM]', error);
		throw error;
	}
}


