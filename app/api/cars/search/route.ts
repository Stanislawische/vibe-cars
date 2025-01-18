import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Ищет автомобили по имени. Поиск не зависит от регистра.
 * @param req.nextUrl.searchParams.get('query') Строка поиска
 * @returns Ответ в формате JSON, содержащий до 3 автомобилей, соответствующих запросу
 * @example
 * GET /api/cars/search?query=Geely
 * => [
 *   { id: 1, name: 'Geely Coolray New' },
 *   { id: 2, name: 'Geely Emgrand New' },
 *   { id: 3, name: 'Geely Monjaro' },
 * ]
 */

export async function GET(req: NextRequest) {
	try {
		const query = req.nextUrl.searchParams.get('query') || '';

		const cars = await prisma.productDB.findMany({
			where: {
				name: {
					contains: query,
					mode: 'insensitive',
				},
			},
			take: 3,
			orderBy: {
				name: 'asc',
			},
		});

		return NextResponse.json(cars);
	} catch (error) {
		console.log('[GET_CARS_ERROR] Error:', error);
		return NextResponse.json(
			{ error: 'Не удалось найти автомобили' },
			{ status: 500 }
		);
	}
}
