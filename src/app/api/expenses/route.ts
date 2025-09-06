/**
 * API route that contains the HTTP methods for interacting with expenses
 * @module
 */

import { getAllExpensesByCategory } from '@/lib/db/expenses';
import { NextResponse } from 'next/server';

// Gets all categories
export async function GET(): Promise<Response> {
	const expenses = await getAllExpensesByCategory();
	return NextResponse.json(expenses);
}
