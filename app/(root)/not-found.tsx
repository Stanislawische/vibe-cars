import { InfoBlock } from '@/shared/components/shared/info-block';

/**
 * Страница Next.js, которая отображает сообщение об ошибке 404 пользователю.
 * Эта страница используется как запасной вариант, когда пользователь переходит по маршруту, который не существует.
 * Страница отображает сообщение об ошибке с заголовком, текстом и изображением.
 * Изображение - это изображение ошибки 404.
 */
export default function NotFoundPage() {
	return (
		<div className="flex flex-col items-center justify-center mt-40">
			<InfoBlock
				title="Страница не найдена"
				text="Проверьте корректность введённого адреса или повторите попытку позже"
				imageUrl="/assets/images/404-error.png"
			/>
		</div>
	);
}
