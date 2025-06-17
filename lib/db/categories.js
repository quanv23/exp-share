import connectDB from './mongoose';
import { Category } from './models/Category';

/**
 * <Summary> Converts the category properties into usable types by JS
 * <Return> Returns an object matching the properties of a category but converts the ObjectIds
 */
function cleanCategory(category) {
	return {
		id: category._id.toString(),
		name: category.name,
		colour: category.colour,
	};
}

/**
 * <Summary> Gets all categories and cleans them
 */
export async function getAllCategories() {
	await connectDB();
	const raw = await Category.find();
	return raw.map((category) => cleanCategory(category));
}
