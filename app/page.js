import Link from 'next/link';
import { getAllExpenses } from '@/lib/expenses';

export default async function Home() {
	const expense = await getAllExpenses();
	console.log(expense);

	return (
		<div>
			<Link href={'/Dashboard'}>Dashboard</Link>
			<Link href={'/Categories'}>Categories</Link>
			<Link href={'/Expenses'}>Expenses</Link>
		</div>
	);
}
