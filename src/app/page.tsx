/**
 * The main page of the application and which allows adding expenses to the db
 * @module
 */

import {
	RiAddCircleFill,
	RiBarChart2Fill,
	RiPriceTag3Fill,
	RiMoneyDollarCircleFill,
} from '@remixicon/react';
import Link from 'next/link';
import AddExpenseForm from './components/AddExpenseForm';
import { getAllCategories, StringCategory } from '@/lib/db/categories';
import { addExpense } from '@/lib/db/expenses';

export default async function Page() {
	const categories: StringCategory[] = await getAllCategories();

	return (
		<div className="centered-flex block flex-col space-y-4 w-screen h-screen p-5">
			<AddExpenseForm categories={categories} addExpenseFunction={addExpense} />
			<div className="centered-flex block h-16 p-6 bg-white gap-10">
				<Link href={'/'}>
					<RiAddCircleFill />
				</Link>
				<Link href={'/Dashboard'}>
					<RiBarChart2Fill className="text-myDarkGray" />
				</Link>
				<Link href={'/Categories'}>
					<RiPriceTag3Fill className="text-myDarkGray" />
				</Link>
				<Link href={'/Expenses'}>
					<RiMoneyDollarCircleFill className="text-myDarkGray" />
				</Link>
			</div>
		</div>
	);
}
