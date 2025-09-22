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
 * Represents a list of expenses grouped by category
 */
export interface ExpensesGroupedByCategories {
	_id: mongoose.Types.ObjectId;
	name: string;
	colour: string;
	total: mongoose.Types.Decimal128;
	count: number;
	expenses: PopulatedDatabaseExpense[];
}

/**
 * Represents a list of expenses grouped by category, but populated and with all fields as strings
 */
export interface StringExpensesGroupedByCategories {
	id: string;
	name: string;
	colour: string;
	total: string;
	count: string;
	expenses: StringExpense[];
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
		date: new Date(expense.createdAt).toLocaleDateString(),
	};
}

/**
 * Converts expenses grouped by categories into a usable string value representation
 * @param expensesByCategory A list of expenses grouped by category in their db representation
 * @returns A string value representation of the entire list of expenses
 */
function cleanExpenseByCategory(
	expensesByCategory: ExpensesGroupedByCategories[]
): StringExpensesGroupedByCategories[] {
	const result: StringExpensesGroupedByCategories[] = [];

	// Converts all grouped expenses to string representation
	expensesByCategory.forEach((categoryGroup: ExpensesGroupedByCategories) => {
		// Converts all expenses in the current group to a string representation
		const stringExpenses: StringExpense[] = categoryGroup.expenses.map(
			(expense) => cleanExpense(expense)
		);

		const stringCategoryGroup: StringExpensesGroupedByCategories = {
			id: categoryGroup._id.toString(),
			name: categoryGroup.name,
			colour: categoryGroup.colour,
			total: categoryGroup.total.toString(),
			count: categoryGroup.count.toString(),
			expenses: stringExpenses,
		};

		// Adds the converted group to the return list
		result.push(stringCategoryGroup);
	});

	return result;
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
 * Formats the inputted amount to #.##.
 * For consistency in displaying the values so they're stored in the same format
 * @param amount The expense amount to be verified
 * @returns A string in #.## form
 */
function formatInputtedAmount(amount: string): string {
	// Checks if the amount is not a number
	if (amount === '' || amount === '-' || amount === '--') {
		return '0.00';
	}

	// Check for leading negative
	const isNegative: Boolean = amount.startsWith('-');
	if (isNegative) {
		amount = amount.slice(1); // Removes the negative sign
	}

	let [left, right = ''] = amount.split('.');

	// Remove leading zeros on the left, but keep 0 if empty
	left = left.replace(/^0+/, '') || '0';

	// Truncate or pad right side to exactly two digits
	if (right.length > 2) {
		right = right.slice(0, 2);
	} else {
		right = right.padEnd(2, '0');
	}

	return `${isNegative ? '-' : ''}${left}.${right}`;
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
 * Gets all expenses from the db grouped by their categories
 * @from A string in ISO date format that filters all expenses to be greater than this date
 * @to A string in ISO date format that filters all expenses to be less than this date
 * @isExpense A string equal to true/false indicating whether to filter the groups by expense/income
 * @returns A promise of a list of all expenses grouped by their categories with all fields converted to string
 */
export async function getExpensesByCategory(
	from: string | null,
	to: string | null,
	isExpense: string | null,
	categoryId: string | null = null
): Promise<StringExpensesGroupedByCategories[]> {
	// Generates date range filter for the query depending if from and to are valid date strings
	const dataRangeMatch: any = {};
	if (from && to && from !== 'undefined' && to !== 'undefined') {
		dataRangeMatch.createdAt = {};
		if (from) dataRangeMatch.createdAt.$gte = new Date(from);
		if (to) dataRangeMatch.createdAt.$lte = new Date(to);
	}

	try {
		await connectDB();

		// Groups expenses by categories
		const expenses: ExpensesGroupedByCategories[] = await Expense.aggregate([
			{
				$match: dataRangeMatch,
			},
			{
				// Looks up the categories since they're referenced by ObjectId in Expense schema
				$lookup: {
					from: 'categories',
					localField: 'category',
					foreignField: '_id',
					as: 'categoryInfo',
				},
			},
			{ $unwind: '$categoryInfo' },
			{
				// If the optional category id is given, only gets that category's data
				$match: categoryId
					? { 'categoryInfo._id': new mongoose.Types.ObjectId(categoryId) }
					: {},
			},
			{
				// Groups expenses, and calculates the sum and count
				$group: {
					_id: {
						id: '$categoryInfo._id',
						name: '$categoryInfo.name',
						colour: '$categoryInfo.colour',
					},
					total: { $sum: '$amount' },
					count: { $sum: 1 },
					expenses: { $push: '$$ROOT' },
				},
			},
			{
				// Filters the grouped categories by expense/income
				$match: {
					total: isExpense === 'true' ? { $lt: 0 } : { $gt: 0 },
				},
			},
			{
				// Formats the return object to match the type
				$project: {
					_id: '$_id.id',
					name: '$_id.name',
					colour: '$_id.colour',
					total: 1,
					count: 1,
					expenses: 1,
				},
			},
		]);

		return cleanExpenseByCategory(expenses);
	} catch (error) {
		console.error('Error message:', error);
		throw new Error('Get all expenses by category operation failed');
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
