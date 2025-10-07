/**
 * A react component that contains the form for adding an expense to the db
 * @module
 */

'use client';

import { useEffect, useState } from 'react';
import { StringCategory } from '@/lib/db/categories';
import { UserInputExpense } from '@/lib/db/expenses';
import SelectCategory from './SelectCategory';

/**
 * Represents the type for an event change in the form
 */
type EventChange =
	| React.ChangeEvent<HTMLInputElement>
	| React.ChangeEvent<HTMLSelectElement>;

interface Props {
	/**
	 * Callback function to open the success after edit is made
	 */
	handleSuccessClick: () => void;
	/**
	 * Callback function to open failure diaglog after edit is failed
	 */
	handleFailureClick: () => void;
}

export default function AddExpenseForm(props: Props) {
	const { handleFailureClick, handleSuccessClick } = props;

	// State that handles the expense information for inserting into the db
	const [expense, setExpense] = useState<UserInputExpense>({
		description: '',
		amount: '',
		category: '',
	});

	// State that contains the categories
	const [categories, setCategories] = useState<StringCategory[]>([]);

	// Fetches categories from the db for the dropdown when page is first rendered
	useEffect(() => {
		async function fetchCategories(): Promise<void> {
			const categories = await fetch('/api/categories');

			if (!categories.ok) throw new Error();

			const data: StringCategory[] = await categories.json();
			setCategories(data);
		}

		fetchCategories();
	}, []);

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
	 * Handles when a form is submitted and tries to add the expense to the db
	 * @param event A submit form event
	 */
	async function handleFormSubmit(
		event: React.FormEvent<HTMLFormElement>
	): Promise<void> {
		try {
			event.preventDefault(); // Prevents refresh

			// Attemps to add expense
			const res = await fetch('/api/expenses', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					newExpense: expense,
				}),
			});

			if (!res.ok) throw new Error();

			// Opens success modal
			handleSuccessClick();

			// Clears expense fields
			setExpense({
				description: '',
				amount: '',
				category: '',
			});
		} catch (error) {
			console.error('Error message: ', error);
			handleFailureClick();
		}
	}

	return (
		<form
			onSubmit={handleFormSubmit}
			className="centered-flex block flex-col bg-white p-8 space-y-6"
		>
			<h1 className="text-4xl font-bold">Add Expense</h1>
			<input
				type="text"
				name="description"
				value={expense.description}
				onChange={handleInputChange}
				placeholder="Description"
				className="input-field w-full"
			></input>
			<div className="flex w-full gap-x-4">
				<input
					type="number"
					name="amount"
					value={expense.amount}
					onChange={handleInputChange}
					placeholder="Amount"
					className="input-field w-3/6"
				></input>
				<SelectCategory
					categories={categories}
					value={expense.category}
					width={'w-3/6'}
					onChangeFunction={handleInputChange}
				/>
			</div>
			<button type="submit" className="big-btn bg-myGreen">
				Add
			</button>
		</form>
	);
}
