/**
 * React component that contains information about expenses or categories to show to the user
 * @module
 */
'use client';

import Modal from '@/app/components/Modal';
import { useState } from 'react';

export default function ExpenseCard() {
	// State that determines whether to display the modals or not
	const [toggleModal, setToggleModal] = useState(false);

	/**
	 * Handles when the card is clicked and toggles the modal state
	 */
	function handleModalClick(): void {
		setToggleModal((prev) => !prev);
	}

	return (
		<>
			{toggleModal && (
				<Modal isOpen={toggleModal} onClose={handleModalClick}>
					<div>Hello</div>
				</Modal>
			)}
			<div
				className='rounded-xl shadow-md flex justify-between items-center bg-white px-6 py-4 hover:bg-myLightGray'
				onClick={handleModalClick}
			>
				<div>
					<p>Expense</p>
					<p className='text-xs text-myDarkGray'>Date</p>
				</div>
				<div>$amount</div>
			</div>
		</>
	);
}
