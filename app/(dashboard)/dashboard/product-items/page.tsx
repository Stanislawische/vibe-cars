import { prisma } from '@/prisma/prisma-client';
import { CreateProductItemForm } from '@/shared/components/shared/dashboard/forms/create-product-item-form/create-product-item-form';
import { getUserSession } from '@/shared/lib/get-user-session';
import { redirect } from 'next/navigation';

export default async function DashboardProductItems() {
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

	return <CreateProductItemForm products={[]} />;
}
