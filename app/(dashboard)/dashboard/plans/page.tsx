import { prisma } from '@/prisma/prisma-client';
import { CreatePlansForm } from '@/shared/components/shared/dashboard/forms/create-plans-form/create-plans-form';
import { getUserSession } from '@/shared/lib/get-user-session';
import { redirect } from 'next/navigation';

export default async function DashboardPlans() {
	const session = await getUserSession();

	if (!session) {
		return redirect('/access-denied');
	}

	const user = await prisma.userDB.findFirst({
		where: {
			id: Number(session?.id),
		},
	});

	if (!user) {
		return redirect('/access-denied');
	}

	if (!session || session.role !== 'ADMIN') {
		return <div>Доступ запрещен</div>;
	}

	return <CreatePlansForm />;
}
