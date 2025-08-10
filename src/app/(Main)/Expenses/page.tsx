/**
 * This page displays all expenses from the db.
 * Allows for editing, deleting, and filtering of expenses
 * @module
 */

import ExpenseCard from './components/ExpenseCard';
import { getAllCategories, StringCategory } from '@/lib/db/categories';
import {
	editExpense,
	deleteExpense,
	getAllExpenses,
	StringExpense,
} from '@/lib/db/expenses';

export default async function page() {
	// Gets all categories to pass to the edit form for category combo box
	const categories: StringCategory[] = await getAllCategories();

	// Gets all expenses to display
	const expenses: StringExpense[] = await getAllExpenses();

	// Creates the cards for displaying each expense
	const expenseCards: React.ReactNode[] = expenses.map((expense) => {
		return (
			<ExpenseCard
				key={expense.id}
				expense={expense}
				categories={categories}
				editExpenseFunction={editExpense}
				deleteExpenseFunction={deleteExpense}
			/>
		);
	});

	return (
		<div className='flex flex-col justify-center pt-5 pl-5 pr-5 pb-21 gap-4'>
			<div className='centered-flex block w-full h-36 bg-myGreen'>
				<h1 className='text-3xl font-bold text-white'>Expenses</h1>
			</div>
			{expenseCards.length === 0 ? (
				<div className='flex justify-center'>No expenses to display</div>
			) : (
				<>
					<div className='flex gap-4'>
						<button className='small-btn bg-white'>Filter</button>
						<button className='small-btn bg-white'>Add</button>
					</div>
					<div className='flex flex-col gap-2'>{expenseCards}</div>
					<button className='big-btn bg-myGreen'>Load More</button>
				</>
			)}
		</div>
	);
}
