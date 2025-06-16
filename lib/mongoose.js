import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

// Checks URI exists
if (!MONGODB_URI) {
	throw new Error('Missing MONGODB_URI environment variable');
}

export default async function connectDB() {
	await mongoose.connect(MONGODB_URI);
}
