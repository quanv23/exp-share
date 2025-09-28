/**
 * API route that contains the HTTP methods for interacting with cateogories
 * @module
 */

import { addCategory, getAllCategories } from '@/lib/db/categories';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Gets all the categories from the db
 */
export async function GET(): Promise<Response> {
	try {
		const res = await getAllCategories();
		return NextResponse.json(res, { status: 200 });
	} catch (error) {
		return NextResponse.json({}, { status: 400 });
	}
}

/**
 * Adds one category to the db
 */
export async function POST(req: NextRequest): Promise<Response> {
	try {
		const { newCategory } = await req.json();
		console.log(newCategory);
		const res = await addCategory(newCategory);
		return NextResponse.json(true, { status: 200 });
	} catch (error) {
		return NextResponse.json(false, { status: 400 });
	}
}
