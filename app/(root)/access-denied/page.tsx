import { InfoBlock } from '@/shared/components/shared/info-block';

export default function NotFoundPage() {
	return (
		<div className="flex flex-col items-center justify-center mt-40">
			<InfoBlock
				title="Доступ заблокирован"
				text="Данная страница доступна только администраторам"
				imageUrl="/assets/images/lock.png"
			/>
		</div>
	);
}
