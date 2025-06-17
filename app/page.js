import { getAllCategories } from '@/lib/db/categories';
import { addExpense } from '@/lib/db/expenses';
import AddExpenseForm from './components/AddExpenseForm';
import Link from 'next/link';

export default async function Home() {
	const categories = await getAllCategories();

	return (
		<>
			<div>
				<AddExpenseForm categories={categories} addExpenseAction={addExpense} />
			</div>
			<div>
				<Link href={'/Dashboard'}>Dashboard</Link>
				<Link href={'/Categories'}>Categories</Link>
				<Link href={'/Expenses'}>Expenses</Link>
			</div>
		</>
	);
}
