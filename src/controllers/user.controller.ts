import { Request, Response } from 'express';
import { getUsers, login, register } from '../services/user.service'


export const GetUser = async (req: Request, res: Response) => {
  try {
    const user = await getUsers()
    res.send(user)
  }
  catch (error: any) {
    console.error(`error in fetch user ${error.message}`);
    res.status(500).send('error in fetch user');
  }
}


export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body;
    const result = await login(email, password, name);
    res.send(result);
  } catch (error: any) {
    console.log(`error in log in ${error.message}`);
    res.status(500).send('error in log in');
  }
};

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body;
    const result = await register(email, password, name);
    res.send(result);
  } catch (error: any) {
    console.log(`error in sign in ${error.message}`);
    res.status(500).send('error in sign in');
  }
};
