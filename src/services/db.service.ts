import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const url = process.env.DB_CONNECTION;

mongoose.set('strictQuery', false);

main().catch((err) => console.log(err));

async function main(): Promise<void> {
  try {
    await mongoose.connect(url || '');
    console.log('Connected to MongoDB successfully!');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

