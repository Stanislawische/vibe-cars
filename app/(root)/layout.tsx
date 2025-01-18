import type { Metadata } from 'next';
import '../globals.css';
import { Header } from '@/shared/components/shared';
import { Suspense } from 'react';

export const metadata: Metadata = {
	title: 'Vibe Cars | Главная',
};

/**
 * Корневой макет для приложения. Этот компонент отвечает за рендеринг
 * элементов `<html>`, `<body>` и `<main>`, а также заголовка и модального
 * компонента. Свойство `children` является обязательным и должно быть
 * передано содержимое страницы, а свойство `modal` является необязательным
 * и может быть передано модальное окно для рендеринга над контентом страницы.
 *
 * @example
 * <RootLayout>
 *   <MyPage />
 * </RootLayout>
 *
 * @example
 * <RootLayout modal={<MyModal />}>
 *   <MyPage />
 * </RootLayout>
 */
export default function RootLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode;
}>) {
	return (
		// <body className={`${nunito.variable} antialiased bg-zinc-900`}>
		<main className="min-h-screen">
			<Suspense>
			<Header />
			</Suspense>
			{modal}
			{children}
		</main>
		// </body>
	);
}
