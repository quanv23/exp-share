/**
 * This page displays all expenses from the db.
 * Allows for editing, deleting, and filtering of expenses
 * @module
 */

import ExpenseCard from './components/ExpenseCard';

export default function page() {
	return (
		<div className='flex flex-col justify-center p-5 gap-4'>
			<div className='centered-flex block w-full h-36 bg-myGreen'>
				<h1 className='text-3xl font-bold text-white'>Expenses</h1>
			</div>
			<div className='flex gap-4'>
				<button className='small-btn bg-white'>Filter</button>
				<button className='small-btn bg-white'>Add</button>
			</div>
			<div>
				<ExpenseCard />
			</div>
		</div>
	);
}
