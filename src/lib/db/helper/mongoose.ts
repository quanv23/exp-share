import mongoose from 'mongoose';

type EnvVariable = string | undefined;
const MONGODB_URI: EnvVariable = process.env.MONGODB_URI;

// Checks URI exists
if (!MONGODB_URI) {
	throw new Error('Missing MONGODB_URI environment variable');
}

export default async function connectDB() {
	if (mongoose.connection.readyState === 1) {
		console.log('Mongoose connection already exists');
	} else {
		await mongoose.connect(MONGODB_URI!);
		console.log('Mongoose connected');
	}
}
