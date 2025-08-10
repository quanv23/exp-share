/**
 * The main layout of the application which houses the metadata, fonts and the html, and body tag
 */

import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';

const nunito = Nunito({
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Exp Share',
	description: 'Track Expenses',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${nunito.className} antialiased bg-[#f5f5f5]`}>
				{children}
			</body>
		</html>
	);
}
