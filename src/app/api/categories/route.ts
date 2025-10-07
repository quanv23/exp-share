/**
 * API route that contains the HTTP methods for interacting with cateogories
 * @module
 */

import {
	addCategory,
	deleteCategory,
	editCategory,
	getAllCategories,
	getCategoryById,
	StringCategory,
} from '@/lib/db/categories';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Gets categories from the db
 */
export async function GET(req: NextRequest): Promise<Response> {
	try {
		const { searchParams } = new URL(req.url);
		let res: StringCategory[] = [];

		// If no search parameters are given get all categories
		if (!searchParams.toString()) {
			res = await getAllCategories();
		} else {
			// If the id is given get the category by id
			const categoryId: string | null = searchParams.get('categoryId');
			const data: StringCategory = await getCategoryById(categoryId!);
			res = [data];
		}

		return NextResponse.json(res, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json({}, { status: 400 });
	}
}

/**
 * Adds one category to the db
 */
export async function POST(req: NextRequest): Promise<Response> {
	try {
		const { newCategory } = await req.json();
		await addCategory(newCategory);
		return NextResponse.json(true, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json(false, { status: 400 });
	}
}

/**
 * Edits a category by id
 */
export async function PUT(req: NextRequest): Promise<NextResponse> {
	try {
		const { newCategory } = await req.json();
		await editCategory(newCategory);
		return NextResponse.json(true, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json(false, { status: 400 });
	}
}

/**
 * Deletes a category by id
 */
export async function DELETE(req: NextRequest) {
	try {
		const { id } = await req.json();
		await deleteCategory(id);
		return NextResponse.json(true, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json(false, { status: 400 });
	}
}
