import mongoose from 'mongoose';

// const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_URL = 'mongodb://localhost:27017/Attorney'

mongoose.set('strictQuery', false);

main().catch((err) => console.log(err));

async function main(): Promise<void> {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log('Connected to MongoDB successfully!');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

