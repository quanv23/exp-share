/**
 * API route that contains the HTTP methods for interacting with expenses
 * @module
 */

import {
	addExpense,
	deleteExpense,
	editExpense,
	getAllExpenses,
	getExpensesGroupedByDate,
	getExpenseTotals,
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

			// Depending on whether is expense is needed it gets the totals, the grouped expenses
			if (isExpense === 'null') {
				res = await getExpenseTotals();
			} else {
				res = await getExpensesGroupedByDate(isExpense);
			}
		}

		return NextResponse.json(res, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json({}, { status: 400 });
	}
}

/**
 * Adds an expense
 */
export async function POST(req: NextRequest): Promise<Response> {
	try {
		const { newExpense } = await req.json();
		await addExpense(newExpense);
		return NextResponse.json(true, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json(false, { status: 400 });
	}
}

/**
 * Deletes one expense by id
 */
export async function DELETE(req: NextRequest): Promise<Response> {
	try {
		const { id } = await req.json();
		await deleteExpense(id);
		return NextResponse.json(true, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json(false, { status: 400 });
	}
}

/**
 * Edits on expense by id
 */
export async function PATCH(req: NextRequest): Promise<Response> {
	try {
		const { newExpense } = await req.json();
		await editExpense(newExpense);
		return NextResponse.json(true, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json(false, { status: 400 });
	}
}
