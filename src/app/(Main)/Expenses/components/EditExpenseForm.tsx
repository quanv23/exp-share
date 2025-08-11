/**
 * React form component that appears as a modal for editing one expense at a time
 * @module
 */
'use client';

import { useState } from 'react';
import { StringCategory } from '@/lib/db/categories';
import { StringExpense, UserInputExpense } from '@/lib/db/expenses';
import { DatePicker } from '@/tremorComponents/DatePicker';
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
	 * The expense to be edited in the db
	 */
	expense: StringExpense;
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
	const { expense, editExpenseFunction, categories } = props;

	// State that manages the expense data for updating in the db
	const [expenseState, setExpenseState] = useState<UserInputExpense>({
		id: expense.id,
		description: expense.description,
		amount: expense.amount,
		category: expense.category.id,
		date: expense.date,
	});

	// State that manages the selected date for the date picker
	// Must exist separate of the expense state because the date picker requires a Date type but the expense state stores a string
	// So the field will not update because it's not actually referencing the state when converting the string to a Date object
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(
		new Date(expense.date)
	);

	/**
	 * Handles when an input field in the form is changed and updates the expense state.
	 * NOTE: Name of the input element must be the exact same as it's corresponding field in the expense state.
	 * @param event A change in a Html input element event
	 */
	function handleInputChange(event: EventChange): void {
		const { name, value } = event.target;

		// Sets only the field that matches the name of the input element to the new value
		setExpenseState((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	/**
	 * Handles when a new date is selected, and updates the expense and selected date states
	 * @remarks This function is separate from the other input fields due to the use of the date picker component which requires a Date object
	 * @param date The newly selected date returned from the date picker component
	 */
	function handleDateChange(date: Date | undefined): void {
		setSelectedDate(date);
		setExpenseState((prev) => ({
			...prev,
			date: date?.toLocaleDateString(),
		}));
	}

	/**
	 * Handles when the form is submitted and attempts to update db with new information
	 * @param event A form submission event
	 */
	function handleFormSubmit(event: React.FormEvent<HTMLFormElement>): void {
		try {
			editExpenseFunction(expenseState);
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
				value={expenseState.description}
				onChange={handleInputChange}
				placeholder='Description'
				className='input-field w-full'
			></input>
			<input
				type='number'
				name='amount'
				value={expenseState.amount}
				onChange={handleInputChange}
				placeholder='Amount'
				className='input-field w-full'
			></input>
			<SelectCategory
				categories={categories}
				value={expenseState.category}
				width={'w-full'}
				onChangeFunction={handleInputChange}
			/>
			<DatePicker value={selectedDate} onChange={handleDateChange} />
			<button type='submit' className='big-btn bg-myYellow'>
				Edit
			</button>
		</form>
	);
}
