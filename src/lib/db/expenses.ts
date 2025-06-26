import connectDB from './helper/mongoose';
import { Expense } from './models/Expense';
import { Category } from './models/Category'; // Must import for .populate to work
import { DatabaseCategory } from './categories';
import mongoose from 'mongoose';

interface DatabaseExpense {
	_id: mongoose.Types.ObjectId;
	description: string;
	amount: mongoose.Types.Decimal128;
	category: DatabaseCategory;
	createdAt: Date;
}

interface UserInputExpense {
	id?: string;
	description: string;
	amount: string;
	category: string;
	createdAt?: string;
}

interface StringExpense {
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
 * <Summary> Converts the expense properties into type string
 * <Return> Returns the converted expense as a StringExpense
 */
function cleanExpense(expense: DatabaseExpense): StringExpense {
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
 * <Summary> Takes date of form YYYY-MM-DD and creates a new date object of the same date to be interpreted as local time
 * <Return> Returns a date object interpeted as local time instead of UTC
 */
function cleanDate(dateString: string): Date {
	const [year, month, date] = dateString.split('-').map(Number);
	return new Date(year, month - 1, date);
}

/**
 * <Summary> Gets all expenses
 * <Return> Returns a list of expenses with string properties
 */
export async function getAllExpenses(): Promise<StringExpense[]> {
	await connectDB();
	const raw: DatabaseExpense[] = await Expense.find().populate('category');
	return raw.map((expense) => cleanExpense(expense));
}

/**
 * <Summary> Creates new expense
 */
export async function addExpense(expense: UserInputExpense): Promise<void> {
	'use server';

	await connectDB();
	await Expense.create(expense);
}

/**
 * <Summary> Edits an expense by id
 */
export async function editExpense(newExpense: UserInputExpense): Promise<void> {
	'use server';

	await connectDB();
	const oldExpense = await Expense.findById(newExpense.id!);
	oldExpense.description = newExpense.description;
	oldExpense.amount = newExpense.amount;
	oldExpense.category = newExpense.category;
	oldExpense.createdAt = cleanDate(newExpense.createdAt!);
	await oldExpense.save();
}

/**
 * <Summary> Deletes an expense by id
 */
export async function deleteExpense(id: string): Promise<void> {
	'use server';

	await connectDB();
	await Expense.deleteOne({ _id: id });
}
