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
	createdAt?: string;
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
	createdAt: string;
}

/**
 * Converts a populated database expense into a usable string value representation
 * @param expense A database representation of an expense
 * @returns A string value representation of the given expense
 */
function cleanExpense(expense: PopulatedDatabaseExpense): StringExpense {
	return {
		id: expense._id.toString(),
		description: expense.description,
		amount: expense.amount.toString(),
		category: {
			id: expense.category._id.toString(),
			name: expense.category.name,
			colour: expense.category.colour,
		},
		createdAt: new Date(expense.createdAt).toLocaleDateString(),
	};
}

/**
 * Takes a string date of the form YYYY-MM-DD and creates a new data object
 * of the same date to be interpreted as local time because non UTC dates saved into
 * MongoDB are automatically converted to UTC, and the date constructor assumes
 * dates of the form YYYY-MM-DD are in UTC time, thus the date would be stored
 * incorrectly
 * @param dateString A string containing a date in YYYY-MM-DD format
 * @returns A new date object of the same date but stored as local time
 */
function cleanDate(dateString: string): Date {
	const [year, month, date] = dateString.split('-').map(Number);
	return new Date(year, month - 1, date);
}

/**
 * Gets all expenses from the db
 * @returns A promise of a list continaing all expeneses in a with string values
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
 * Adds an expense into the db
 * @param expense A user inputted expense to be added to the db
 */
export async function addExpense(expense: UserInputExpense): Promise<void> {
	'use server';

	try {
		// Connects to db, and creates new expense
		await connectDB();
		await Expense.create(expense);
	} catch (error) {
		console.error('Error message: ', error);
		throw new Error('Add expense operation failed');
	}
}

/**
 * Edits an expense by ID
 * @param newExpense A expense with matching ID and field values to be updated to
 */
export async function editExpense(newExpense: UserInputExpense): Promise<void> {
	'use server';

	try {
		// Get the old expense to be updated
		await connectDB();
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
		oldExpense.createdAt = cleanDate(newExpense.createdAt!);
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
