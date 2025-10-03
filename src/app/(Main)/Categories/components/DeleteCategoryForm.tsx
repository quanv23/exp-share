/**
 * React component that contains the form for deleting a category
 * @module
 */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Represents the props of the delete form
 */
export interface Props {
	/**
	 * ID of the expense to be deleted
	 */
	id: string;
}

export default function DeleteCategoryForm(props: Props) {
	const { id } = props;
	const router = useRouter();

	// State that manages whether the delete button has been clicked and should show the confirmation buttons
	const [toggleConfirmation, setToggleConfirmation] = useState(false);

	/**
	 * Handles when the delete button is clicked and toggles the confirmation button to appear
	 */
	function handleDeleteClick(): void {
		setToggleConfirmation((prev) => !prev);
	}

	/**
	 * Handles when a delete is confirmed and attempts to delete the category
	 */
	async function handleDeleteConfirmed(
		event: React.FormEvent<HTMLFormElement>
	): Promise<void> {
		event.preventDefault();

		try {
			// Makes request to delete category
			const res = await fetch('/api/categories', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					id: id,
				}),
			});

			// If successful it navigates the user back to the category page
			// Otherwise it just throws an error
			if (res.ok) {
				router.push('/Categories');
			} else {
				throw new Error();
			}
		} catch (error) {
			console.error(error);
			throw new Error('Error deleting category');
		}
	}

	return (
		<form
			onSubmit={handleDeleteConfirmed}
			className="center-flex rounded-xl shadow-md w-64 bg-white p-6 space-y-6"
		>
			{toggleConfirmation ? (
				<div className="flex">
					<button onClick={handleDeleteClick} className="w-full">
						Cancel
					</button>
					<button type="submit" className="big-btn bg-myRed">
						Confirm
					</button>
				</div>
			) : (
				<button
					onClick={handleDeleteClick}
					className="big-btn bg-myRed text-white"
				>
					Delete
				</button>
			)}
		</form>
	);
}
