/**
 * API route that contains the HTTP methods for interacting with categories
 * @module
 */

import { StringCategory, getAllCategories } from '@/lib/db/categories';
import { NextResponse } from 'next/server';

// Gets all categories
export async function GET(): Promise<Response> {
	const categories: StringCategory[] = await getAllCategories();
	return NextResponse.json(categories);
}
