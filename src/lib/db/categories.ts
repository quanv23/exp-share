/**
 * Provides the CRUD functions for interacting with categories in the db.
 * Imports the category model to gain access to the functions
 * @module
 */

import connectDB from './helper/mongoose';
import { Category, DatabaseCategory } from './models/Category';

/**
 * Represents a category with string values
 */
export interface StringCategory {
	id: string;
	name: string;
	colour: string;
}

/**
 * Converts the database representation of a category into a usuable string representation
 * @param category A database representation of a category
 * @returns A string value representation of a category
 */
function cleanCategory(category: DatabaseCategory): StringCategory {
	return {
		id: category._id.toString(),
		name: category.name,
		colour: category.colour,
	};
}

/**
 * Gets all categories from the db and cleans them returning a usuable string value representation
 * @returns A promise of a all categories in the db as a string value representation
 */
export async function getAllCategories(): Promise<StringCategory[]> {
	try {
		// Connects, find, cleans, and returns all categories
		await connectDB();
		const raw: DatabaseCategory[] = await Category.find();
		return raw.map((category) => cleanCategory(category));
	} catch (error) {
		console.error('Error message: ', error);
		throw new Error('Get all categories operation failed');
	}
}

/**
 * Gets a sinlge category by id from the db and cleans it to a string value representation
 * @param categoryId The id of the category to fetch from the db
 * @returns A promise of the categroy matching the given category id with string values
 */
export async function getCategoryById(
	categoryId: string
): Promise<StringCategory> {
	try {
		// Connects, finds, cleans, and returns the single category if found
		await connectDB();
		const raw: DatabaseCategory | null = await Category.findById(categoryId);

		if (raw) {
			return cleanCategory(raw);
		} else {
			throw new Error(`No category with this id exists (${categoryId})`);
		}
	} catch (error) {
		console.error('Error message: ', error);
		throw new Error('Get category by Id operation failed');
	}
}
