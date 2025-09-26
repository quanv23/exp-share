/**
 * Module that contains the global store containing the expenses grouped by categories to be displayed in the category page
 * Allows for updating the display categories from anywhere
 * @module
 */

import { create } from 'zustand';
import { StringExpensesGroupedByCategories } from '../db/expenses';
import { stringFloatToFloat } from '../globalFunctions';

interface GroupedExpenseState {
	/**
	 * All the expenses grouped by category that have passed the filters
	 */
	groupedExpenses: StringExpensesGroupedByCategories[];
	/**
	 * The absolute total amount of all the grouped expenses
	 */
	totalAmount: number;
	/**
	 * Fetches all the expenses and groups them by category using the search parameters from the filter global store
	 */
	fetchGroupedExpenses: (
		isExpense: boolean,
		from: Date | undefined,
		to: Date | undefined
	) => void;
	/**
	 * Gets one category group by it's id from the store. Should only be called after fetchGroupedExpenses or else the state won't be populated
	 */
	getGroupByCategoryId: (
		categoryId: string
	) => StringExpensesGroupedByCategories;
}

// Create grouped expense store
export const useGroupedExpenseStore = create<GroupedExpenseState>(
	(set, get) => ({
		groupedExpenses: [],
		totalAmount: 0,
		fetchGroupedExpenses: async (
			isExpense: boolean,
			from: Date | undefined,
			to: Date | undefined
		) => {
			try {
				// Attempts to fetch data from db with the given search parameters
				const res = await fetch(
					`/api/expenses/grouped/?isExpense=${isExpense}&from=${from?.toISOString()}&to=${to?.toISOString()}`
				);

				if (!res.ok) {
					throw new Error();
				}

				// Parses the data, calculates the total amount and sets it to the state
				const data: StringExpensesGroupedByCategories[] = await res.json();
				const total: number = data.reduce(
					(acc, category) => acc + stringFloatToFloat(category.total),
					0
				);
				set({ groupedExpenses: data, totalAmount: total });
			} catch (error) {
				throw new Error('Failed to fetch grouped expenses in store');
			}
		},
		getGroupByCategoryId: (categoryId: string) => {
			// Gets the category group by filtering the current grouped expenses in the store
			const categoryGroup: StringExpensesGroupedByCategories[] =
				get().groupedExpenses.filter(
					(group: StringExpensesGroupedByCategories) => group.id === categoryId
				);

			// Returns the group as long as something is found
			if (categoryGroup.length > 0) {
				return categoryGroup[0];
			} else {
				throw new Error(`Failed to find category with ${categoryId} in store`);
			}
		},
	})
);
