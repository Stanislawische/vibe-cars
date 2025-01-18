/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { cn } from '@/shared/lib/utils';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from './container';
import { SearchInput } from './search-input';
import { CartButton } from './cart-button';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { ProfileButton } from './profile-button';
import { AuthModal } from './modals';

interface Props {
	className?: string;
	hasSearch?: boolean;
	hasCart?: boolean;
}

/**
 * Компонент Header - шапка сайта
 *
 * @example
 * <Header />
 *
 * @param {string} [className] - дополнительные классы
 */
export const Header: React.FC<Props> = ({
	hasCart = true,
	hasSearch = true,
	className,
}: Props) => {
	const router = useRouter();
	const [openAuthModal, setOpenAuthModal] = React.useState(false);
	const seacrhParams = useSearchParams();
	React.useEffect(() => {
		let toastMessage = '';

		if (seacrhParams.has('paid')) {
			toastMessage = 'Заказ успешно оплачен! Скоро с Вами свяжутся.';
		}

		if (seacrhParams.has('verified')) {
			toastMessage = 'Аккаунт успешно подтвержден!';
		}

		if (toastMessage) {
			setTimeout(() => {
				router.replace('/');
				toast.success(toastMessage, {
					style: {
						borderRadius: '30px',
						background: '#333',
						color: '#fff',
						border: '1px solid #666',
						fontSize: '14px',
						fontWeight: 'bold',
					},
					iconTheme: {
						primary: '#007AF0',
						secondary: '#fff',
					},
					duration: 5000,
				});
			}, 1000);
		}
	});
	return (
		<header
			className={cn('border-background border-b bg-background overflow-x-hidden', className)}>
			<Container className="flex items-center justify-between pt-3 pb-1">
				{/* Логотип */}
				<Link href="/">
					<div className="flex items-center gap-4">
						<Image
							src="/assets/images/logo_my.png"
							alt="logo"
							className="rounded-full"
							width={62}
							height={62}
						/>
						<div>
							<h1 className="text-2xl uppercase font-black">Vibe Cars</h1>
							<p className="text-sm text-gray-300 leading-1">
								Сервис проката автомобилей
							</p>
							<p className="text-sm text-gray-400 leading-1">
								ул. Нововитебская, 138А
							</p>
						</div>
					</div>
				</Link>

				{/* Поиск */}

				{hasSearch && (
					<div className="mx-10 flex-1">
						<SearchInput />
					</div>
				)}

				{/* Авторизация */}

				<div className="flex items-center gap-3">
					<AuthModal
						open={openAuthModal}
						onClose={() => setOpenAuthModal(false)}
					/>
					<ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

					{/* Меню */}

					<div>{hasCart && <CartButton />}</div>
				</div>
			</Container>
		</header>
	);
};
