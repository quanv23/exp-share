/**
 * React component that contains the form for editing a Category
 * @module
 */
'use client';

import {
	StringCategoryWithExpenses,
	UserInputCategory,
} from '@/lib/db/categories';
import { useState } from 'react';
import ColourSelector from './ColourSelector';

export interface Props {
	/**
	 * Contans the categories data
	 */
	categoryData: StringCategoryWithExpenses;
	/**
	 * Toggles the modal when a sucessful edit is made
	 */
	handleModalClick: () => void;
	/**
	 * Updates the display state
	 */
	updateLocalState: (name: string, colour: string) => void;
	/**
	 * Callback function to open the success after edit is made
	 */
	handleSuccessClick: () => void;
	/**
	 * Callback function to open failure diaglog after edit is failed
	 */
	handleFailureClick: () => void;
}

export default function EditCategoryForm(props: Props) {
	const {
		categoryData,
		handleModalClick,
		updateLocalState,
		handleSuccessClick,
		handleFailureClick,
	} = props;

	// States that manages the category data for updating
	const [category, setCategory] = useState<UserInputCategory>({
		id: categoryData.id,
		name: categoryData.name,
		colour: categoryData.colour,
	});

	/**
	 * Handles when a new colour is selected and updates the state to the new colour
	 * @param colour The new selected colour
	 */
	function handleColourSelected(colour: string): void {
		setCategory((prev) => ({
			...prev,
			colour: colour,
		}));
	}

	/**
	 * Handles when an input field in the form is changed and updates the state.
	 * @remarks Name of the input element must be the exact same as it's corresponding field in the state.
	 * @param event A change in a Html input element event
	 */
	function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
		const { name, value } = event.target;

		// Sets only the field that matches the name of the input element to the new value
		setCategory((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	/**
	 * Handles when the form is submitted and attempts to edit the category
	 */
	async function handleFormSubmit(
		event: React.FormEvent<HTMLFormElement>
	): Promise<void> {
		event.preventDefault();

		try {
			// Makes an API call to edit
			const res = await fetch('/api/categories', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					newCategory: category,
				}),
			});

			if (!res.ok) throw new Error();

			// Updates the display state to match the changes
			updateLocalState(category.name, category.colour);

			// closes the modal
			handleModalClick();

			// Opens success dialog
			handleSuccessClick();
		} catch (error) {
			console.error(error);
			handleModalClick();
			handleFailureClick();
		}
	}

	return (
		<form
			onSubmit={handleFormSubmit}
			className="centered-flex rounded-xl shadow-md flex-col w-64 bg-white p-6 space-y-6"
		>
			<h1 className="text-2xl font-bold">Edit Category</h1>
			<input
				type="text"
				name="name"
				value={category.name}
				onChange={handleInputChange}
				placeholder="Name"
				className="input-field w-full"
			></input>
			<ColourSelector
				selectedColour={category.colour}
				handleColourSelected={handleColourSelected}
			/>
			<button type="submit" className="big-btn bg-myYellow">
				Edit
			</button>
		</form>
	);
}
