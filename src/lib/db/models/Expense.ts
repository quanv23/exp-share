/**
 * Creates and exports the model and schema of an expense
 * @module
 */

import mongoose from 'mongoose';
import { DatabaseCategory } from './Category';

/**
 * Represents a database representation of an expense
 */
export interface DatabaseExpense {
	/**
	 * The unique ID of an expenses
	 */
	_id: mongoose.Types.ObjectId;
	/**
	 * The description/name of the expense.
	 */
	description: string;
	/**
	 * The amount of the expense can be negative or positive.
	 */
	amount: mongoose.Types.Decimal128;
	/**
	 * The associated category for this expense.
	 */
	category: mongoose.Types.ObjectId;
	/**
	 * Date it was created, and is auto generated on creation.
	 */
	createdAt: Date;
}

const expenseSchema: mongoose.Schema<DatabaseExpense> = new mongoose.Schema({
	description: String,
	amount: mongoose.Types.Decimal128,
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category',
	},
	createdAt: {
		type: Date,
		default: () => Date.now(),
	},
});

/**
 * Mongoose model for interacting with expense collection in MongoDB.
 * Provides methods for interacting with the db.
 */
export const Expense: mongoose.Model<DatabaseExpense> =
	mongoose.models.Expense || mongoose.model('Expense', expenseSchema);
