import {
	Container,
	ProductGroupList,
	Title,
	TopBar,
} from '@/shared/components/shared';
import { findCar } from '@/shared/lib';
import { GetSearchParams } from '@/shared/lib/find-car';

/**
 * Главная страница.
 *
 * @returns JSX-элемент, представляющий главную страницу.
 *
 * @remarks
 * Компонент рендерит контейнер с заголовком, топ-баром,
 * списком автомобилей, разбитым на категории.
 */
export default async function Home(props: {
	searchParams: Promise<GetSearchParams>;
}) {
	const searchParams = await props.searchParams;
	const categories = await findCar(searchParams);

	return (
		<>
			{/* Шапка */}
			<div className="bg-background">
				{' '}
				{/* Поправить title.tsx - залить фон глобальным bg-background, рендериться div-div */}
				<Container>
					<Title text="Автомобили" size="lg" className="font-extrabold " />
				</Container>
			</div>

			{/* Топ бар */}

			<TopBar
				categories={categories.filter(
					(category) => category.products.length > 0
				)}
			/>

			{/* Список авто */}

			<Container className="mt-10 pb-14 min-h-screen">
				<div className="flex gap-[60px]">
					<div className="flex-1">
						<div className="flex flex-col gap-16">
							{categories.map(
								(category) =>
									category.products.length > 0 && (
										<ProductGroupList
											key={category.id}
											title={category.name}
											categoryId={category.id}
											items={category.products}
										/>
									)
							)}
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}
