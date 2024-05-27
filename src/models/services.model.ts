import mongoose, { Schema, Model } from 'mongoose';


export interface IService {
    name: string;
    cost: number;
    id: number
}

const serviceSchema: Schema = new Schema({
    name: String,
    cost: Number,
    id:Number
});

const ServiceModel: Model<IService> = mongoose.model<IService>('services', serviceSchema);

export { ServiceModel };
