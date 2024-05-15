import mongoose, { Schema, Document, Model } from 'mongoose';


export interface IUser {
    name: string;
    id: number;
    email:string;
    password:string;
}

const userSchema: Schema = new Schema({
    name: String,
    id: Number,
    email:String,
    password:String,
});

const UserModel: Model<IUser> = mongoose.model<IUser>('users', userSchema);

export { UserModel };
