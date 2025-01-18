import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Обрабатывает подтверждение аккаунта пользователя с помощью кода из URL запроса.
 *
 * @param {NextRequest} req - Объект входящего запроса, который содержит URL.
 * @returns {Promise<NextResponse>} Ответ в формате JSON, указывающий на успех или
 *   неудачу, или перенаправление на успех.
 *
 * - Если код подтверждения не найден в URL, возвращает ошибку 400.
 * - Если код подтверждения является недействительным, возвращает ошибку 400.
 * - Если код подтверждения является действительным, обновляет статус
 *   подтверждения пользователя и удаляет код подтверждения из базы данных.
 * - При успешном подтверждении перенаправляет пользователя на домашнюю страницу
 *   с параметром verified.
 * - Логирует любые ошибки, возникшие во время процесса.
 */

export async function GET(req: NextRequest) {
	try {
		const code = req.nextUrl.searchParams.get('code');
		if (!code) {
			return NextResponse.json({ error: 'Код не найден' }, { status: 400 });
		}
		const verificationCode = await prisma.verificationCodeDB.findFirst({
			where: {
				code,
			},
		});

		if (!verificationCode) {
			return NextResponse.json({ error: 'Неверный код' }, { status: 400 });
		}

		await prisma.userDB.update({
			where: {
				id: verificationCode.userId,
			},
			data: {
				verified: new Date(),
			},
		});

		await prisma.verificationCodeDB.delete({
			where: {
				id: verificationCode.id,
			},
		});

		return NextResponse.redirect(new URL('/?verified', req.url));
	} catch (error) {
		console.log(error);
		console.log('[GET_VERIFY] Error:', error);
	}
}
