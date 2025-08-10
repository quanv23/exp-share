/**
 * A react component that contains the form for adding an expense to the db
 * @module
 */

'use client';

import { useState } from 'react';
import { StringCategory } from '@/lib/db/categories';
import { UserInputExpense } from '@/lib/db/expenses';
import SelectCategory from './SelectCategory';

/**
 * Represents the props for this component
 */
export interface Props {
	/**
	 * List of all categories from the db with string values
	 */
	categories: StringCategory[];
	/**
	 * Function that runs when the form is submitted to add an expense to the db
	 */
	addExpenseFunction: (expense: UserInputExpense) => void;
}

/**
 * Represents the type for an event change in the form
 */
type EventChange =
	| React.ChangeEvent<HTMLInputElement>
	| React.ChangeEvent<HTMLSelectElement>;

export default function AddExpenseForm(props: Props) {
	const { categories, addExpenseFunction } = props;

	// State that handles the expense information for inserting into the db
	const [expense, setExpense] = useState<UserInputExpense>({
		description: '',
		amount: '',
		category: '',
	});

	/**
	 * Handles when an input field in the form is changed and updates the expense state.
	 * NOTE: Name of the input element must be the exact same as it's corresponding field in the expense state.
	 * @param event A change in a Html input element event
	 */
	function handleInputChange(event: EventChange): void {
		const { name, value } = event.target;

		// Sets only the name of the input element to the new value
		setExpense((prevData) => ({
			...prevData,
			[name]: value,
		}));
	}

	/**
	 * Handles when a form is submitted and trys to add the expense to the db
	 * @param event A submit form event
	 */
	function handleFormSubmit(event: React.FormEvent<HTMLFormElement>): void {
		try {
			event.preventDefault(); // Prevents refresh
			console.log(expense);

			// Clears expense fields
			setExpense({
				description: '',
				amount: '',
				category: '',
			});
		} catch (error) {
			console.error('Error message: ', error);
			throw new Error('Error submitting add expense form');
		}
	}

	return (
		<form
			onSubmit={handleFormSubmit}
			className='centered-flex block flex-col w-full bg-white p-8 space-y-6'
		>
			<h1 className='text-4xl font-bold'>Add Expense</h1>
			<input
				type='text'
				name='description'
				value={expense.description}
				onChange={handleInputChange}
				placeholder='Description'
				className='input-field w-full'
			></input>
			<div className='flex gap-x-4'>
				<input
					type='number'
					name='amount'
					value={expense.amount}
					onChange={handleInputChange}
					placeholder='Amount'
					className='input-field w-3/6'
				></input>
				<SelectCategory
					categories={categories}
					value={expense.category}
					onChangeFunction={handleInputChange}
				/>
			</div>
			<button type='submit' className='big-btn bg-myGreen'>
				Add +
			</button>
		</form>
	);
}
