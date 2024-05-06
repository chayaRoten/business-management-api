import mongoose from 'mongoose';

// const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_URL = 'mongodb://localhost:27017/Attorney'

mongoose.set('strictQuery', false);

main().catch((err) => console.log(err));

async function main(): Promise<void> {
  console.log('mongodb on http://localhost:27017/Attorney');
  await mongoose.connect(DATABASE_URL ?? '');
}
