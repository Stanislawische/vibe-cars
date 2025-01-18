
import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

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
