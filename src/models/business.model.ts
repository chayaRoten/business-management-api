import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBusiness extends Document {
  name: string;
  about: string;
  address: string;
}

const businessSchema: Schema = new Schema({
  name: String,
  about: String,
  address: String,
});

const BusinessModel: Model<IBusiness> = mongoose.model<IBusiness>('business', businessSchema);

export { BusinessModel };
