import { CarForm, Container } from '@/shared/components/shared';
import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';

type Props = Promise<{ id: { id: string } }>;
/**
 * Страница для одного автомобиля.
 * Если автомобиль не найден, происходит редирект на страницу 404.
 * @param {{ id: string }} params - ID автомобиля, информацию о котором нужно отобразить.
 * @returns {JSX.Element} страница с формой автомобиля.
 */
export default async function CarPage({ params }: { params: Props }) {
	const { id } = await params;

	const car = await prisma.productDB.findFirst({
		where: {
			id: Number(id),
		},
		include: {
			plans: true,
			category: {
				include: {
					products: {
						include: {
							items: true,
						},
					},
				},
			},
			items: {
				orderBy: {
					createdAt: 'desc',
				},
			},
		},
	});

	if (!car) {
		console.log('Автомобиль не найден!');
		return notFound();
	}

	return (
		<Container className="flex flex-col my-10">
			<CarForm product={car} />
		</Container>
	);
}
