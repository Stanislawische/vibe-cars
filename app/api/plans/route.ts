import { prisma } from '@/prisma/prisma-client';
import { NextResponse } from 'next/server';

/**
 * Получает список тарифов из базы данных.
 * @returns JSON ответ, содержащий список тарифов.
 */

export async function GET() {
	try {
		const plans = await prisma.planDB.findMany();

		return NextResponse.json({ plans });
	} catch (error) {
		console.log('[GET_PLANS_ERROR] Error:', error);
		return NextResponse.json(
			{ error: 'Не удалось получить список тарифов' },
			{ status: 500 }
		);
	}
}
