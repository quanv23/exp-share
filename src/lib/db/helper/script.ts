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
		// September
		{
			description: 'Daily Expense - Sep 1',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-09-01'),
		},
		{
			description: 'Daily Expense - Sep 2',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-09-02'),
		},
		{
			description: 'Daily Expense - Sep 3',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-09-03'),
		},
		{
			description: 'Daily Expense - Sep 4',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-09-04'),
		},
		{
			description: 'Daily Expense - Sep 5',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-09-05'),
		},
		{
			description: 'Daily Expense - Sep 6',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-09-06'),
		},
		{
			description: 'Daily Expense - Sep 7',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-09-07'),
		},
		{
			description: 'Daily Expense - Sep 8',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-09-08'),
		},
		{
			description: 'Daily Expense - Sep 9',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-09-09'),
		},
		{
			description: 'Daily Expense - Sep 10',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-09-10'),
		},
		{
			description: 'Daily Expense - Sep 11',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-09-11'),
		},
		{
			description: 'Daily Expense - Sep 12',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-09-12'),
		},
		{
			description: 'Daily Expense - Sep 13',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-09-13'),
		},
		{
			description: 'Daily Expense - Sep 14',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-09-14'),
		},
		{
			description: 'Daily Expense - Sep 15',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-09-15'),
		},
		{
			description: 'Daily Expense - Sep 16',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-09-16'),
		},
		{
			description: 'Daily Expense - Sep 17',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-09-17'),
		},
		{
			description: 'Daily Expense - Sep 18',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-09-18'),
		},
		{
			description: 'Daily Expense - Sep 19',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-09-19'),
		},
		{
			description: 'Daily Expense - Sep 20',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-09-20'),
		},
		{
			description: 'Daily Expense - Sep 21',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-09-21'),
		},
		{
			description: 'Daily Expense - Sep 22',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-09-22'),
		},
		{
			description: 'Daily Expense - Sep 23',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-09-23'),
		},
		{
			description: 'Daily Expense - Sep 24',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-09-24'),
		},
		{
			description: 'Daily Expense - Sep 25',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-09-25'),
		},
		{
			description: 'Daily Expense - Sep 26',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-09-26'),
		},
		{
			description: 'Daily Expense - Sep 27',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-09-27'),
		},
		{
			description: 'Daily Expense - Sep 28',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-09-28'),
		},
		{
			description: 'Daily Expense - Sep 29',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-09-29'),
		},
		{
			description: 'Daily Expense - Sep 30',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-09-30'),
		},

		// October
		{
			description: 'Daily Expense - Oct 1',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-10-01'),
		},
		{
			description: 'Daily Expense - Oct 2',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-10-02'),
		},
		{
			description: 'Daily Expense - Oct 3',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-10-03'),
		},
		{
			description: 'Daily Expense - Oct 4',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-10-04'),
		},
		{
			description: 'Daily Expense - Oct 5',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-10-05'),
		},
		{
			description: 'Daily Expense - Oct 6',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-10-06'),
		},
		{
			description: 'Daily Expense - Oct 7',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-10-07'),
		},
		{
			description: 'Daily Expense - Oct 8',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-10-08'),
		},
		{
			description: 'Daily Expense - Oct 9',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-10-09'),
		},
		{
			description: 'Daily Expense - Oct 10',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-10-10'),
		},
		{
			description: 'Daily Expense - Oct 11',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-10-11'),
		},
		{
			description: 'Daily Expense - Oct 12',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-10-12'),
		},
		{
			description: 'Daily Expense - Oct 13',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-10-13'),
		},
		{
			description: 'Daily Expense - Oct 14',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-10-14'),
		},
		{
			description: 'Daily Expense - Oct 15',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-10-15'),
		},
		{
			description: 'Daily Expense - Oct 16',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-10-16'),
		},
		{
			description: 'Daily Expense - Oct 17',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-10-17'),
		},
		{
			description: 'Daily Expense - Oct 18',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-10-18'),
		},
		{
			description: 'Daily Expense - Oct 19',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-10-19'),
		},
		{
			description: 'Daily Expense - Oct 20',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-10-20'),
		},
		{
			description: 'Daily Expense - Oct 21',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-10-21'),
		},
		{
			description: 'Daily Expense - Oct 22',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-10-22'),
		},
		{
			description: 'Daily Expense - Oct 23',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-10-23'),
		},
		{
			description: 'Daily Expense - Oct 24',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-10-24'),
		},
		{
			description: 'Daily Expense - Oct 25',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-10-25'),
		},
		{
			description: 'Daily Expense - Oct 26',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-10-26'),
		},
		{
			description: 'Daily Expense - Oct 27',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-10-27'),
		},
		{
			description: 'Daily Expense - Oct 28',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-10-28'),
		},
		{
			description: 'Daily Expense - Oct 29',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-10-29'),
		},
		{
			description: 'Daily Expense - Oct 30',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-10-30'),
		},
		{
			description: 'Daily Expense - Oct 31',
			amount: mongoose.Types.Decimal128.fromString('100'),
			category: new mongoose.Types.ObjectId('684f8018d4fc9b7091981426'),
			createdAt: new Date('2025-10-31'),
		},
	];
	await Expense.deleteMany({});
	// await Expense.insertMany(expenses);
}
