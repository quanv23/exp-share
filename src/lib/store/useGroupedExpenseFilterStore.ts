/**
 * Module that contains a Zustand store for the filter parameters in the cateogory page
 * Allows for global filter parameters that can easily persist between pages for better UX
 * @module
 */

import { create } from 'zustand';
import { DateRange } from 'react-day-picker';

interface FilterState {
	/**
	 * Filters categories by whether their total sum is positive (income) or negative (expense)
	 */
	isExpense: boolean;
	/**
	 * Filters expenses between a date range
	 * Typing made to match the DonutChart value type to be able to handle changes
	 */
	dateRange: DateRange | undefined;
	/**
	 * Set function for isExpense
	 */
	setIsExpense: (newValue: boolean) => void;
	/**
	 * Set function for dateRange
	 */
	setDateRange: (newDateRange: DateRange | undefined) => void;
}

// Creates filter store
export const useGroupedExpenseFilterStore = create<FilterState>((set) => ({
	isExpense: true,
	dateRange: undefined,
	setIsExpense: (newValue: boolean) => set({ isExpense: newValue }),
	setDateRange: (newDateRange: DateRange | undefined) =>
		set({ dateRange: newDateRange }),
}));
