'use client';

import Modal from '@/app/components/Modal';
import { useState } from 'react';
import EditExpenseForm from './EditExpenseForm';

/**
 * <Summary> Creates a card to display expense details with a dropdown to edit/delete buttons that toggle their respective modals
 */
export default function ExpenseCard(props) {
	const { description, amount, category, createdAt } = props;

	// State that manages whether the dropdown/modal is open or not
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	// Click handlers that toggles the dropdown/modal state
	function toggleDropdown() {
		setIsDropdownOpen((prev) => !prev);
	}
	function toggleEditModal() {
		setIsEditModalOpen((prev) => !prev);
	}
	function toggleDeleteModal() {
		setIsDeleteModalOpen((prev) => !prev);
	}

	return (
		<>
			{isEditModalOpen && (
				<Modal toggleModal={toggleEditModal}>
					<EditExpenseForm {...props} />
				</Modal>
			)}
			{isDeleteModalOpen && (
				<Modal toggleModal={toggleDeleteModal}>
					<div>Delete</div>
				</Modal>
			)}
			<div onClick={toggleDropdown}>
				<h4>Description: {description}</h4>
				<p>Amount: {amount}</p>
				<p>Category: {category.name}</p>
				<p>Date: {createdAt}</p>
			</div>
			<div>
				{isDropdownOpen && (
					<div>
						<button onClick={toggleDropdown}>Cancel</button>
						<button onClick={toggleEditModal}>Edit</button>
						<button onClick={toggleDeleteModal}>Delete</button>
					</div>
				)}
			</div>
		</>
	);
}
