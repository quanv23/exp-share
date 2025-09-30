/**
 * API route that contains the HTTP methods for interacting with expenses grouped by category
 * @module
 */

import {
	getCategoriesWithExpenses,
	StringCategoryWithExpenses,
} from '@/lib/db/categories';
import { NextRequest, NextResponse } from 'next/server';

// Get categories joined with their expenses
export async function GET(req: NextRequest) {
	try {
		// Gets the search parameters to pass to the query
		const { searchParams } = new URL(req.url);
		const from: string | null = searchParams.get('from');
		const to: string | null = searchParams.get('to');
		const isExpense: string | null = searchParams.get('isExpense');

		const expenses: StringCategoryWithExpenses[] =
			await getCategoriesWithExpenses(isExpense, from, to);
		return NextResponse.json(expenses, { status: 200 });
	} catch (error) {
		return NextResponse.json({}, { status: 400 });
	}
}
