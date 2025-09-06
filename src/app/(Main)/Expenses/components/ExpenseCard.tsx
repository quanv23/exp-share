/**
 * React component that contains information about expenses to show to the user
 * @module
 */
'use client';

import Modal from '@/app/components/Modal';
import { StringCategory } from '@/lib/db/categories';
import { StringExpense, UserInputExpense } from '@/lib/db/expenses';
import { useState, useEffect } from 'react';
import EditExpenseForm from './EditExpenseForm';
import DeleteExpenseForm from './DeleteExpenseForm';

/**
 * Represents the props of the card
 */
export interface Props {
	/**
	 * Expense passed to the card to display
	 */
	expense: StringExpense;
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
	const { expense, categories, editExpenseFunction, deleteExpenseFunction } =
		props;

	// State that determines whether to display the modals or not
	const [toggleModal, setToggleModal] = useState<Boolean>(false);

	// Side effect that disables the scroll whenever a modal is open
	useEffect(() => {
		if (toggleModal) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}, [toggleModal]);

	/**
	 * Handles when the card is clicked and toggles the modal state
	 */
	function handleModalClick(): void {
		setToggleModal((prev) => !prev);
	}
	// Styles the amount text to either red or green if it's negative
	const amountStyles: string =
		parseFloat(expense.amount) >= 0 ? 'text-myGreen' : 'text-myRed';

	return (
		<>
			{toggleModal && (
				<Modal isOpen={toggleModal} onClose={handleModalClick}>
					<div className='flex flex-col gap-4'>
						<EditExpenseForm
							expense={expense}
							categories={categories}
							editExpenseFunction={editExpenseFunction}
						/>
						<DeleteExpenseForm
							id={expense.id}
							deleteExpenseFunction={deleteExpenseFunction}
						/>
					</div>
				</Modal>
			)}
			<div
				className='rounded-xl shadow-md flex justify-between items-center bg-white px-6 py-4 hover:bg-myLightGray'
				onClick={handleModalClick}
			>
				<div>
					<p>{expense.description}</p>
					<p className='text-xs text-myDarkGray'>{expense.date}</p>
				</div>
				<div className={`${amountStyles}`}>
					${expense.amount.replace('-', '')}
				</div>
			</div>
		</>
	);
}
