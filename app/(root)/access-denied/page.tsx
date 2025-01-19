import { InfoBlock } from '@/shared/components/shared/info-block';

/**
 * Страница, отображаемая, когда пользователь не имеет достаточных прав для доступа к странице.
 * Отображаемое сообщение: "Данная страница доступна только администраторам".
 * @returns {React.ReactElement} Элемент страницы.
 */
export default function NotFoundPage() {
	return (
		<div className="flex flex-col items-center justify-center mt-40">
			<InfoBlock
				title="Доступ заблокирован"
				text="Данная страница доступна только администраторам"
				imageUrl="/assets/images/dashboard.png"
			/>
		</div>
	);
}
