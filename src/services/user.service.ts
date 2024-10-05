import { UserModel } from '../models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

export const getUsers = async (): Promise<string | unknown> => 
{
    try {
        const users = await UserModel.find().exec();
        return users;
    } catch (err) {
        console.error('Error occurred while fetching users:', err);
        throw new Error('Error occurred while fetching users');
    }
}

export const getUserByName = async (name: string): Promise<number> => 
{
    try {
        const user = await UserModel.findOne({ username: name }).exec();
        return user?.id || null;
    } catch (err) {
        console.error('Error occurred while fetching user by name:', err);
        throw new Error('Error occurred while fetching user by name');
    }
}

export const signin = async (email: string, password: string, username: string): Promise<string | null> =>
{
    try {
        const user = await UserModel.findOne({ email, username }).exec();
        if (!user) {
            throw new Error('User not found');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
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
        console.error('Error occurred during signup:', err);
        throw err;
    }
};

export const signup = async (email: string, password: string, username: string): Promise<string | undefined> => 
{
    try {
        if (!(email && password && username)) {
            throw new Error('All input is required');
        }

        const existingUser = await UserModel.findOne({ email, username }).exec();
        console.log('Existing user:', existingUser);

        if (existingUser) {
            throw new Error('User Already Exist. Please Login');
        }

        const lastUser = await UserModel.findOne().sort({ id: -1 }).exec();

        const newId = lastUser ? lastUser.id + 1 : 1;
        const encryptedPassword = await bcrypt.hash(password, 10);
        console.log('Encrypted password:', encryptedPassword);

        const newUser = {
            username,
            id: newId,
            email,
            password: encryptedPassword,
            role: 'user'
        };

        await UserModel.insertMany(newUser);
        console.log('User inserted:', newUser);

        const token = jwt.sign(
            { user_id: newUser?.id, username, email, role: newUser?.role },
            process.env.TOKEN_KEY || '',
            { expiresIn: '2h' }
        );
        return token;
    } catch (err) {
        console.error('Error occurred during signup:', err);
        throw err;
    }
};