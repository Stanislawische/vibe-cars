import { useSession } from 'next-auth/react';
import React from 'react';
import { Button } from '../ui';
import { CircleUser, User } from 'lucide-react';
import Link from 'next/link';

interface Props {
	className?: string;
	onClickSignIn?: () => void;
}

export const ProfileButton: React.FC<Props> = ({
	className,
	onClickSignIn,
}) => {
	const { data: session } = useSession();

	return (
		<div className={className}>
			{!session ? (
				<Button
					onClick={onClickSignIn}
					variant="secondary"
					className="flex items-center gap-2 text-zinc-800">
					<User size={14} />
					Авторизация
				</Button>
			) : (
				<Link href="/profile" className="flex items-center gap-2">
					<Button
						variant="secondary"
						className="flex items-center gap-2 text-zinc-800">
						<CircleUser size={16} />
						Личный кабинет
					</Button>
				</Link>
			)}
		</div>
	);
};
