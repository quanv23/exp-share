/**
 * Module that contains the global store state from Zustand
 * @module
 */
import { create } from 'zustand';
import { StringExpense } from '../db/expenses';

interface ExpenseState {
	error: boolean;
	expenses: StringExpense[];
	fetchExpenses: () => Promise<void>;
}

export const useExpenseStore = create<ExpenseState>((set) => ({
	error: false,
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
			set({ error: true });
		}
	},
}));
