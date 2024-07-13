import { UserModel } from '../models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

export const getUsers = async (): Promise<string | unknown> => {
    const users = await UserModel.find().exec();
    return users
}

export const getUserByName = async (name: string): Promise<number> => {
    const user = await UserModel.findOne({ username: name }).exec();
    return user?.id;
}

export const signin = async (email: string, password: string, username: string): Promise<string> => {
    try {
        const user = await UserModel.findOne({ email, username }).exec();
        if (!user) {
            return 'User not found';
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return 'Invalid password';
        }

        const token = jwt.sign(
            { user_id: user.id, username: user.username, email: user.email, role: user.role },
            process.env.TOKEN_KEY || '',
            {
                expiresIn: '2h'
            }
        );
        return token;
    } catch (err) {
        console.error('Error occurred during login:', err);
        throw new Error('Error occurred during login');
    }
};


export const signup = async (email: string, password: string, username: string): Promise<string | undefined> => {
    try {
        if (!(email && password && username)) {
            return 'All input is required';
        }

        const existingUser = await UserModel.findOne({ email, username }).exec();
        if (existingUser) {
            return 'User Already Exist. Please Login';
        }
        const lastUser = await UserModel.findOne().sort({ id: -1 }).exec();
        const newId = lastUser ? lastUser.id + 1 : 1;
        const encryptedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            username,
            id: newId,
            email,
            password: encryptedPassword,
            role: 'user'
        };

        await UserModel.insertMany(newUser);
        const token = jwt.sign(
            { user_id: newUser?.id, username, email, role: newUser?.role },
            process.env.TOKEN_KEY || '',
            {
                expiresIn: '2h'
            }
        );
        return token;
    } catch (err) {
        console.log(err);
        console.error('Error occurred during signup:', err);
        return 'Error occurred during signup';
    }
};



