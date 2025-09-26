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
import { stringFloatToFloat } from '@/lib/globalFunctions';
import { DateRange } from 'react-day-picker';
import { useGroupedExpenseFilterStore } from '@/lib/store/useGroupedExpenseFilterStore';
import { useGroupedExpenseStore } from '@/lib/store/useGroupedExpenseStore';
import CategoryCard from './components/CategoryCard';
import Link from 'next/link';

export default function page() {
	// The search parameter global store for filtering the grouped expenses store
	const { isExpense, setIsExpense, dateRange, setDateRange } =
		useGroupedExpenseFilterStore();

	// The display category store that contains all the grouped expenses and the total amount
	const { groupedExpenses, totalAmount, fetchGroupedExpenses } =
		useGroupedExpenseStore();

	// Fetches and refilters the data from the db on mount, and anytime a filter is changed
	useEffect(() => {
		console.log('useEffect triggered');

		/**
		 * Populates the store with expenses grouped by categories from the db, and applies the relevant filters
		 */
		async function fetchFilteredCategories(): Promise<void> {
			try {
				// Gets the expenses, and the total amount
				fetchGroupedExpenses(isExpense, dateRange?.from, dateRange?.to);
			} catch (error) {
				console.error('Error message: ', error);
				throw new Error('Failed to fetch filtered categories');
			}
		}
		fetchFilteredCategories();
	}, [isExpense, dateRange]);

	// Creates the cards for displaying each category
	// The card is nested inside of Link because on this page we have access to the search parameters which are required to refetch the data
	const categoryCards = groupedExpenses.map(
		(category: StringExpensesGroupedByCategories) => (
			<Link key={category.id} href={`/Categories/${category.id}`}>
				<CategoryCard
					name={category.name}
					amount={category.total}
					colour={category.colour}
					percent={(stringFloatToFloat(category.total) / totalAmount) * 100}
				/>
			</Link>
		)
	);

	/**
	 * Handles when the option button is toggled to expense and sets the state to expense to make the graph show expense data
	 */
	function handleShowExpense(): void {
		setIsExpense(true);
	}

	/**
	 * Handles when the option button is toggled to expense and sets the state to income to make the graph show income data
	 */
	function handleShowIncome(): void {
		setIsExpense(false);
	}

	// Handles when the date range is selected
	function handleDateRangeChange(value: DateRange | undefined) {
		setDateRange(value);
	}

	return (
		<div className="flex flex-col justify-center pt-5 pl-5 pr-5 pb-21 gap-4">
			<div className="flex justify-between">
				<ExpenseIncomeButton
					showExpense={isExpense}
					handleShowExpense={handleShowExpense}
					handleShowIncome={handleShowIncome}
				/>
				<div>
					<button className="small-btn bg-white">Add</button>
				</div>
			</div>
			<div className="block centered-flex flex-col gap-4 bg-white p-4">
				<DonutChart
					data={
						groupedExpenses.length > 0
							? groupedExpenses.map(
									(category: StringExpensesGroupedByCategories) => {
										return {
											name: category.name,
											total: stringFloatToFloat(category.total),
										};
									}
							  )
							: []
					}
					category="name"
					value="total"
					// This error occurs because colors : "colour" | "another colour" | "another colour" and so on
					// But because we're passing a string[], typescript is scared that this string can be any string literal not in the colors type
					// But since the user is forced to only select colours within the AvailableChartColour we can ignore this error
					// @ts-ignore
					colors={
						groupedExpenses.length > 0
							? groupedExpenses.map(
									(category: StringExpensesGroupedByCategories) =>
										category.colour
							  )
							: []
					}
					showLabel={true}
					valueFormatter={(number: number) =>
						`$${Intl.NumberFormat('us').format(number).toString()}`
					}
				/>
				<DateRangePicker value={dateRange} onChange={handleDateRangeChange} />
			</div>
			{groupedExpenses.length > 0 ? (
				<div className="flex flex-col gap-4">{categoryCards}</div>
			) : (
				<div className="flex justify-center">No categories to display</div>
			)}
		</div>
	);
}
