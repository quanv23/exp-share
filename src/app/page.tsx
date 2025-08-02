import Link from 'next/link';

export default function page() {
	return (
		<div className='flex justify-center items-center'>
			<div className='flex justify-between items-center rounded-md shadow-md'>
				<Link href={'/'}>Add</Link>
				<Link href={'/Dashboard'}>Dashboard</Link>
				<Link href={'/Categories'}>Categories</Link>
				<Link href={'/Expenses'}>Expenses</Link>
			</div>
		</div>
	);
}
