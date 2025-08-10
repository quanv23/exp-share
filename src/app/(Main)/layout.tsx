import Link from 'next/link';

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<div>{children}</div>
			<div className='centered-flex fixed bottom-0 left-0 w-full h-16 bg-white gap-4'>
				<Link href={'/'}>Add</Link>
				<Link href={'/Dashboard'}>Dashboard</Link>
				<Link href={'/Categories'}>Categories</Link>
				<Link href={'/Expenses'}>Expenses</Link>
			</div>
		</>
	);
}
