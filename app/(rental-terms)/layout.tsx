import { Suspense } from 'react';
import '../globals.css';
import { Container, Header } from '@/shared/components/shared';

export const metadata = {
	title: 'Vibe Cars | Корзина',
};

/**
 * Макет для страниц оформления заказа.
 *
 * @example
 * <CheacoutLayout>
 *   <MyCheckoutPage />
 * </CheacoutLayout>
 */
export default function RentaltLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="min-h-screen min-w-[1090px] antialiased bg-zinc-950">
			
				<Suspense>
					<Header
						hasSearch={false}
						className='shadow-lg shadow-zinc-800 z-10'
					/>
				</Suspense>
				{children}
		</main>
	);
}
