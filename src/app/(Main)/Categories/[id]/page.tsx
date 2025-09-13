/**
 * This page is a dynamic route that showcases the expenses belonging to a given category.
 * Allows for editing, and deleting expenses as well as editing and deleting the category
 * @module
 */

import { getAllExpensesByCategory } from '@/lib/db/expenses';
import { StringExpensesGroupedByCategories } from '@/lib/db/expenses';
import { combineStackGroups } from 'recharts/types/state/selectors/axisSelectors';

export interface Props {
	/**
	 * The id of the category containing the displayed expenses
	 */
	params: Promise<{ id: string }>;
	/**
	 * The query parameters for fetching the data from the db
	 */
	searchParams: Promise<{ isExpense: string; from: string; to: string }>;
}

export default async function page({ params, searchParams }: Props) {
	const { id } = await params;
	const { isExpense, from, to } = await searchParams;

	const expenses = await getAllExpensesByCategory(from, to, isExpense, id);
	console.log(expenses);

	return (
		<div>
			<div>{id}</div>
			<div>{isExpense}</div>
			<div>{from}</div>
			<div>{to}</div>
		</div>
	);
}
