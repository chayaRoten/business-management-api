import { UserModel } from '../models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

export const getUsers = async (): Promise<string | unknown> => {
    const users = await UserModel.find().exec();
    return users
}

export const signin = async (email: string, password: string, username: string): Promise<string> => {
    try {
        const user = await UserModel.findOne({ email, username }).exec();
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                { user_id: user.id, username, email: user.email, role: user.role },
                process.env.TOKEN_KEY || '',
                {
                    expiresIn: '2h'
                }
            );
            return `${token}`;
        } else {
            return 'Invalid Credentials';
        }
    } catch (err) {
        throw new Error('Error occurred during login')
    }
};





export const signup = async (email: string, password: string, username: string): Promise<string | undefined> => {
    try {
        if (!(email && password && username)) {
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
            username,
            id: newId,
            email,
            password: encryptedPassword,
            role: 'user'
        };

        await UserModel.insertMany(user);
        const token = jwt.sign(
            { user_id: user?.id, username, email, role: user?.role },
            process.env.TOKEN_KEY || '',
            {
                expiresIn: '2h'
            }
        );
        return `${token}`;
    } catch (err) {
        console.log(err);
        return 'Error occurred during signup';
    }
};
