/**
 * A react componenet that acts as a modal for adding new categories
 * @module
 */
'use client';

import { UserInputCategory } from '@/lib/db/categories';
import ColourSelector from './ColourSelector';
import { useExpenseFilterStore } from '@/lib/store/useExpenseFilterStore';
import { useState } from 'react';
import { useExpenseStore } from '@/lib/store/useExpenseStore';

export default function AddCategoryForm() {
	// Uses the grouped expense and filter store to refetch categories after adding a new one
	const fetchGroupedExpenses = useExpenseStore(
		(state) => state.fetchGroupedExpenses
	);
	const isExpense = useExpenseFilterStore((state) => state.isExpense);
	const dateRange = useExpenseFilterStore((state) => state.dateRange);

	const [categoryState, setCategoryState] = useState<UserInputCategory>({
		name: '',
		colour: 'blue',
	});

	/**
	 * Handles when an input field in the form is changed and updates the expense state.
	 * @remarks Name of the input element must be the exact same as it's corresponding field in the expense state.
	 * @param event A change in a Html input element event
	 */
	function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
		const { name, value } = event.target;

		// Sets only the field that matches the name of the input element to the new value
		setCategoryState((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	/**
	 * Handles when a new colour is selected and updates the state to the new colour
	 * @param colour The new selected colour
	 */
	function handleColourSelected(colour: string): void {
		setCategoryState((prev) => ({
			...prev,
			colour: colour,
		}));
	}

	/**
	 * Handles when the form is submitted and attempts to add the category to db
	 * Then refetches the categories and closes the modal
	 */
	async function handleFormSubmit(
		event: React.FormEvent<HTMLFormElement>
	): Promise<void> {
		try {
			event.preventDefault();
			console.log(categoryState);

			const res = await fetch('/api/categories', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ newCategory: categoryState }),
			});

			if (!res.ok) {
				throw new Error();
			}

			// Refetches the categories
			fetchGroupedExpenses(isExpense, dateRange?.from, dateRange?.to);
		} catch (error) {
			console.error('Error message: ', error);
			throw new Error('Error creating new category');
		}
	}

	return (
		<form
			onSubmit={handleFormSubmit}
			className="centered-flex rounded-xl shadow-md flex-col w-64 bg-white p-6 space-y-6"
		>
			<h1 className="text-2xl font-bold">Add Category</h1>
			<input
				type="text"
				name="name"
				value={categoryState.name}
				onChange={handleInputChange}
				placeholder="Name"
				className="input-field w-full"
			></input>
			<ColourSelector
				selectedColour={categoryState.colour}
				handleColourSelected={handleColourSelected}
			/>
			<button type="submit" className="big-btn bg-myGreen">
				Add
			</button>
		</form>
	);
}
