import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Возвращает список всех пользователей в базе данных.
 *
 * @returns {Promise<NextResponse>} Ответ в формате JSON, содержащий массив объектов пользователей.
 */
export async function GET() {
	try {
		const users = await prisma.userDB.findMany();

		return NextResponse.json({ users });
	} catch (error) {
		console.log('[GET_USERS_ERROR] Error:', error);
		return NextResponse.json(
			{ error: 'Не удалось получить список пользователей' },
			{ status: 500 }
		);
	}
}

export async function POST(req: NextRequest) {
	try {
		const data = await req.json();

		const user = await prisma.userDB.create({
			data: data,
		});

		return NextResponse.json({ user });
	} catch (error) {
		console.log('[CREATE_USER_ERROR] Error:', error);
		return NextResponse.json(
			{ error: 'Не удалось создать пользователя' },
			{ status: 500 }
		);
	}
}
