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
	const expenses = [
		{
			description: 'Grocery shopping',
			amount: mongoose.Types.Decimal128.fromString('-85.75'),
			category: new mongoose.Types.ObjectId('68e327b386c678f3f7c30347'),
			createdAt: new Date('2025-01-15T14:32:00Z'),
		},
		{
			description: 'Salary payment',
			amount: mongoose.Types.Decimal128.fromString('2500.00'),
			category: new mongoose.Types.ObjectId('68e426509c258ca0e7a4edd7'),
			createdAt: new Date('2025-01-31T09:00:00Z'),
		},
		{
			description: 'Coffee shop visit',
			amount: mongoose.Types.Decimal128.fromString('-6.50'),
			category: new mongoose.Types.ObjectId('68e327b786c678f3f7c3034a'),
			createdAt: new Date('2025-02-03T11:12:00Z'),
		},
		{
			description: 'Monthly rent',
			amount: mongoose.Types.Decimal128.fromString('-1400.00'),
			category: new mongoose.Types.ObjectId('68e327b386c678f3f7c30347'),
			createdAt: new Date('2025-02-01T13:00:00Z'),
		},
		{
			description: 'Freelance income',
			amount: mongoose.Types.Decimal128.fromString('600.00'),
			category: new mongoose.Types.ObjectId('68e426509c258ca0e7a4edd7'),
			createdAt: new Date('2025-02-10T10:00:00Z'),
		},
		{
			description: 'Restaurant dinner',
			amount: mongoose.Types.Decimal128.fromString('-45.20'),
			category: new mongoose.Types.ObjectId('68e327b786c678f3f7c3034a'),
			createdAt: new Date('2025-03-05T20:45:00Z'),
		},
		{
			description: 'Online course fee',
			amount: mongoose.Types.Decimal128.fromString('-120.00'),
			category: new mongoose.Types.ObjectId('68e327b386c678f3f7c30347'),
			createdAt: new Date('2025-03-12T15:20:00Z'),
		},
		{
			description: 'Stock dividend',
			amount: mongoose.Types.Decimal128.fromString('50.75'),
			category: new mongoose.Types.ObjectId('68e426509c258ca0e7a4edd7'),
			createdAt: new Date('2025-03-18T18:00:00Z'),
		},
		{
			description: 'Gas refill',
			amount: mongoose.Types.Decimal128.fromString('-70.10'),
			category: new mongoose.Types.ObjectId('68e327b786c678f3f7c3034a'),
			createdAt: new Date('2025-04-02T09:45:00Z'),
		},
		{
			description: 'Electricity bill',
			amount: mongoose.Types.Decimal128.fromString('-95.30'),
			category: new mongoose.Types.ObjectId('68e327b386c678f3f7c30347'),
			createdAt: new Date('2025-04-09T16:15:00Z'),
		},
		{
			description: 'Gift from friend',
			amount: mongoose.Types.Decimal128.fromString('100.00'),
			category: new mongoose.Types.ObjectId('68e426509c258ca0e7a4edd7'),
			createdAt: new Date('2025-04-25T19:50:00Z'),
		},
		{
			description: 'Streaming subscription',
			amount: mongoose.Types.Decimal128.fromString('-12.99'),
			category: new mongoose.Types.ObjectId('68e327b786c678f3f7c3034a'),
			createdAt: new Date('2025-05-01T00:05:00Z'),
		},
		{
			description: 'Concert ticket',
			amount: mongoose.Types.Decimal128.fromString('-75.00'),
			category: new mongoose.Types.ObjectId('68e327b386c678f3f7c30347'),
			createdAt: new Date('2025-05-14T21:10:00Z'),
		},
		{
			description: 'Bonus payout',
			amount: mongoose.Types.Decimal128.fromString('800.00'),
			category: new mongoose.Types.ObjectId('68e426509c258ca0e7a4edd7'),
			createdAt: new Date('2025-05-31T17:00:00Z'),
		},
		{
			description: 'Gym membership renewal',
			amount: mongoose.Types.Decimal128.fromString('-250.00'),
			category: new mongoose.Types.ObjectId('68e327b786c678f3f7c3034a'),
			createdAt: new Date('2025-06-10T07:30:00Z'),
		},
		{
			description: 'Sold old laptop',
			amount: mongoose.Types.Decimal128.fromString('400.00'),
			category: new mongoose.Types.ObjectId('68e426509c258ca0e7a4edd7'),
			createdAt: new Date('2025-06-22T11:45:00Z'),
		},
		{
			description: 'Phone bill payment',
			amount: mongoose.Types.Decimal128.fromString('-60.00'),
			category: new mongoose.Types.ObjectId('68e327b386c678f3f7c30347'),
			createdAt: new Date('2025-07-03T08:20:00Z'),
		},
		{
			description: 'Birthday gift purchase',
			amount: mongoose.Types.Decimal128.fromString('-30.00'),
			category: new mongoose.Types.ObjectId('68e327b786c678f3f7c3034a'),
			createdAt: new Date('2025-07-09T15:00:00Z'),
		},
		{
			description: 'Freelance project payment',
			amount: mongoose.Types.Decimal128.fromString('1200.00'),
			category: new mongoose.Types.ObjectId('68e426509c258ca0e7a4edd7'),
			createdAt: new Date('2025-07-15T10:00:00Z'),
		},
		{
			description: 'Car maintenance',
			amount: mongoose.Types.Decimal128.fromString('-400.00'),
			category: new mongoose.Types.ObjectId('68e327b386c678f3f7c30347'),
			createdAt: new Date('2025-07-29T13:15:00Z'),
		},
		{
			description: 'Bookstore purchase',
			amount: mongoose.Types.Decimal128.fromString('-22.45'),
			category: new mongoose.Types.ObjectId('68e327b786c678f3f7c3034a'),
			createdAt: new Date('2025-08-04T17:00:00Z'),
		},
		{
			description: 'Interest income',
			amount: mongoose.Types.Decimal128.fromString('15.00'),
			category: new mongoose.Types.ObjectId('68e426509c258ca0e7a4edd7'),
			createdAt: new Date('2025-08-07T09:30:00Z'),
		},
		{
			description: 'Clothing store purchase',
			amount: mongoose.Types.Decimal128.fromString('-120.00'),
			category: new mongoose.Types.ObjectId('68e327b386c678f3f7c30347'),
			createdAt: new Date('2025-08-20T14:45:00Z'),
		},
		{
			description: 'Freelance bonus',
			amount: mongoose.Types.Decimal128.fromString('300.00'),
			category: new mongoose.Types.ObjectId('68e426509c258ca0e7a4edd7'),
			createdAt: new Date('2025-09-01T12:00:00Z'),
		},
		{
			description: 'New headphones',
			amount: mongoose.Types.Decimal128.fromString('-80.00'),
			category: new mongoose.Types.ObjectId('68e327b786c678f3f7c3034a'),
			createdAt: new Date('2025-09-06T19:00:00Z'),
		},
		{
			description: 'Utility refund',
			amount: mongoose.Types.Decimal128.fromString('40.00'),
			category: new mongoose.Types.ObjectId('68e426509c258ca0e7a4edd7'),
			createdAt: new Date('2025-09-18T10:30:00Z'),
		},
		{
			description: 'Weekend trip expenses',
			amount: mongoose.Types.Decimal128.fromString('-230.50'),
			category: new mongoose.Types.ObjectId('68e327b386c678f3f7c30347'),
			createdAt: new Date('2025-10-03T21:10:00Z'),
		},
		{
			description: 'Investment profit',
			amount: mongoose.Types.Decimal128.fromString('500.00'),
			category: new mongoose.Types.ObjectId('68e426509c258ca0e7a4edd7'),
			createdAt: new Date('2025-10-10T08:00:00Z'),
		},
		{
			description: 'Coffee beans purchase',
			amount: mongoose.Types.Decimal128.fromString('-25.00'),
			category: new mongoose.Types.ObjectId('68e327b786c678f3f7c3034a'),
			createdAt: new Date('2025-11-02T11:10:00Z'),
		},
		{
			description: 'Medical checkup',
			amount: mongoose.Types.Decimal128.fromString('-150.00'),
			category: new mongoose.Types.ObjectId('68e327b386c678f3f7c30347'),
			createdAt: new Date('2025-11-19T09:00:00Z'),
		},
		{
			description: 'Sold old furniture',
			amount: mongoose.Types.Decimal128.fromString('180.00'),
			category: new mongoose.Types.ObjectId('68e426509c258ca0e7a4edd7'),
			createdAt: new Date('2025-12-04T13:40:00Z'),
		},
		{
			description: 'Holiday gifts',
			amount: mongoose.Types.Decimal128.fromString('-350.00'),
			category: new mongoose.Types.ObjectId('68e327b786c678f3f7c3034a'),
			createdAt: new Date('2025-12-18T18:30:00Z'),
		},
	];
	await Expense.deleteMany({});
	await Expense.insertMany(expenses);
}
