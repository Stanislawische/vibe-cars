import { prisma } from '@/prisma/prisma-client';
import { CreateProductForm } from '@/shared/components/shared/dashboard/forms/create-product-form/create-product-form';
import { getUserSession } from '@/shared/lib/get-user-session';
import { redirect } from 'next/navigation';

export default async function DashboardProducts() {

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

	return <CreateProductForm />;
}
