import { Nunito } from 'next/font/google';
import './globals.css';
import { Providers } from '@/shared/components/providers';

const nunito = Nunito({
	subsets: ['cyrillic'],
	variable: '--font-nunito',
	weight: ['400', '500', '600', '700', '800', '900'],
	preload: false,
});
{
	/* classname={nunito.className} */
}
export default function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link data-rh="true" rel="icon" href="./favicon.ico" />
			</head>
			<body className={`${nunito.variable} antialiased bg-zinc-950`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
