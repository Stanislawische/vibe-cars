import { prisma } from '@/prisma/prisma-client';
import { ProfileForm } from '@/shared/components';
import { getUserSession } from '@/shared/lib/get-user-session';
import { redirect } from 'next/navigation';

/**
 * ProfilePage рендерит страницу профиля для аутентифицированного пользователя.
 * Он проверяет текущую сессию и извлекает данные пользователя из базы данных.
 * Если пользователь не аутентифицирован или не найден, он перенаправляет на страницу not-auth.
 *
 * @returns {JSX.Element} Компонент ProfileForm с данными пользователя или перенаправление.
 */

export default async function ProfilePage() {
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

	return <ProfileForm data={user} />;
}
