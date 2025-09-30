/**
 * This page displays a specific categories expenses and details
 * Allows for the editing, and deleting of the category as well as the expenses in the category
 * @module
 */

'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import ExpenseCard from '../../Expenses/components/ExpenseCard';
import { StringExpense } from '@/lib/db/expenses';
import { useExpenseStore } from '@/lib/store/useExpenseStore';
import { useExpenseFilterStore } from '@/lib/store/useExpenseFilterStore';

export default function page() {
	// Gets the route parameter (asserts id is string to get around typing error)
	const { id } = useParams<{ id: string }>();

	// Gets the global stores
	const dateRange = useExpenseFilterStore((state) => state.dateRange);
	const setCategoryId = useExpenseFilterStore((state) => state.setCategoryId);
	const expenses = useExpenseStore((state) => state.expenses);
	const fetchFilteredExpenses = useExpenseStore(
		(state) => state.fetchFilteredExpenses
	);

	// Fetches the expenses to display
	useEffect(() => {
		console.log('id useEffect');
		console.log(id);
		// Sets the categoryId for the expense card to use when refetching after editing/deleting
		setCategoryId(id);
		fetchFilteredExpenses(id, dateRange?.from, dateRange?.to);
	}, []);

	const expenseCards: React.ReactNode[] = expenses.map(
		(expense: StringExpense) => (
			<ExpenseCard key={expense.id} expense={expense} filterExpenses={true} />
		)
	);

	return (
		<div className="flex flex-col justify-center pt-5 pl-5 pr-5 pb-21 gap-4">
			<div className="centered-flex block w-full h-36 bg-myGreen">
				<h1 className="text-3xl font-bold text-white">Expenses</h1>
			</div>
			{expenseCards.length === 0 ? (
				<div className="centered-flex">No expenses to display</div>
			) : (
				<>
					<div className="flex flex-col gap-2">{expenseCards}</div>
					<button className="big-btn bg-myGreen">Load More</button>
				</>
			)}
		</div>
	);
}
