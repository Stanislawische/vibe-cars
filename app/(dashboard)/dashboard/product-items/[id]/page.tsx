import { prisma } from '@/prisma/prisma-client';
import { CreateProductItemForm } from '@/shared/components/shared/dashboard/forms/create-product-item-form/create-product-item-form';
import { findCar, GetSearchParams } from '@/shared/lib/find-car';
import { getUserSession } from '@/shared/lib/get-user-session';
import { redirect } from 'next/navigation';

export default async function DashboardProductItemsId(props: {
	searchParams: Promise<GetSearchParams>;
}) {
	const searchParams = await props.searchParams;
	const categories = await findCar(searchParams);

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

	return ( 
		<>{
		categories.map(
		(category) =>
			
		(<CreateProductItemForm key={category.products[0].id} products={category.products} />)
	)}</>);
}
