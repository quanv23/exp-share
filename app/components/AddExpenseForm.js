'use client';

import { useState } from 'react';
import SelectCategory from './selectCategory';

/**
 * <Summary> Form for adding new expenses on the home page
 */
export default function AddExpenseForm(props) {
	const { categories, addExpenseAction } = props;

	// State to manage expense data to be submitted
	const [expense, setExpense] = useState({
		description: '',
		amount: '',
		category: '',
	});

	// Handles input field changes and updates the state
	function handleChange(event) {
		const { name, value } = event.target; // gets the name and value of the <input>

		// Only changes the property with the matching name
		setExpense((prevData) => ({
			...prevData,
			[name]: value,
		}));
	}

	// Handles when a form is submitted and creates a new expense
	function handleSubmit(event) {
		event.preventDefault();
		addExpenseAction(expense);
	}

	return (
		<form onSubmit={handleSubmit}>
			<input
				type='text'
				name='description'
				value={expense.description}
				onChange={handleChange}
				placeholder='Description'
			/>
			<input
				type='number'
				name='amount'
				value={expense.amount}
				onChange={handleChange}
				placeholder='Amount'
			/>
			<SelectCategory
				categories={categories}
				value={expense.category}
				onChange={handleChange}
			/>
			<button type='submit'>Submit</button>
		</form>
	);
}
