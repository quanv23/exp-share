/**
 * The main page of the application and which allows adding expenses to the db
 * @module
 */
'use client';

import {
	RiAddCircleFill,
	RiBarChart2Fill,
	RiPriceTag3Fill,
	RiMoneyDollarCircleFill,
} from '@remixicon/react';
import Link from 'next/link';
import AddExpenseForm from './components/AddExpenseForm';
import SuccessDialog from './components/SuccessDialog';
import FailureDialog from './components/FailureDialog';
import Modal from './components/Modal';
import { useState } from 'react';

export default function Page() {
	const [toggleSuccess, setToggleSuccess] = useState<boolean>(false);
	const [toggleFailure, setToggleFailure] = useState<boolean>(false);

	/**s
	 * Handles when a success diaglog needs to be open/closed
	 */
	function handleSuccessClick(): void {
		setToggleSuccess((prev) => !prev);
	}

	/**
	 * Handles when a failure diaglog needs to be open/closed
	 */
	function handleFailureClick(): void {
		setToggleFailure((prev) => !prev);
	}

	return (
		<>
			{toggleSuccess && (
				<Modal isOpen={toggleSuccess} onClose={handleSuccessClick}>
					<SuccessDialog />
				</Modal>
			)}
			{toggleFailure && (
				<Modal isOpen={toggleFailure} onClose={handleFailureClick}>
					<FailureDialog />
				</Modal>
			)}
			<div className="centered-flex block flex-col space-y-4 w-screen h-screen p-5">
				<AddExpenseForm
					handleSuccessClick={handleSuccessClick}
					handleFailureClick={handleFailureClick}
				/>
				<div className="centered-flex block h-16 p-6 bg-white gap-10">
					<Link href={'/'}>
						<RiAddCircleFill />
					</Link>
					<Link href={'/Dashboard'}>
						<RiBarChart2Fill className="text-myDarkGray" />
					</Link>
					<Link href={'/Categories'}>
						<RiPriceTag3Fill className="text-myDarkGray" />
					</Link>
					<Link href={'/Expenses'}>
						<RiMoneyDollarCircleFill className="text-myDarkGray" />
					</Link>
				</div>
			</div>
		</>
	);
}
