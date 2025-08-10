/**
 * React component that contains information about expenses to show to the user
 * @module
 */
'use client';

import Modal from '@/app/components/Modal';
import { StringCategory } from '@/lib/db/categories';
import { UserInputExpense } from '@/lib/db/expenses';
import { useState } from 'react';
import EditExpenseForm from './EditExpenseForm';
import DeleteExpenseForm from './DeleteExpenseForm';

/**
 * Represents the props of the card
 */
export interface Props {
	/**
	 * List of all categories from the db to be passed down to the edit form
	 */
	categories: StringCategory[];
	/**
	 * Function that edits an expense from the db to be passed down to the edit form
	 */
	editExpenseFunction: (newExpense: UserInputExpense) => Promise<void>;
	/**
	 * Function that deletes an expense from the db to be passed down to delete form
	 */
	deleteExpenseFunction: (id: string) => Promise<void>;
}

export default function ExpenseCard(props: Props) {
	const { categories, editExpenseFunction, deleteExpenseFunction } = props;

	// State that determines whether to display the modals or not
	const [toggleModal, setToggleModal] = useState(false);

	/**
	 * Handles when the card is clicked and toggles the modal state
	 */
	function handleModalClick(): void {
		setToggleModal((prev) => !prev);
	}

	return (
		<>
			{toggleModal && (
				<Modal isOpen={toggleModal} onClose={handleModalClick}>
					<div className='flex flex-col gap-4'>
						<EditExpenseForm
							categories={categories}
							editExpenseFunction={editExpenseFunction}
						/>
						<DeleteExpenseForm deleteExpenseFunction={deleteExpenseFunction} />
					</div>
				</Modal>
			)}
			<div
				className='rounded-xl shadow-md flex justify-between items-center bg-white px-6 py-4 hover:bg-myLightGray'
				onClick={handleModalClick}
			>
				<div>
					<p>Expense</p>
					<p className='text-xs text-myDarkGray'>Date</p>
				</div>
				<div>$amount</div>
			</div>
		</>
	);
}
