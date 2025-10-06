/**
 * Provides the CRUD functions for interacting with categories in the db.
 * Imports the category model to gain access to the functions
 * @module
 */

import {
	cleanExpense,
	PopulatedDatabaseExpense,
	StringExpense,
} from './expenses';
import connectDB from './helper/mongoose';
import insertDummyData from './helper/script';
import { Category, DatabaseCategory } from './models/Category';
import mongoose from 'mongoose';

/**
 * Represents a category with string values
 */
export interface StringCategory {
	id: string;
	name: string;
	colour: string;
}

/**
 * Represents a category inputted by the user for adding/editing
 */
export interface UserInputCategory {
	id?: string;
	name: string;
	colour: string;
}

/**
 * Represents a category joined with it's expenses
 */
export interface CategoryWithExpenses {
	_id: mongoose.Types.ObjectId;
	name: string;
	colour: string;
	total: mongoose.Types.Decimal128;
	expenses: PopulatedDatabaseExpense[];
}

/**
 * Represents a category joined with it's expenses but all fields are a string
 */
export interface StringCategoryWithExpenses {
	id: string;
	name: string;
	colour: string;
	total: string;
	expenses: StringExpense[];
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
 * Converts categories with expenses into a usable string value representation
 * @param category A list of categories joined with their expenses in their db representation
 * @returns A string value representation of the entire given list of category groups
 */
function cleanCategoryWithExpenses(
	category: CategoryWithExpenses[]
): StringCategoryWithExpenses[] {
	const result: StringCategoryWithExpenses[] = [];

	// Converts each category group into a string representation
	category.forEach((categoryGroup: CategoryWithExpenses) => {
		// Cleans all the expenses first
		const stringExpenses: StringExpense[] = categoryGroup.expenses.map(
			(expense: PopulatedDatabaseExpense) => cleanExpense(expense)
		);

		// Converts remaining category fields
		const stringCategoryGroup: StringCategoryWithExpenses = {
			id: categoryGroup._id.toString(),
			name: categoryGroup.name,
			colour: categoryGroup.colour,
			total: categoryGroup.total.toString(),
			expenses: stringExpenses,
		};

		// Adds the converted group to the return list
		result.push(stringCategoryGroup);
	});
	return result;
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

/**
 * Gets all categories along with their expenses, and filters the group
 * @param isExpense filters category groups by whether they have a positive or negative total
 * @param from filters the expenses from a certain date
 * @param to filters the expenses to a certain date
 * @param categoryId filters the categories by id
 */
export async function getCategoriesWithExpenses(
	isExpense: string | null,
	from: string | null,
	to: string | null,
	categoryId: string | null = null
) {
	// Dynamically creates expenses filter depending if a date range is given
	const expenseFilter: any[] = [{ $eq: ['$category', '$$categoryId'] }];
	if (from && to && from !== 'undefined' && to !== 'undefined') {
		// Creates the from and to dates
		const fromDate: Date = new Date(from!);
		fromDate.setHours(0, 0, 0, 0); // Sets time to min and max

		const toDate: Date = new Date(to!);
		toDate.setHours(23, 59, 59, 999);

		expenseFilter.push({ $gte: ['$createdAt', fromDate] });
		expenseFilter.push({ $lte: ['$createdAt', toDate] });
	}

	// Dynamically builds category filters if id is given
	const categoryFilter: any = {
		total: isExpense === 'true' ? { $lte: 0 } : { $gte: 0 },
	};

	if (categoryId) {
		categoryFilter._id = new mongoose.Types.ObjectId(categoryId);
	}

	try {
		await connectDB();

		const categories = await Category.aggregate([
			{
				// Joins expenses to category by id
				$lookup: {
					from: 'expenses',
					let: { categoryId: '$_id' },
					// Filters the joined expenses by the date range parameters
					pipeline: [
						{
							$match: {
								$expr: {
									$and: expenseFilter,
								},
							},
						},
					],
					as: 'expenses',
				},
			},
			{
				// Calculates the total of each category
				$addFields: {
					total: { $sum: '$expenses.amount' },
				},
			},
			{
				// Filters the grouped categories by expense/income
				// Must come after the grouping because we want to filter whether the category is pos/neg, not the expenses
				$match: categoryFilter,
			},
		]);
		return cleanCategoryWithExpenses(categories);
	} catch (error) {
		console.error('Error message: ', error);
		throw new Error('Get categories with expenses operation failed');
	}
}

/**
 * Adds a category to the db
 * @param category The category to be added to the db
 */
export async function addCategory(category: UserInputCategory) {
	'use server';

	try {
		// Connects to db, and creates new category
		await connectDB();
		await Category.create(category);
	} catch (error) {
		console.error('Error message: ', error);
		throw new Error('Add category operation failed');
	}
}

/**
 * Edits a category by id in the db
 * @param category The new category data to update
 */
export async function editCategory(category: UserInputCategory) {
	'use server';

	try {
		await connectDB();

		// Fetches old category to edit
		const oldCategory = await Category.findById(category.id);
		if (!oldCategory) throw new Error();

		// Updates old category fields and saves it to preserve schema typing
		oldCategory.name = category.name;
		oldCategory.colour = category.colour;
		await oldCategory.save();
	} catch (error) {
		console.error(error);
		throw new Error('Edit category operation failed');
	}
}

/**
 * Deletes a category by id in the db
 * @param id The id of the category to be deleted
 */
export async function deleteCategory(id: string) {
	'use server';

	try {
		// Connects to db and deletes the category
		await connectDB();
		await Category.deleteOne({ _id: id });
	} catch (error) {
		console.error(error);
		throw new Error('Delete category operation failed');
	}
}
