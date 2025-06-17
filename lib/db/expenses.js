import connectDB from './mongoose';
import { Expense } from './models/Expense';
import { Category } from './models/Category'; // Must import for .populate to work

/**
 * <Summary> Converts the expense properties into usable types by JS
 * <Return> Returns an object matching the properties of an expense but converts the ObjectIds and Decimal128
 */
function cleanExpense(expense) {
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
 * <Summary> Takes date of form YYYY-MM-DD and cleans data to be interpreted as local time
 * <Return> Returns a date object interpeted as local time instead of UTC
 */
function cleanDate(dateString) {
	const [year, month, date] = dateString.split('-').map(Number);
	return new Date(year, month - 1, date);
}

/**
 * <Summary> Gets all expenses
 */
export async function getAllExpenses() {
	await connectDB();
	const raw = await Expense.find().populate('category');
	return raw.map((expense) => cleanExpense(expense));
}

/**
 * <Summary> Creates new expense
 */
export async function addExpense(expense) {
	'use server';

	await connectDB();
	await Expense.create(expense);
}

/**
 * <Summary> Edits an expense by id
 */
export async function editExpense(newExpense) {
	'use server';

	await connectDB();
	const oldExpense = await Expense.findById(newExpense.id);
	oldExpense.description = newExpense.description;
	oldExpense.amount = newExpense.amount;
	oldExpense.category = newExpense.category;
	oldExpense.createdAt = cleanDate(newExpense.createdAt);
	await oldExpense.save();
}
