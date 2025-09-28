/**
 * Module that contains the global store containing the expenses grouped by categories to be displayed in the category page
 * Allows for updating the display categories from anywhere
 * @module
 */

import { create } from 'zustand';
import {
	CategoryWithExpenses,
	StringCategoryWithExpenses,
} from '../db/categories';
import { stringFloatToFloat } from '../globalFunctions';

interface GroupedExpenseState {
	/**
	 * All the expenses grouped by category that have passed the filters
	 */
	groupedExpenses: StringCategoryWithExpenses[];
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
	getGroupByCategoryId: (categoryId: string) => StringCategoryWithExpenses;
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
					`/api/categories/grouped/?isExpense=${isExpense}&from=${from?.toISOString()}&to=${to?.toISOString()}`
				);

				if (!res.ok) {
					throw new Error();
				}

				// Parses the data, calculates the total amount and sets it to the state
				const data: StringCategoryWithExpenses[] = await res.json();
				const total: number = data.reduce(
					(acc, category) => acc + stringFloatToFloat(category.total),
					0
				);
				// Sorts the categories in alphabetical order or else it just randomizes every reload
				data.sort((a, b) => a.name.localeCompare(b.name));
				set({ groupedExpenses: data, totalAmount: total });
			} catch (error) {
				throw new Error('Failed to fetch grouped expenses in store');
			}
		},
		getGroupByCategoryId: (categoryId: string) => {
			// Gets the category group by filtering the current grouped expenses in the store
			const categoryGroup: StringCategoryWithExpenses[] =
				get().groupedExpenses.filter(
					(group: StringCategoryWithExpenses) => group.id === categoryId
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
