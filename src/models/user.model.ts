import mongoose, { Schema, Document, Model } from 'mongoose';


export interface IUser {
    name: string;
    id: number
}

const userSchema: Schema = new Schema({
    name: String,
    id: Number,
});

const UserModel: Model<IUser> = mongoose.model<IUser>('users', userSchema);

export { UserModel };
