/**
 * This page showcases all categories and allows for the creation, deletion, and updates for all categories
 * @module
 */

'use client';

import ExpenseIncomeButton from '@/app/components/ExpenseIncomeButton';
import { DateRangePicker } from '@/tremorComponents/DatePicker';
import { useEffect, useState } from 'react';
import { StringExpensesGroupedByCategories } from '@/lib/db/expenses';
import { DonutChart } from '@/tremorComponents/DonutChart';

export default function page() {
	// State that determines whether the graph shows expense/income data
	const [showExpense, setShowExpense] = useState<Boolean>(true);

	// State that contains all categories from the db, and is filtered depending on selected options
	const [categories, setCategories] = useState<
		StringExpensesGroupedByCategories[]
	>([]);

	// State the contains the categories to be displayed which are filtered from all the categories from the db
	const [displayCategories, setDisplayCategories] = useState<
		StringExpensesGroupedByCategories[]
	>([]);

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
				const data: StringExpensesGroupedByCategories[] =
					await categories.json();

				// Sets the categories state, as well as the display state since the page always initially displays expenses
				setCategories(data);
				setDisplayCategories(
					data.filter((category: StringExpensesGroupedByCategories) =>
						isExpense(category)
					)
				);
			} catch (error) {
				console.error('Error message: ', error);
				throw new Error('Failed to fetch categories');
			}
		}

		fetchCategories();
		console.log(`useEffect empty dependency`);
	}, []);

	// Filters the display state anytime expense/income is toggled, or the date range is changed
	useEffect(() => {
		if (categories.length === 0) return; // Skips the intial render

		// Filters the display categories to only expenses or income
		if (showExpense) {
			setDisplayCategories(
				categories.filter((category) => isExpense(category))
			);
		} else {
			setDisplayCategories(
				categories.filter((category) => !isExpense(category))
			);
		}
		console.log(`useEffect showExpense`);
	}, [showExpense]);

	/**
	 * A helper function that checks if a category expense group is an expense or income
	 * @param category The category expense group to be checked
	 * @returns A boolean value indicating if it is an expense or not
	 */
	function isExpense(category: StringExpensesGroupedByCategories) {
		if (parseFloat(category.amount) < 0) {
			return true;
		} else {
			return false;
		}
	}

	// Creates the cards for displaying each category
	const categoryCards = displayCategories.map(
		(category: StringExpensesGroupedByCategories) => (
			<div key={category.id}>
				{category.name} : {category.amount} : {category.colour}
			</div>
		)
	);

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
			<div className='block centered-flex flex-col gap-4 bg-white p-4'>
				<DonutChart
					data={[{ name: 'Victor', amount: 100 }]}
					category='name'
					value='amount'
					showLabel={true}
					valueFormatter={(number: number) =>
						`$${Intl.NumberFormat('us').format(number).toString()}`
					}
				/>
				<DateRangePicker />
			</div>
			<div>{categoryCards}</div>
		</div>
	);
}
