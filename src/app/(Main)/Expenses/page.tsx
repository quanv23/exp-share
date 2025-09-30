/**
 * This page displays all expenses from the db.
 * Allows for editing, deleting, and filtering of expenses
 * @module
 */
'use client';

import ExpenseCard from './components/ExpenseCard';
import { StringExpense } from '@/lib/db/expenses';
import Link from 'next/link';
import { useExpenseStore } from '@/lib/store/useExpenseStore';
import { useEffect } from 'react';

export default function page() {
	const { expenses, fetchExpenses } = useExpenseStore();

	// Fetches expenses for store on initial render
	useEffect(() => {
		fetchExpenses();
	}, []);

	// Creates the cards for displaying each expense
	const expenseCards: React.ReactNode[] = expenses.map(
		(expense: StringExpense) => {
			return (
				<ExpenseCard
					key={expense.id}
					expense={expense}
					filterExpenses={false}
				/>
			);
		}
	);

	return (
		<div className="flex flex-col justify-center pt-5 pl-5 pr-5 pb-21 gap-4">
			<div className="centered-flex block w-full h-36 bg-myGreen">
				<h1 className="text-3xl font-bold text-white">Expenses</h1>
			</div>
			{expenseCards.length === 0 ? (
				<div className="flex justify-center">No expenses to display</div>
			) : (
				<>
					<div className="flex gap-4">
						<button className="small-btn bg-white">Filter</button>
						<Link className="small-btn centered-flex bg-white" href="/">
							Add
						</Link>
					</div>
					<div className="flex flex-col gap-2">{expenseCards}</div>
					<button className="big-btn bg-myGreen">Load More</button>
				</>
			)}
		</div>
	);
}
