/**
 * API route that contains the HTTP methods for interacting with expenses
 * @module
 */

import {
	deleteExpense,
	editExpense,
	getAllExpenses,
	getExpensesGroupedByDate,
} from '@/lib/db/expenses';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Gets all expenses
 */
export async function GET(req: NextRequest): Promise<Response> {
	try {
		// Gets the search parameters to pass to the query
		const { searchParams } = new URL(req.url);
		let res = [];

		// If no search parameters are given get all expenses
		if (!searchParams.toString()) {
			res = await getAllExpenses();
		} else {
			// Otherwise pull out the parameters and filter the expenses
			const isExpense: string | null = searchParams.get('isExpense');
			res = await getExpensesGroupedByDate(isExpense);
		}

		return NextResponse.json(res, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json({}, { status: 400 });
	}
}

/**
 * Deletes one expense by id
 */
export async function DELETE(req: NextRequest): Promise<Response> {
	try {
		const { id } = await req.json();
		const res = await deleteExpense(id);
		return NextResponse.json(true, { status: 200 });
	} catch (error) {
		return NextResponse.json(false, { status: 400 });
	}
}

/**
 * Edits on expense by id
 */
export async function PATCH(req: NextRequest): Promise<Response> {
	try {
		const { newExpense } = await req.json();
		const res = await editExpense(newExpense);
		return NextResponse.json(true, { status: 200 });
	} catch (error) {
		return NextResponse.json(false, { status: 400 });
	}
}
