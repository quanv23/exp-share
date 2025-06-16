import connectDB from './mongoose';
import { Expense } from './models/Expense';
import { Category } from './models/Category';

/**
 * <Summary> Converts the expense properties into usable types by JS
 * <Return> Returns an object matching the properties of an expense but converts the ObjectIds and Decimal128
 */
function cleanExpense(expense) {
	return {
		id: expense._id.toString(),
		description: expense.description,
		amount: parseFloat(expense.amount.toString()),
		category: {
			id: expense.category._id.toString(),
			name: expense.category.name,
			colour: expense.category.colour,
		},
		createdAt: expense.createdAt,
	};
}

/**
 * <Summary> Gets all expenses
 */
export async function getAllExpenses() {
	await connectDB();
	const raw = await Expense.find().populate('category');
	return raw.map((expense) => cleanExpense(expense));
}
