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
import { StringCategoryWithExpenses } from '@/lib/db/categories';
import { useState } from 'react';
import { RiArrowLeftWideLine, RiPencilFill } from '@remixicon/react';
import Link from 'next/link';
import Modal from '@/app/components/Modal';
import EditCategoryForm from '../components/EditCategoryForm';
import DeleteCategoryForm from '../components/DeleteCategoryForm';
import SuccessDialog from '@/app/components/SuccessDialog';
import FailureDialog from '@/app/components/FailureDialog';

export default function Page() {
	// Gets the route parameter (asserts id is string to get around typing error)
	const { id } = useParams<{ id: string }>();

	// State that determines whether to display sucess/failure dialog
	const [toggleSuccess, setToggleSuccess] = useState<boolean>(false);
	const [toggleFailure, setToggleFailure] = useState<boolean>(false);

	// Gets the global stores
	const dateRange = useExpenseFilterStore((state) => state.dateRange);
	const isExpense = useExpenseFilterStore((state) => state.isExpense);
	const setCategoryId = useExpenseFilterStore((state) => state.setCategoryId);
	const expenses = useExpenseStore((state) => state.expenses);
	const totalAmount = useExpenseStore((state) => state.totalAmount);
	const fetchCategoryGroupById = useExpenseStore(
		(state) => state.fetchCategoryGroupById
	);

	// State that manages the current categories details
	const [category, setCategory] = useState<StringCategoryWithExpenses>({
		id: '',
		name: '',
		colour: '',
		total: '',
		expenses: [],
	});

	// State that determines whether to display the modal or not
	const [toggleModal, setToggleModal] = useState(false);

	// State that manages how many expenses can be displayed on the page at a time
	const [pageLimit, setPageLimit] = useState(10);

	// Side effect that disables the scroll whenever a modal is open
	useEffect(() => {
		if (toggleModal) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}, [toggleModal]);

	// Fetches the expenses to display
	useEffect(() => {
		async function getCategory(): Promise<void> {
			const category: StringCategoryWithExpenses = await fetchCategoryGroupById(
				isExpense,
				dateRange?.from,
				dateRange?.to,
				id
			);
			setCategory(category);
		}

		// Sets the categoryId for the expense card to use when refetching after editing/deleting
		setCategoryId(id);
		getCategory();
	}, []);

	/**
	 * Handles when the edit button is clicked and toggles the modal
	 */
	function handleModalClick(): void {
		setToggleModal((prev) => !prev);
	}

	// Handles whenever the load more btn is clicked and increases the limit of expenses to display
	function handleLoadMore() {
		setPageLimit((prev) => prev + 10);
	}

	/**
	 * Updates the display state with the new values
	 */
	function updateLocalState(name: string, colour: string): void {
		setCategory((prev) => ({
			...prev,
			name: name,
			colour: colour,
		}));
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

	// Creates the expense cards
	const expenseCards: React.ReactNode[] = expenses.map(
		(expense: StringExpense) => (
			<ExpenseCard
				key={expense.id}
				expense={expense}
				filterExpenses={true}
				handleFailureClick={handleFailureClick}
				handleSuccessClick={handleSuccessClick}
			/>
		)
	);

	return (
		<>
			{toggleModal && (
				<Modal isOpen={toggleModal} onClose={handleModalClick}>
					<div className="flex flex-col gap-4">
						<EditCategoryForm
							categoryData={category}
							handleModalClick={handleModalClick}
							updateLocalState={updateLocalState}
							handleFailureClick={handleFailureClick}
							handleSuccessClick={handleSuccessClick}
						/>
						<DeleteCategoryForm
							id={category.id}
							handleFailureClick={handleFailureClick}
							handleSuccessClick={handleSuccessClick}
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
				<div className="flex gap-4 items-center">
					<div className="rounded-full centered-flex bg-white w-8 h-8 shadow-md hover:bg-myLightGray active:bg-myGray;">
						<Link href="/Categories">
							<RiArrowLeftWideLine />
						</Link>
					</div>
					<button className="min-w-[100px] h-[30px] px-6 rounded-3xl text-xs bg-white">
						{isExpense ? 'Expense' : 'Income'}
					</button>
					{dateRange && dateRange.from && dateRange.to && (
						<button className="min-w-[100px] h-[30px] px-6 rounded-3xl text-xs bg-white">
							{`${dateRange.from.toLocaleDateString('en-US', {
								month: 'short',
								day: '2-digit',
							})} - ${dateRange.to.toLocaleDateString('en-US', {
								month: 'short',
								day: '2-digit',
							})}`}
						</button>
					)}
				</div>
				<div className="centered-flex flex-col block w-full h-36 bg-myGreen relative gap-2">
					<h1 className="text-3xl font-bold text-white">{category.name}</h1>
					<p className="font-bold text-white">${totalAmount.toFixed(2)}</p>
					<RiPencilFill
						className="absolute top-2 right-2 text-white"
						onClick={handleModalClick}
					/>
				</div>
				{expenseCards.length === 0 ? (
					<div className="centered-flex">
						No expenses match the filter(s) above
					</div>
				) : (
					<>
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
