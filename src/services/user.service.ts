import { UserModel } from '../models/user.model';

export const getUser = async (): Promise<string | any> => {
    const users = await UserModel.find().exec();
    console.log(users);
    return users
}
