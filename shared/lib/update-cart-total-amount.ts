import { prisma } from "@/prisma/prisma-client"
import { calcCartItemTotalPrice } from "./calc-cart-item-total-price";


/**
 * Обновляет общую сумму корзины.
 * 
 * @param {string} token - токен корзины.
 * 
 * @returns {Promise<CartDB | null>} - обновленный объект корзины.
 */
export const updateCartTotalAmount = async (token: string) => {
    const userCart = await prisma.cartDB.findFirst({
        
        where: {
            token
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
                        }
                    },
                    plan: true // Включаем тариф в каждый элемент корзины
                }
            }
        }
    });

    if (!userCart) {
        return;
    }

    const totalAmount = userCart.items.reduce((acc, item) => {
        return acc + calcCartItemTotalPrice(item);
    }, 0);

    return await prisma.cartDB.update({
        where: {
            id: userCart.id
        },
        data: {
            totalAmount
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
                        }
                    },
                    plan: true // Включаем тариф в каждый элемент корзины
                }
            }
        }
    });
}