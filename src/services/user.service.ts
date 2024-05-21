import { UserModel } from '../models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const getUser = async (): Promise<string | unknown> => {
    const users = await UserModel.find().exec();
    return users
}

export const login = async (email: string, password: string, id: number, name: string): Promise<string> => {
    const users = await UserModel.find().exec();
    try {
        if (!(email && password && id && name)) {
            return 'All input is required';
        }
        let token = ""
        const user = users.find(async x => await bcrypt.compare(password, x.password) && x.email === email);
        if (user) {
            token = jwt.sign(
                { user_id: user?.id, name, email },
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
        console.log(err);
        return 'Error occurred during login';
    }
};

export const register = async (email: string, password: string, id: number, name: string): Promise<string | undefined> => {
    const users = await UserModel.find().exec();
    try {
        if (!(email && password && name && id)) {
            return 'All input is required';
        }

        const oldUser = users.find(x => x.password === password && x.email === email);

        if (oldUser) {
            return 'User Already Exist. Please Login';
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = {
            name,
            id,
            email,
            password: encryptedPassword,
        };

        const token = jwt.sign(
            { user_id: user?.id, name, email },
            process.env.TOKEN_KEY || '',
            {
                expiresIn: '2h'
            }
        );
        try {
            await UserModel.insertMany(user);
        } catch (err) {
            console.error(err);
            return 'Error occurred during signup';
        }
        return token;
    } catch (err) {
        console.log(err);
        return 'Error occurred during signup';
    }
};
