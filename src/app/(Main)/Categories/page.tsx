/**
 * This page showcases all categories and allows for the creation, deletion, and updates for all categories
 * @module
 */

'use client';

import ExpenseIncomeButton from '@/app/components/ExpenseIncomeButton';
import { DateRangePicker } from '@/tremorComponents/DatePicker';
import { useEffect, useState } from 'react';
import { StringCategory } from '@/lib/db/categories';

export default function page() {
	// State that determines whether the graph shows expense/income data
	const [showExpense, setShowExpense] = useState<Boolean>(true);

	// State that contains all categories from the db, and is filtered depending on selected options
	const [categories, setCategories] = useState<StringCategory[]>([]);

	// Gets all categories from db only when initially mounted
	useEffect(() => {
		/**
		 * Fetches all categories from the database through an API call since the page must be a client component
		 */
		async function fetchCategories(): Promise<void> {
			try {
				const categories = await fetch('/api/expenses');

				// Throws an error is response is not ok
				if (!categories.ok) {
					throw new Error();
				}

				// Converts json -> object and sets the state
				const data = await categories.json();
				setCategories(data);
			} catch (error) {
				console.error('Error message: ', error);
				throw new Error('Failed to fetch categories');
			}
		}

		fetchCategories();
	}, []);

	// Creates the cards for displaying each category
	const categoryCards = categories.map((category: StringCategory) => (
		<div key={category.id}>
			<div>{category.name}</div>
		</div>
	));

	/**
	 * Handles when the option button is toggled to expense and sets the state to expense to make the graph show expense data
	 */
	function handleShowExpense(): void {
		setShowExpense(true);
	}

	/**
	 * Handles when the option button is toggled to expense and sets the state to income to make the graph show income data
	 */
	function handleShowIncome(): void {
		setShowExpense(false);
	}

	return (
		<div className='flex flex-col justify-center pt-5 pl-5 pr-5 pb-21 gap-4'>
			<div className='flex justify-between'>
				<ExpenseIncomeButton
					showExpense={showExpense}
					handleShowExpense={handleShowExpense}
					handleShowIncome={handleShowIncome}
				/>
				<div>
					<button className='small-btn bg-white'>Add</button>
				</div>
			</div>
			<div className='block bg-myGreen p-4'>
				<div>Graph goes here</div>
				<DateRangePicker />
			</div>
			<div></div>
		</div>
	);
}
