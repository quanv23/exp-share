/**
 * Provides CURD operations for interacting with expenses in the db
 * Imports the expense model to gain access to the functions
 * @module
 */

import connectDB from './helper/mongoose';
import { Expense } from './models/Expense';
import { Category } from './models/Category'; // Must import for .populate to work
import mongoose from 'mongoose';

/**
 * Represents an expense from the database that is populated with the category fields
 */
export interface PopulatedDatabaseExpense {
	_id: mongoose.Types.ObjectId;
	description: string;
	amount: mongoose.Types.Decimal128;
	category: {
		_id: mongoose.Types.ObjectId;
		name: string;
		colour: string;
	};
	createdAt: string;
}

/**
 * Represents an expense when inputted by a user for inserting into the db
 */
export interface UserInputExpense {
	id?: string;
	description: string;
	amount: string;
	category: string;
	date?: string;
}

/**
 * Represents an expense with string values
 */
export interface StringExpense {
	id: string;
	description: string;
	amount: string;
	category: {
		id: string;
		name: string;
		colour: string;
	};
	date: string;
}

/**
 * Converts a populated database expense into a usable string value representation
 * @param expense A database representation of an expense
 * @returns A string value representation of the given expense
 */
export function cleanExpense(expense: PopulatedDatabaseExpense): StringExpense {
	return {
		id: expense._id.toString(),
		description: expense.description,
		amount: expense.amount.toString(),
		category: {
			id: expense.category._id.toString(),
			name: expense.category.name,
			colour: expense.category.colour,
		},
		date: new Date(expense.createdAt).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		}),
	};
}

/**
 * Takes a string date and creates a new date object
 * Checks if the date string is in the form YYYY-MM-DD because non UTC dates saved into
 * MongoDB are automatically converted to UTC, and the date constructor assumes
 * dates of the form YYYY-MM-DD are in UTC time, thus the dates in the ISO form would skip
 * the conversion, when in actuality they should've been converted resulting in incorrect dates
 * @param dateString A string containing a date
 * @returns A new date object of the same date but stored as local time
 */
function cleanDate(dateString: string): Date {
	const regex: RegExp = /^\d{4}-\d{2}-\d{2}/;

	// Checks if string is in ISO format, and changes it to be in local time
	if (regex.test(dateString)) {
		const [year, month, date] = dateString.split('-').map(Number);
		return new Date(year, month - 1, date);
	} else {
		return new Date(dateString);
	}
}

/**
 * Formats the inputted amount to #.## so only two decimal places with no leading 0
 * For consistency in displaying the values so they're stored in the same format
 * @param amount The expense amount to be verified
 * @returns A string in #.## form
 */
function formatInputtedAmount(amount: string): string {
	const num: number = parseFloat(amount);
	return num.toFixed(2);
}

/**
 * Gets all expenses from the db
 * @returns A promise of a list continaing all expeneses with string values
 */
export async function getAllExpenses(): Promise<StringExpense[]> {
	try {
		// Connects to db, fetches data and cleans it
		await connectDB();
		const raw: PopulatedDatabaseExpense[] =
			await Expense.find<PopulatedDatabaseExpense>().populate('category'); // Must overide generic typing of Expense.find to return a different type for cleanExpense
		return raw.map((expense) => cleanExpense(expense));
	} catch (error) {
		console.error('Error message: ', error);
		throw new Error('Get all expeneses operation failed');
	}
}

/**
 * Gets all expenses that belong to a certain category and are within a date range
 * @returns A promise of a list of expenses that pass the conditions
 */
export async function getFilteredExpenses(
	categoryId: string | null,
	from: string | null,
	to: string | null
): Promise<StringExpense[]> {
	// Dynamically creates expenses filter depending if a date range is given
	const expenseFilter: any = {
		category: new mongoose.Types.ObjectId(categoryId!),
	};
	if (from && to && from !== 'undefined' && to !== 'undefined') {
		expenseFilter.createdAt = {
			$gte: new Date(from),
			$lte: new Date(to),
		};
	}

	// Fetches the expenses that match the filter
	const expeneses: PopulatedDatabaseExpense[] = await Expense.aggregate([
		{
			$match: expenseFilter,
		},
		{
			// Populates the category field
			$lookup: {
				from: 'categories',
				localField: 'category',
				foreignField: '_id',
				as: 'categoryInfo',
			},
		},
		{
			// Flattens the array
			$unwind: '$categoryInfo',
		},
	]);

	// Returns the converted expenses
	return expeneses.map((expense) => cleanExpense(expense));
}

/**
 * Adds an expense into the db
 * @param expense A user inputted expense to be added to the db
 */
export async function addExpense(expense: UserInputExpense): Promise<void> {
	'use server';

	try {
		// Connects to db, and creates new expense
		await connectDB();
		expense.amount = formatInputtedAmount(expense.amount);
		await Expense.create(expense);
	} catch (error) {
		console.error('Error message: ', error);
		throw new Error('Add expense operation failed');
	}
}

/**
 * Edits an expense by ID
 * @param newExpense The new expense to replace the old expense with a matching ID
 */
export async function editExpense(newExpense: UserInputExpense): Promise<void> {
	'use server';

	try {
		// Get the old expense to be updated
		await connectDB();
		newExpense.amount = formatInputtedAmount(newExpense.amount);
		const oldExpense = await Expense.findById(newExpense.id!); // forgo typing to allow mongoose to return it's actual document type for .save()

		//  Check that the expense exists
		if (!oldExpense) {
			throw new Error('Expense not found');
		}

		// Updates the old expense's fields and saves it
		// Doing it likes this allows the schema to enforce it's typing
		oldExpense.description = newExpense.description;
		oldExpense.amount = mongoose.Types.Decimal128.fromString(newExpense.amount);
		oldExpense.category = new mongoose.Types.ObjectId(newExpense.category);
		oldExpense.createdAt = cleanDate(newExpense.date!);
		await oldExpense.save();
	} catch (error) {
		console.error('Error message: ', error);
		throw new Error('Edit expense operation failed');
	}
}

/**
 * Deletes an expense by ID
 * @param id The ID of the expense to be deleted
 */
export async function deleteExpense(id: string): Promise<void> {
	'use server';

	try {
		// Connects to db and deletes expense
		await connectDB();
		await Expense.deleteOne({ _id: id });
	} catch (error) {
		console.error('Error message: ', error);
		throw new Error('Delete expense operation failed');
	}
}
