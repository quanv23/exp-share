/**
 * The main page of the application and which allows adding expenses to the db
 * @module
 */

import Link from 'next/link';
import AddExpenseForm from './components/AddExpenseForm';
import { getAllCategories, StringCategory } from '@/lib/db/categories';
import { addExpense } from '@/lib/db/expenses';

export default async function page() {
	const categories: StringCategory[] = await getAllCategories();

	return (
		<div className='centered-flex block flex-col space-y-4 w-screen h-screen p-5'>
			<AddExpenseForm categories={categories} addExpenseFunction={addExpense} />
			<div className='centered-flex block w-full h-16 p-6 bg-white space-x-4'>
				<Link href={'/'}>Add</Link>
				<Link href={'/Dashboard'}>Dash</Link>
				<Link href={'/Categories'}>Cats</Link>
				<Link href={'/Expenses'}>Exp</Link>
			</div>
		</div>
	);
}
