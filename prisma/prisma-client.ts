import { PrismaClient } from '@prisma/client';

/**
 * Создает новый экземпляр PrismaClient.
 *
 * Эта функция используется для создания singleton-экземпляра PrismaClient.
 * Singleton-экземпляр хранится в переменной globalThis.prismaGlobal.
 * Если переменная не установлена, создается новый экземпляр PrismaClient.
 * В противном случае возвращается существующий экземпляр.
 *
 * @returns {PrismaClient} Экземпляр PrismaClient.
 */

const PrismaClientSingleton = () => {
	return new PrismaClient();
};

declare global {
	// eslint-disable-next-line no-var
	var prismaGlobal: undefined | ReturnType<typeof PrismaClientSingleton>;
}

export const prisma = globalThis.prismaGlobal ?? PrismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
