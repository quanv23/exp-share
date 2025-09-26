/**
 * API route that contains the HTTP methods for interacting with expenses grouped by category
 * @module
 */

import { getExpensesByCategory } from '@/lib/db/expenses';
import { NextRequest, NextResponse } from 'next/server';

// Get all expenses grouped by category and filtered by the given parameters
export async function GET(req: NextRequest): Promise<Response> {
	try {
		// Gets the search parameters to pass to the query
		const { searchParams } = new URL(req.url);
		const from: string | null = searchParams.get('from');
		const to: string | null = searchParams.get('to');
		const isExpense: string | null = searchParams.get('isExpense');

		const expenses = await getExpensesByCategory(from, to, isExpense);
		return NextResponse.json(expenses, { status: 200 });
	} catch (error) {
		return NextResponse.json({}, { status: 400 });
	}
}
