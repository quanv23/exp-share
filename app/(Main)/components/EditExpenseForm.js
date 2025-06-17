import { useState } from 'react';
import SelectCategory from '@/app/components/selectCategory';

/**
 * <Summary> Form for editing an expense
 */
export default function EditExpenseForm(props) {
	const {
		id,
		description,
		amount,
		category,
		createdAt,
		categories,
		editExpenseAction,
	} = props;

	// State that manages the data of the edit form
	const [editFormData, setEditFormData] = useState({
		id: id,
		description: description,
		amount: amount,
		category: category.id,
		createdAt: createdAt,
	});

	// Handles input field changes and updates the state
	function handleChange(event) {
		const { name, value } = event.target;
		setEditFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	}

	// Handles when form is submitted and edits expense
	function handleSubmit(event) {
		event.preventDefault();
		editExpenseAction(editFormData);
	}

	return (
		<form onSubmit={handleSubmit}>
			<input
				type='text'
				name='description'
				value={editFormData.description}
				placeholder='Description'
				onChange={handleChange}
			/>
			<input
				type='number'
				name='amount'
				value={editFormData.amount}
				placeholder='Amount'
				onChange={handleChange}
			/>
			<SelectCategory
				categories={categories}
				value={editFormData.category}
				onChange={handleChange}
			/>
			<input
				type='date'
				name='createdAt'
				value={editFormData.date}
				placeholder='Date'
				onChange={handleChange}
			/>
			<button type='submit'>Submit</button>
		</form>
	);
}
