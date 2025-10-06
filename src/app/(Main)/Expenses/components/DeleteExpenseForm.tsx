/**
 * React form components that appears as a modal for deleting one expense at a time
 * @module
 */
'use client';

import { useExpenseFilterStore } from '@/lib/store/useExpenseFilterStore';
import { useExpenseStore } from '@/lib/store/useExpenseStore';
import { useState } from 'react';

/**
 * Represents the props of the delete form
 */
export interface Props {
	/**
	 * ID of the expense to be deleted
	 */
	id: string;
	/**
	 * Callback function that toggles the modal to close after deletion is confirmed
	 */
	handleModalClick: () => void;
	/**
	 * Callback function to open the success after deletion
	 */
	handleSuccessClick: () => void;
	/**
	 * Callback function to open failure diaglog after delete fails
	 */
	handleFailureClick: () => void;
	/**
	 * Flag that determines if fetched expenses are filtered or not
	 */
	filterExpenses: boolean;
}

export default function DeleteExpenseForm(props: Props) {
	const {
		id,
		handleModalClick,
		handleSuccessClick,
		handleFailureClick,
		filterExpenses,
	} = props;

	// Gets global store for refetching expenses
	const fetchExpenses = useExpenseStore((state) => state.fetchExpenses);
	const fetchCategoryGroupById = useExpenseStore(
		(state) => state.fetchCategoryGroupById
	);
	const isExpense = useExpenseFilterStore((state) => state.isExpense);
	const dateRange = useExpenseFilterStore((state) => state.dateRange);
	const categoryId = useExpenseFilterStore((state) => state.categoryId);

	// State that manages whether the delete button has been clicked and should show the confirmation buttons
	const [toggleConfirmation, setToggleConfirmation] = useState<boolean>(false);

	/**
	 * Handles when the delete button is clicked and toggles the confirmation button to appear
	 */
	function handleDeleteClick(): void {
		setToggleConfirmation((prev) => !prev);
	}

	/**
	 * Handles when the delete is confirmed and deletes the expense from the db
	 */
	async function handleDeleteConfirmed(
		event: React.FormEvent<HTMLButtonElement>
	): Promise<void> {
		try {
			event.preventDefault();

			// Attempts to delete expense
			const res = await fetch('/api/expenses', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					id: id,
				}),
			});

			if (!res.ok) {
				throw new Error();
			}

			// Refetches expenses to refresh the store
			if (filterExpenses) {
				fetchCategoryGroupById(
					isExpense,
					dateRange?.from,
					dateRange?.to,
					categoryId
				);
			} else {
				fetchExpenses();
			}

			// Closes modal
			handleModalClick();

			// Opens success dialog
			handleSuccessClick();
		} catch (error) {
			console.error('Error message: ', error);
			handleModalClick();
			handleFailureClick();
		}
	}

	return (
		<form className="center-flex rounded-xl shadow-md w-64 bg-white p-6 space-y-6">
			{toggleConfirmation ? (
				<div className="flex">
					<button onClick={handleDeleteClick} className="w-full">
						Cancel
					</button>
					<button onClick={handleDeleteConfirmed} className="big-btn bg-myRed">
						Confirm
					</button>
				</div>
			) : (
				<button
					onClick={handleDeleteClick}
					className="big-btn bg-myRed text-white"
				>
					Delete
				</button>
			)}
		</form>
	);
}
