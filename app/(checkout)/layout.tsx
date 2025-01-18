import { Suspense } from 'react';
import '../globals.css';
import { Container, Header } from '@/shared/components/shared';

export const metadata = {
	title: 'Vibe Cars | Корзина',
};

export default function CheacoutLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="min-h-screen bg-secondary-foreground">
			<Container>
				<Suspense>
					<Header
						hasSearch={false}
						hasCart={false}
						className="border-b-gray-600 bg-secondary-foreground"
					/>
				</Suspense>
				{children}
			</Container>
		</main>
	);
}
