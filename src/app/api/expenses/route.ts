/**
 * API route that contains the HTTP methods for interacting with expenses
 * @module
 */

import {
	getExpensesByCategory,
	deleteExpense,
	editExpense,
	getAllExpenses,
} from '@/lib/db/expenses';
import { NextRequest, NextResponse } from 'next/server';

// Gets all expenses
export async function GET(): Promise<Response> {
	try {
		const res = await getAllExpenses();
		return NextResponse.json(res, { status: 200 });
	} catch (error) {
		return NextResponse.json({}, { status: 400 });
	}
}

// Deletes one expense by id
export async function DELETE(req: NextRequest): Promise<Response> {
	try {
		const { id } = await req.json();
		const res = await deleteExpense(id);
		return NextResponse.json(true, { status: 200 });
	} catch (error) {
		return NextResponse.json(false, { status: 400 });
	}
}

// Edits on expense by id
export async function PATCH(req: NextRequest): Promise<Response> {
	try {
		const { newExpense } = await req.json();
		const res = await editExpense(newExpense);
		return NextResponse.json(true, { status: 200 });
	} catch (error) {
		return NextResponse.json(false, { status: 400 });
	}
}
