import Link from 'next/link';

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<div>{children}</div>
			<div className='fixed bottom-0 left-0 w-full h-[60px] flex justify-center items-center bg-white'>
				<Link href={'/'}>Add</Link>
				<Link href={'/Dashboard'}>Dashboard</Link>
				<Link href={'/Categories'}>Categories</Link>
				<Link href={'/Expenses'}>Expenses</Link>
			</div>
		</>
	);
}
