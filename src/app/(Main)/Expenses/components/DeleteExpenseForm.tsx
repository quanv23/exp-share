/**
 * React form components that appears as a modal for deleting one expense at a time
 * @module
 */
'use client';

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
	 * Function that runs when deletion is confirmed and deletes the specified expense from the db
	 */
	deleteExpenseFunction: (id: string) => Promise<void>;
}

export default function DeleteExpenseForm(props: Props) {
	const { id, deleteExpenseFunction } = props;

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
	async function handleDeleteConfirmed(): Promise<void> {
		try {
			await deleteExpenseFunction(id);
		} catch (error) {
			console.error('Error message: ', error);
			throw new Error('Error deleting expense');
		}
	}

	return (
		<form className='center-flex rounded-xl shadow-md w-64 bg-white p-6 space-y-6'>
			{toggleConfirmation ? (
				<div className='flex'>
					<button onClick={handleDeleteClick} className='w-full'>
						Cancel
					</button>
					<button onClick={handleDeleteConfirmed} className='big-btn bg-myRed'>
						Confirm
					</button>
				</div>
			) : (
				<button
					onClick={handleDeleteClick}
					className='big-btn bg-myRed text-white'
				>
					Delete
				</button>
			)}
		</form>
	);
}
