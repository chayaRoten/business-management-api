import mongoose, { Schema, Document, Model } from 'mongoose';


export interface IService {
    serviceName: string;
    cost: number
}

const serviceSchema: Schema = new Schema({
    serviceName: String,
    cost: Number,
});

const ServiceModel: Model<IService> = mongoose.model<IService>('services', serviceSchema);

export { ServiceModel };
