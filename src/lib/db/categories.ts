import connectDB from './helper/mongoose';
import { Category } from './models/Category';
import mongoose from 'mongoose';

export interface DatabaseCategory {
	_id: mongoose.Types.ObjectId;
	name: string;
	colour: string;
}

interface StringCategory {
	id: string;
	name: string;
	colour: string;
}

/**
 * <Summary> Converts the category properties into usable types by JS
 * <Return> Returns an object matching the properties of a category but converts the ObjectIds
 */
function cleanCategory(category: DatabaseCategory): StringCategory {
	return {
		id: category._id.toString(),
		name: category.name,
		colour: category.colour,
	};
}

/**
 * <Summary> Gets all categories and cleans them
 */
export async function getAllCategories(): Promise<StringCategory[]> {
	await connectDB();
	const raw: DatabaseCategory[] = await Category.find();
	return raw.map((category) => cleanCategory(category));
}
