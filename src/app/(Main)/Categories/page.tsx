/**
 * This page showcases all categories and allows for the creation, deletion, and updates for all categories
 * @module
 */

'use client';

import ExpenseIncomeButton from '@/app/components/ExpenseIncomeButton';
import { DateRangePicker } from '@/tremorComponents/DatePicker';
import { useEffect, useState } from 'react';
import { StringCategoryWithExpenses } from '@/lib/db/categories';
import { DonutChart } from '@/tremorComponents/DonutChart';
import { stringFloatToFloat } from '@/lib/globalFunctions';
import { DateRange } from 'react-day-picker';
import { useExpenseFilterStore } from '@/lib/store/useExpenseFilterStore';
import CategoryCard from './components/CategoryCard';
import Link from 'next/link';
import Modal from '@/app/components/Modal';
import AddCategoryForm from './components/AddCategoryForm';
import { useExpenseStore } from '@/lib/store/useExpenseStore';
import SuccessDialog from '@/app/components/SuccessDialog';
import FailureDialog from '@/app/components/FailureDialog';

export default function page() {
	// The search parameter global store for filtering the grouped expenses store
	const isExpense = useExpenseFilterStore((state) => state.isExpense);
	const setIsExpense = useExpenseFilterStore((state) => state.setIsExpense);
	const dateRange = useExpenseFilterStore((state) => state.dateRange);
	const setDateRange = useExpenseFilterStore((state) => state.setDateRange);

	// The display category store that contains all the grouped expenses and the total amount
	const { groupedExpenses, totalAmount, fetchGroupedExpenses } =
		useExpenseStore();

	// State that determines whether to display the modal of not
	const [toggleModal, setToggleModal] = useState<boolean>(false);

	// State that determines whether to display sucess/failure dialog
	const [toggleSuccess, setToggleSuccess] = useState<boolean>(false);
	const [toggleFailure, setToggleFailure] = useState<boolean>(false);

	// Fetches and refilters the data from the db on mount, and anytime a filter is changed
	useEffect(() => {
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
		(category: StringCategoryWithExpenses) => (
			<Link key={category.id} href={`/Categories/${category.id}`}>
				<CategoryCard
					name={category.name}
					amount={category.total}
					colour={category.colour}
					percent={
						totalAmount === 0
							? 0
							: (stringFloatToFloat(category.total) / totalAmount) * 100
					}
				/>
			</Link>
		)
	);

	// Side effect that disables the scroll whenever a modal is open
	useEffect(() => {
		if (toggleModal) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}, [toggleModal]);

	/**
	 * Handles when the option button is toggled and sets the state to expense to make the graph show expense data
	 */
	function handleShowExpense(): void {
		setIsExpense(true);
	}

	/**
	 * Handles when the option button is toggled and sets the state to income to make the graph show income data
	 */
	function handleShowIncome(): void {
		setIsExpense(false);
	}

	// Handles when the date range is selected
	function handleDateRangeChange(value: DateRange | undefined) {
		setDateRange(value);
	}

	// Callback function that toggles the modal
	function handleModalClick(): void {
		setToggleModal((prev) => !prev);
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
			{toggleModal && (
				<Modal isOpen={toggleModal} onClose={handleModalClick}>
					<div className="centered-flex">
						<AddCategoryForm
							handleFailureClick={handleFailureClick}
							handleSuccessClick={handleSuccessClick}
							handleModalClick={handleModalClick}
						/>
					</div>
				</Modal>
			)}
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
				<div className="flex justify-between">
					<ExpenseIncomeButton
						showExpense={isExpense}
						handleShowExpense={handleShowExpense}
						handleShowIncome={handleShowIncome}
					/>
					<div>
						<button className="small-btn bg-white" onClick={handleModalClick}>
							Add
						</button>
					</div>
				</div>
				<div className="block centered-flex flex-col gap-4 bg-white p-4">
					<DonutChart
						data={groupedExpenses.map(
							(category: StringCategoryWithExpenses) => {
								return {
									name: category.name,
									total: stringFloatToFloat(category.total),
								};
							}
						)}
						category="name"
						value="total"
						// This error occurs because colors : "colour" | "another colour" | "another colour" and so on
						// But because we're passing a string[], typescript is scared that this string can be any string literal not in the colors type
						// But since the user is forced to only select colours within the AvailableChartColour we can ignore this error
						// @ts-ignore
						colors={groupedExpenses.map(
							(category: StringCategoryWithExpenses) => category.colour
						)}
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
		</>
	);
}
