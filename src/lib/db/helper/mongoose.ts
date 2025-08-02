/**
 * Contans the connection string and provides the function for connecting to MongoDB
 * @module
 */

import mongoose from 'mongoose';

type EnvVariable = string | undefined;
const MONGODB_URI: EnvVariable = process.env.MONGODB_URI;

// Checks URI exists
if (!MONGODB_URI) {
	throw new Error('Missing MONGODB_URI environment variable');
}

/**
 * Establishes a connection to MongoDB using Mongoose.
 * Prevents dupicate connections if already connected.
 */
export async function connectDB(): Promise<void> {
	if (mongoose.connection.readyState === 1) {
		console.log('Mongoose connection already exists');
	} else {
		await mongoose.connect(MONGODB_URI!);
		console.log('Mongoose connected');
	}
}

export default connectDB;
