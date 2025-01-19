import { DashboardMenu } from '@/shared/components/shared/dashboard/dashboard-menu';
import '../globals.css';
import { Container, Header } from '@/shared/components';
import { Suspense } from 'react';
export const metadata = {
	title: 'Vibe Cars | Dashboard',
};

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main>
				<Suspense>
					<Header hasSearch={false} hasCart={false} />
					
					
				</Suspense>
				<Container>
				<DashboardMenu />
				{children}
				</Container>
		</main>
	);
}
