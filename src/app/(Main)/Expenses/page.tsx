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
import { useEffect, useState } from 'react';
import Modal from '@/app/components/Modal';
import SuccessDialog from '@/app/components/SuccessDialog';
import FailureDialog from '@/app/components/FailureDialog';

export default function page() {
	const { expenses, fetchExpenses } = useExpenseStore();

	// State that manages the amount of expenses to display at once
	const [pageLimit, setPageLimit] = useState<number>(10);

	/**
	 * States that determine whether to display the success dialog of not
	 * @remarks Must keep these dialogs above the expense card component because after edits and deletes, it will trigger a re-render
	 * Causing the component to be remounted reseting the toggle states causing the dialogs to flicker on and off instantly so must keep in parent to avoid that
	 */
	const [toggleSuccess, setToggleSuccess] = useState<boolean>(false);
	const [toggleFailure, setToggleFailure] = useState<boolean>(false);

	// Fetches expenses for store on initial render
	useEffect(() => {
		fetchExpenses();
	}, []);

	// Creates the cards for displaying each expense
	const expenseCards: React.ReactNode[] = expenses
		.slice(0, pageLimit)
		.map((expense: StringExpense) => {
			return (
				<ExpenseCard
					key={expense.id}
					expense={expense}
					filterExpenses={false}
					handleSuccessClick={handleSuccessClick}
					handleFailureClick={handleFailureClick}
				/>
			);
		});

	/**
	 * Handles whenever the load more btn is clicked and increases the limit of expenses to display
	 */
	function handleLoadMore() {
		setPageLimit((prev) => prev + 10);
	}

	/**
	 * Handles when a success diaglog needs to be open/closed
	 */
	function handleSuccessClick(): void {
		setToggleSuccess((prev) => !prev);
	}

	/**
	 * Handles when a failure diaglog needs to be open/closed
	 */
	function handleFailureClick(): void {
		setToggleFailure((prev) => !prev);
	}

	return (
		<>
			{toggleSuccess && (
				<Modal isOpen={toggleSuccess} onClose={handleSuccessClick}>
					<SuccessDialog />
				</Modal>
			)}
			{toggleFailure && (
				<Modal isOpen={toggleFailure} onClose={handleFailureClick}>
					<FailureDialog />
				</Modal>
			)}
			<div className="flex flex-col justify-center pt-5 pl-5 pr-5 pb-21 gap-4">
				<div className="centered-flex block w-full h-36 bg-myGreen">
					<h1 className="text-3xl font-bold text-white">Expenses</h1>
				</div>
				{expenseCards.length === 0 ? (
					<div className="flex justify-center">No expenses to display</div>
				) : (
					<>
						<div className="flex items-center gap-4">
							<Link className="small-btn centered-flex bg-white" href="/">
								Add
							</Link>
							<div className="text-xs">
								Displaying 1-
								{pageLimit < expenses.length ? pageLimit : expenses.length} out
								of {expenses.length}
							</div>
						</div>
						<div className="flex flex-col gap-2">{expenseCards}</div>
						{pageLimit < expenses.length && (
							<button className="big-btn bg-myGreen" onClick={handleLoadMore}>
								Load More
							</button>
						)}
						<div className="centered-flex text-xs">
							Displaying 1-
							{pageLimit < expenses.length ? pageLimit : expenses.length} out of{' '}
							{expenses.length}
						</div>
					</>
				)}
			</div>
		</>
	);
}
