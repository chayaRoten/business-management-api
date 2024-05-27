import mongoose, { Schema, Model } from 'mongoose';


export interface IUser {
    username: string;
    id: number;
    email:string;
    password:string;
    role:string;
}

const userSchema: Schema = new Schema({
    username: String,
    id: Number,
    email:String,
    password:String,
    role: String,
});

const UserModel: Model<IUser> = mongoose.model<IUser>('users', userSchema);

export { UserModel };
