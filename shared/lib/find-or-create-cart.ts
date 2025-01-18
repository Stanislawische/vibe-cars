import { prisma } from "@/prisma/prisma-client";

/**
 * Ищет корзину по токену, или создает новую, если ее не существует.
 * @param token Токен для поиска.
 * @returns Объект корзины.
 */
export const findOrCreateCart = async (token: string) => {
    let userCart = await prisma.cartDB.findFirst({
        where: {
            token,
        }
    });

    if (!userCart) {
        userCart = await prisma.cartDB.create({
            data: {
                token,
            },
        });
    }

    return userCart;
};