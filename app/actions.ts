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
				totalAmount: userCart.totalAmount,
				items: JSON.stringify(userCart.items),
			},
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

		// Создаем новый платеж, связываем его с только что созданным заказом,
		// указываем сумму платежа, id заказа, описание
		const paymentData = await createPayment({
			amount: order.totalAmount,
			orderId: order.id,
			description: 'Оплата заказа #' + order.id,
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

export async function deleteUser(id: number) {
  await prisma.userDB.delete({
    where: {
      id,
    },
  });

  revalidatePath('/dashboard/users');
}

export async function updateCategory(id: number, data: Prisma.CategoryDBUpdateInput) {
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

export async function deleteCategory(id: number) {
  await prisma.categoryDB.delete({
    where: {
      id,
    },
  });

  revalidatePath('/dashboard/categories');
}

export async function updateProduct(id: number, data: Prisma.ProductDBUpdateInput) {
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

export async function deleteProduct(id: number) {
  await prisma.productDB.delete({
    where: {
      id,
    },
  });

  revalidatePath('/dashboard/products');
}

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

export async function updateProductItemDB(id: number, data: Prisma.ProductItemDBUpdateInput) {
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

export async function createProductItemDB(data: Prisma.ProductItemDBUncheckedCreateInput) {
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
