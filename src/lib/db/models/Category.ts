/**
 * Creates and exports the schema and model of a category
 * @module
 */

import mongoose from 'mongoose';

/**
 * Represents a database representation of a category
 */
export interface DatabaseCategory {
	/**
	 * The unique ID of a category
	 */
	_id: mongoose.Types.ObjectId;
	/**
	 * The name of the category
	 */
	name: string;
	/**
	 * The colour used to display the category. Should be a valid CSS color value
	 */
	colour: string;
}

const categorySchema: mongoose.Schema<DatabaseCategory> = new mongoose.Schema({
	name: String,
	colour: String,
});

/**
 * Mongoose model for interacting with 'Category' collection in MongoDB.
 * Provides methods like `.find()`, `.create()`, `.deleteOne()`, etc.
 */
export const Category: mongoose.Model<DatabaseCategory> =
	mongoose.models.Category || mongoose.model('Category', categorySchema);
