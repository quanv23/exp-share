/**
 * React form component that appears as a modal for editing one expense at a time
 * @module
 */
'use client';

import { useState } from 'react';
import { StringCategory } from '@/lib/db/categories';
import { UserInputExpense } from '@/lib/db/expenses';
import SelectCategory from '@/app/components/SelectCategory';

/**
 * Represents the type for an event change in the form
 */
type EventChange =
	| React.ChangeEvent<HTMLInputElement>
	| React.ChangeEvent<HTMLSelectElement>;

/**
 * Represents the props of the edit form
 */
export interface Props {
	/**
	 * Function that runs when editing is confirmed to update the changes in the db
	 */
	editExpenseFunction: (newExpense: UserInputExpense) => Promise<void>;
	/**
	 * List of all categories to pass down to select category combox box
	 */
	categories: StringCategory[];
}

export default function EditExpenseForm(props: Props) {
	const { editExpenseFunction, categories } = props;

	// State that manages the expense data for updating in the db
	const [expense, setExpense] = useState<UserInputExpense>({
		description: '',
		amount: '',
		category: '',
		date: '',
	});

	/**
	 * Handles when an input field in the form is changed and updates the expense state.
	 * NOTE: Name of the input element must be the exact same as it's corresponding field in the expense state.
	 * @param event A change in a Html input element event
	 */
	function handleInputChange(event: EventChange): void {
		const { name, value } = event.target;

		// Sets only the field that matches the name of the input element to the new value
		setExpense((prevData) => ({
			...prevData,
			[name]: value,
		}));
	}

	/**
	 * Handles when the form is submitted and attempts to update db with new information
	 * @param event A form submission event
	 */
	function handleFormSubmit(event: React.FormEvent<HTMLFormElement>): void {
		try {
			console.log(expense);

			// // Clears input fields
			// setExpense({
			// 	description: '',
			// 	amount: '',
			// 	category: '',
			// 	date: '',
			// });
		} catch (error) {
			console.error('Error message: ', error);
			throw new Error('Error editing expense');
		}
	}

	return (
		<form
			onSubmit={handleFormSubmit}
			className='centered-flex rounded-xl shadow-md flex-col w-64 bg-white p-6 space-y-6'
		>
			<h1 className='text-2xl font-bold'>Edit Expense</h1>
			<input
				type='text'
				name='description'
				value={expense.description}
				onChange={handleInputChange}
				placeholder='Description'
				className='input-field w-full'
			></input>
			<input
				type='number'
				name='amount'
				value={expense.amount}
				onChange={handleInputChange}
				placeholder='Amount'
				className='input-field w-full'
			></input>
			<SelectCategory
				categories={categories}
				value={expense.category}
				width={'w-full'}
				onChangeFunction={handleInputChange}
			/>
			<button type='submit' className='big-btn bg-myYellow'>
				Edit
			</button>
		</form>
	);
}
