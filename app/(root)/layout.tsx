import type { Metadata } from 'next';
import '../globals.css';
import { Header } from '@/shared/components/shared';
import { Suspense } from 'react';

export const metadata: Metadata = {
	title: 'Vibe Cars | Главная',
};

/**
 * Корневой макет приложения.
 *
 * Этот компонент отображает основные элементы страницы:
 * - Шапку
 * - Модальное окно (если оно есть)
 * - Содержимое страницы (детей)
 *
 * @param children - Содержимое страницы
 * @param modal - Модальное окно (если оно есть)
 */
export default function RootLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode;
}>) {
	return (
		<main className="min-h-screen min-w-[1090px]">
			<Suspense>
				<Header />
			</Suspense>
			{modal}
			{children}
		</main>
	);
}
