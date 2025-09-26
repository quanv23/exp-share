/**
 * Module that contains the global store state from Zustand for displaying expenses on the expenses page
 * Allows for persistent data that can be updated anywhere
 * @module
 */
import { create } from 'zustand';
import { StringExpense } from '../db/expenses';

interface ExpenseState {
	/**
	 * List of all expenses from the db
	 */
	expenses: StringExpense[];
	/**
	 * Async function that fetches all expenses from the db
	 */
	fetchExpenses: () => Promise<void>;
}

// Creates expense store for displaying expenses that can be refreshed anywhere
export const useExpenseStore = create<ExpenseState>((set) => ({
	expenses: [],
	fetchExpenses: async () => {
		try {
			// Attempts to fetch all expenses from db
			const expenses = await fetch('/api/expenses');
			if (!expenses.ok) throw new Error();

			// Parses and sets the store's data
			const data: StringExpense[] = await expenses.json();
			set({ expenses: data });
		} catch (error) {
			throw new Error('Failed to fetch expenses in store');
		}
	},
}));
