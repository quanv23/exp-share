/**
 * A react component card that displays information about a category and allows for editing and deleting
 * @module
 */

import { StringExpense } from '@/lib/db/expenses';

/**
 * Represents the props of the card
 */
export interface Prop {
	/**
	 * The unique id of the category for dynamic routing
	 */
	id: string;
	/**
	 * The name of the category
	 */
	name: string;
	/**
	 * The colour of the category
	 */
	colour: string;
	/**
	 * The amount of the category
	 */
	amount: string;
	/**
	 * The list of expenses belonging to this category
	 */
	expenses: StringExpense[];
}

export default function CategoryCard(props: Prop) {
	const { id, name, colour, amount, expenses } = props;

	// Styles the amount text to either red or green if it's negative
	const amountStyles: string =
		parseFloat(amount) >= 0 ? 'text-myGreen' : 'text-myRed';

	return (
		<div className='rounded-xl shadow-md flex justify-between items-center bg-white px-6 py-4 hover:bg-myLightGray'>
			<div>
				<p>{name}</p>
				<p className='text-xs text-myDarkGray'>Percent</p>
			</div>
			<div className={`${amountStyles}`}>${amount.replace('-', '')}</div>
		</div>
	);
}
