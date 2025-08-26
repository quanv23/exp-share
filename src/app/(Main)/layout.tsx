'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
	RiAddCircleFill,
	RiPriceTag3Fill,
	RiBarChart2Fill,
	RiMoneyDollarCircleFill,
} from '@remixicon/react';

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	// Used for changing the colour of the icons depending on the current page
	const DASHBOARD_PATHNAME = '/Dashboard';
	const CATEGORIES_PATHNAME = '/Categories';
	const EXPENSES_PATHNAME = '/Expenses';
	const pathname = usePathname();

	return (
		<>
			<div>{children}</div>
			<div className='centered-flex fixed bottom-0 left-0 w-full h-16 bg-white gap-12'>
				<Link href={'/'}>
					<RiAddCircleFill className='text-myDarkGray' />
				</Link>
				<Link href={'/Dashboard'}>
					<RiBarChart2Fill
						className={
							pathname.startsWith(DASHBOARD_PATHNAME)
								? 'text-black'
								: 'text-myDarkGray'
						}
					/>
				</Link>
				<Link href={'/Categories'}>
					<RiPriceTag3Fill
						className={
							pathname.startsWith(CATEGORIES_PATHNAME)
								? 'text-black'
								: 'text-myDarkGray'
						}
					/>
				</Link>
				<Link href={'/Expenses'}>
					<RiMoneyDollarCircleFill
						className={
							pathname.startsWith(EXPENSES_PATHNAME)
								? 'text-black'
								: 'text-myDarkGray'
						}
					/>
				</Link>
			</div>
		</>
	);
}
