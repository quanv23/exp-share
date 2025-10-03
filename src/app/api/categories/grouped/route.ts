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
		const categoryId: string | null = searchParams.get('categoryId');

		const expenses: StringCategoryWithExpenses[] =
			await getCategoriesWithExpenses(isExpense, from, to, categoryId);
		return NextResponse.json(expenses, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json({}, { status: 400 });
	}
}
