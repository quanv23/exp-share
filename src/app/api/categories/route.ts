/**
 * API route that contains the HTTP methods for interacting with cateogories
 * @module
 */

import { getAllCategories } from '@/lib/db/categories';
import { NextRequest, NextResponse } from 'next/server';

// Gets all categories from the db
export async function GET(): Promise<Response> {
	try {
		const res = await getAllCategories();
		return NextResponse.json(res, { status: 200 });
	} catch (error) {
		return NextResponse.json({}, { status: 400 });
	}
}
