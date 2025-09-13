/**
 * This page showcases all categories and allows for the creation, deletion, and updates for all categories
 * @module
 */

'use client';

import ExpenseIncomeButton from '@/app/components/ExpenseIncomeButton';
import { DateRangePicker } from '@/tremorComponents/DatePicker';
import { useEffect, useState } from 'react';
import {
	StringExpense,
	StringExpensesGroupedByCategories,
} from '@/lib/db/expenses';
import { DonutChart } from '@/tremorComponents/DonutChart';
import { stringFloatToFloat } from '@/lib/globalFunctions';
import CategoryCard from './components/CategoryCard';
import { DateRange } from 'react-day-picker';

export default function page() {
	// State that determines whether the graph shows expense/income data
	const [showExpense, setShowExpense] = useState<Boolean>(true);

	// State the contains the categories to be displayed which are filtered from all the categories from the db
	const [displayCategories, setDisplayCategories] = useState<
		StringExpensesGroupedByCategories[]
	>([]);

	// State the contains the total amount for the displayed categories
	const [totalAmount, setTotalAmount] = useState(0);

	// State that contains the date date range for the displayed categories
	const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

	// Fetches and refilters the data from the db on mount, and anytime a filter is changed
	useEffect(() => {
		console.log('useEffect triggered');

		/**
		 * Fetches expenses grouped by categories from the db, and applies the relevant filters
		 */
		async function fetchFilteredCategories(): Promise<void> {
			try {
				// Fetches categories with filters
				const categories = await fetch(
					`/api/expenses/?isExpense=${showExpense}&from=${dateRange?.from?.toISOString()}&to=${dateRange?.to?.toISOString()}`
				);

				if (!categories.ok) {
					throw new Error();
				}

				// Converts json -> object
				const data: StringExpensesGroupedByCategories[] =
					await categories.json();

				setDisplayCategories(data);

				// Calculates and sets the total amount
				setTotalAmount(
					data.reduce(
						(acc, category) => acc + stringFloatToFloat(category.total),
						0
					)
				);
			} catch (error) {
				console.error('Error message: ', error);
				throw new Error('Failed to fetch filtered categories');
			}
		}
		fetchFilteredCategories();
	}, [showExpense, dateRange]);

	/**
	 * A helper function that checks if a category expense group is an expense or income
	 * @param category The category expense group to be checked
	 * @returns A boolean value indicating if it is an expense or not
	 */
	function isExpense(category: StringExpensesGroupedByCategories) {
		if (parseFloat(category.total) < 0) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Helper function that gets the list of all expenses from the state containing all categories by Id
	 * @param id The id of the category
	 * @returns The list of all expenses belonging to the category
	 */
	function getCategoryExpenses(id: string): StringExpense[] {
		const category = displayCategories.filter((category) => category.id === id);
		return category[0].expenses;
	}

	// Creates the cards for displaying each category
	const categoryCards = displayCategories.map(
		(category: StringExpensesGroupedByCategories) => (
			<CategoryCard
				key={category.id}
				id={category.id}
				name={category.name}
				amount={category.total}
				colour={category.colour}
				expenses={getCategoryExpenses(category.id)}
				percent={(stringFloatToFloat(category.total) / totalAmount) * 100}
			/>
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

	// Handles when the date range is selected
	function handleDateRangeChange(value: DateRange | undefined) {
		setDateRange(value);
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
					data={displayCategories.map(
						(category: StringExpensesGroupedByCategories) => {
							return {
								name: category.name,
								total: stringFloatToFloat(category.total),
							};
						}
					)}
					category='name'
					value='total'
					// This error occurs because colors : "colour" | "another colour" | "another colour" and so on
					// But because we're passing a string[], typescript is scared that this string can be any string literal not in the colors type
					// But since the user is forced to only select colours within the AvailableChartColour we can ignore this error
					// @ts-ignore
					colors={displayCategories.map(
						(category: StringExpensesGroupedByCategories) => category.colour
					)}
					showLabel={true}
					valueFormatter={(number: number) =>
						`$${Intl.NumberFormat('us').format(number).toString()}`
					}
				/>
				<DateRangePicker value={dateRange} onChange={handleDateRangeChange} />
			</div>
			<div className='flex flex-col gap-4'>{categoryCards}</div>
		</div>
	);
}
