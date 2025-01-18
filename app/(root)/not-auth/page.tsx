import { InfoBlock } from "@/shared/components";
/**
 * Страница с информационным блоком для неавторизованных пользователей.
 *
 * Показывает изображение замка и информацию, что страница доступна только для авторизованных пользователей.
 */
export default function UnauthorizedPage() {
	return (
		<div className="flex flex-col items-center justify-center mt-40">
			<InfoBlock
				title="Доступ запрещен"
				text="Данная страница доступна только авторизованным пользователям"
				imageUrl="/assets/images/lock.png"
			/>
		</div>
	);
}
