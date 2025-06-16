import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
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

export const Expense =
	mongoose.models.Expense || mongoose.model('Expense', expenseSchema);
