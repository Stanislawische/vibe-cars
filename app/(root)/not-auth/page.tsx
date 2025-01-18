import { InfoBlock } from "@/shared/components";
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
