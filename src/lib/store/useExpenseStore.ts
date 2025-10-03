/**
 * Module that contains the global store state from Zustand for displaying expenses on the expenses page
 * Allows for persistent data that can be updated anywhere
 * @module
 */
import { create } from 'zustand';
import { StringExpense } from '../db/expenses';
import {
	getCategoryById,
	StringCategory,
	StringCategoryWithExpenses,
} from '../db/categories';
import { stringFloatToFloat } from '../globalFunctions';

interface ExpenseState {
	/**
	 * List of all expenses from the db
	 */
	expenses: StringExpense[];
	/**
	 * All the expenses grouped by category that have passed the filters
	 */
	groupedExpenses: StringCategoryWithExpenses[];
	/**
	 * The absolute total amount of all the grouped expenses or one category group
	 */
	totalAmount: number;
	/**
	 * Async function that fetches all expenses from the db
	 */
	fetchExpenses: () => Promise<void>;
	/**
	 * Fetches all the expenses and groups them by category using the search parameters from the filter global store
	 */
	fetchGroupedExpenses: (
		isExpense: boolean,
		from: Date | undefined,
		to: Date | undefined
	) => void;
	/**
	 * Gets expenses by category id, Should only be called after fetchGroupedExpenses or else the state won't be populated
	 */
	fetchFilteredExpenses: (
		categoryId: string,
		from: Date | undefined,
		to: Date | undefined
	) => void;
	/**
	 * Gets a category along with its expenses by its Id
	 */
	fetchCategoryGroupById: (
		isExpense: boolean,
		from: Date | undefined,
		to: Date | undefined,
		categoryId: string
	) => Promise<StringCategoryWithExpenses>;
}

// Creates expense store for displaying expenses that can be refreshed anywhere
export const useExpenseStore = create<ExpenseState>((set, get) => ({
	expenses: [],
	groupedExpenses: [],
	totalAmount: 0,
	fetchExpenses: async () => {
		try {
			// Attempts to fetch all expenses from db
			const expenses = await fetch('/api/expenses');
			if (!expenses.ok) throw new Error();

			// Parses and sets the store's data
			const data: StringExpense[] = await expenses.json();
			set((state) => ({ expenses: data }));
		} catch (error) {
			console.error(error);
			throw new Error('Failed to fetch expenses in store');
		}
	},
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

			if (!res.ok) throw new Error();

			// Parses the data, calculates the total amount and sets it to the state
			const data: StringCategoryWithExpenses[] = await res.json();
			const total: number = data.reduce(
				(acc, category) => acc + stringFloatToFloat(category.total),
				0
			);
			// Sorts the categories in alphabetical order or else it just randomizes every reload
			data.sort((a, b) => a.name.localeCompare(b.name));
			set((state) => ({ groupedExpenses: data, totalAmount: total }));
		} catch (error) {
			console.error(error);
			throw new Error('Failed to fetch grouped expenses in store');
		}
	},
	// CURRENTLY IS NOT USED
	fetchFilteredExpenses: async (
		categoryId: string,
		from: Date | undefined,
		to: Date | undefined
	) => {
		try {
			// Attempts to fetch data from db with the given search parameters
			const res = await fetch(
				`/api/expenses/?categoryId=${categoryId}&from=${from?.toISOString()}&to=${to?.toISOString()}`
			);

			if (!res.ok) throw new Error();

			// Parses the data, and calculates the total amount
			const data: StringExpense[] = await res.json();
			const total: number = data.reduce(
				(acc, expense) => acc + stringFloatToFloat(expense.amount),
				0
			);
			set((state) => ({ expenses: data, totalAmount: total }));
		} catch (error) {
			console.error(error);
			throw new Error('Failed to fetch expenses by categoryId in store');
		}
	},
	fetchCategoryGroupById: async (
		isExpense: boolean,
		from: Date | undefined,
		to: Date | undefined,
		categoryId: string
	) => {
		try {
			// Attempts to fetch category group
			let res = await fetch(
				`/api/categories/grouped/?isExpense=${isExpense}&from=${from?.toISOString()}&to=${to?.toISOString()}&categoryId=${categoryId}`
			);

			if (!res.ok) throw new Error();

			// Parses the data, calculates the total amount and sets it to the state
			let data: StringCategoryWithExpenses[] = await res.json();

			// Fail safe if no category group matches the query, at least return the category data
			if (data.length === 0) {
				res = await fetch(`/api/categories/?categoryId=${categoryId}`);

				if (!res.ok) throw new Error();

				const categoryData: StringCategory[] = await res.json();
				data = [
					{
						id: categoryData[0].id,
						name: categoryData[0].name,
						colour: categoryData[0].colour,
						expenses: [],
						total: '0',
					},
				];
			}

			const total: number = data.reduce(
				(acc, category) => acc + stringFloatToFloat(category.total),
				0
			);

			set((state) => ({ expenses: data[0].expenses, totalAmount: total }));
			return data[0];
		} catch (error) {
			console.error(error);
			throw new Error('Failed to fetch grouped expenses in store');
		}
	},
}));
