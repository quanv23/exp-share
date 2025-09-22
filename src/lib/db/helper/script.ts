/**
 * @hidden
 * @module
 */

import { Expense } from '../models/Expense';
import connectDB from './mongoose';
import mongoose from 'mongoose';

interface ExpenseInput {
	description: string;
	amount: mongoose.Types.Decimal128;
	category: mongoose.Types.ObjectId;
}

export default async function insertDummyData(): Promise<void> {
	await connectDB();
	const expenses: ExpenseInput[] = [
		{
			description: 'Groceries at Walmart',
			amount: mongoose.Types.Decimal128.fromString('76.49'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
		},
		{
			description: 'Coffee at Starbucks',
			amount: mongoose.Types.Decimal128.fromString('4.95'),
			category: new mongoose.Types.ObjectId('68507950886ef23c5be3db33'),
		},
		{
			description: 'Gas station refill',
			amount: mongoose.Types.Decimal128.fromString('53.20'),
			category: new mongoose.Types.ObjectId('6850796e886ef23c5be3db34'),
		},
		{
			description: 'Lunch at Subway',
			amount: mongoose.Types.Decimal128.fromString('10.99'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
		},
		{
			description: 'Uber ride to office',
			amount: mongoose.Types.Decimal128.fromString('18.75'),
			category: new mongoose.Types.ObjectId('6850796e886ef23c5be3db34'),
		},
		{
			description: 'Movie night ticket',
			amount: mongoose.Types.Decimal128.fromString('14.50'),
			category: new mongoose.Types.ObjectId('68507950886ef23c5be3db33'),
		},
		{
			description: 'Gym membership',
			amount: mongoose.Types.Decimal128.fromString('39.99'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
		},
		{
			description: 'Dinner at local bistro',
			amount: mongoose.Types.Decimal128.fromString('27.85'),
			category: new mongoose.Types.ObjectId('68507950886ef23c5be3db33'),
		},
		{
			description: 'Train ticket',
			amount: mongoose.Types.Decimal128.fromString('9.25'),
			category: new mongoose.Types.ObjectId('6850796e886ef23c5be3db34'),
		},
		{
			description: 'Books from Amazon',
			amount: mongoose.Types.Decimal128.fromString('22.10'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
		},
	];
	await Expense.deleteMany({});
	await Expense.insertMany(expenses);
}
