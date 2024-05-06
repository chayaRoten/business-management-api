import mongoose, { Schema, Document, Model } from 'mongoose';


export interface IBusiness extends Document {
  name: string;
  services: string;
  address: string;
}

const businessSchema: Schema = new Schema({
  name: String,
  services: String,
  address: String,
});

const BusinessModel: Model<IBusiness> = mongoose.model<IBusiness>('business', businessSchema);

export { BusinessModel };
