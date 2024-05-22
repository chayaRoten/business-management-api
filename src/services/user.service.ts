import { UserModel } from '../models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

export const getUsers = async (): Promise<string | unknown> => {
    const users = await UserModel.find().exec();
    return users
}

export const login = async (email: string, password: string, name: string): Promise<string> => {
    try {
        const user = await UserModel.findOne({ email, name }).exec();
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                { user_id: user.id, name: user.name, email: user.email },
                process.env.TOKEN_KEY || '',
                {
                    expiresIn: '2h'
                }
            );
            return token;
        } else {
            return 'Invalid Credentials';
        }
    } catch (err) {
        throw new Error('Error occurred during login')
    }
};





export const register = async (email: string, password: string, name: string): Promise<string | undefined> => {
    try {
        if (!(email && password && name)) {
            return 'All input is required';
        }

        const oldUser = await UserModel.findOne({ email }).exec();
        if (oldUser) {
            return 'User Already Exist. Please Login';
        }
        const lastUser = await UserModel.findOne().sort({ id: -1 }).exec();
        const newId = lastUser ? lastUser.id + 1 : 1;
        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = {
            name,
            id: newId,
            email,
            password: encryptedPassword,
        };

        await UserModel.insertMany(user);
        const token = jwt.sign(
            { user_id: user?.id, name, email },
            process.env.TOKEN_KEY || '',
            {
                expiresIn: '2h'
            }
        );
        return token;
    } catch (err) {
        console.log(err);
        return 'Error occurred during signup';
    }
};
