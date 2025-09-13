/**
 * API route that contains the HTTP methods for interacting with expenses
 * @module
 */

import { getAllExpensesByCategory } from '@/lib/db/expenses';
import { NextRequest, NextResponse } from 'next/server';

// Gets all categories
export async function GET(req: NextRequest): Promise<Response> {
	const { searchParams } = new URL(req.url);

	// Gets the search parameters to pass to the query
	const from: string | null = searchParams.get('from');
	const to: string | null = searchParams.get('to');
	const isExpense: string | null = searchParams.get('isExpense');

	const expenses = await getAllExpensesByCategory(from, to, isExpense);
	return NextResponse.json(expenses);
}
