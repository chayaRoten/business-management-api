import { Request, Response } from 'express';
import { getUser , login , register } from '../services/user.service'

export const GetUser = async (req: Request, res: Response) => {
    const user = await getUser()
    res.send(user)
}


export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password , id , name } = req.body;
    const result = await login(email, password, id , name);
    res.send(result);
  };
  
  export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password , id , name } = req.body;
    const result = await register(email, password, id , name);
    res.send(result);
  };
  