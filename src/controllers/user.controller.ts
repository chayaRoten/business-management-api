import { Request, Response } from 'express';
import { getUser } from '../services/user.service'

export const GetUser = async (req: Request, res: Response) => {
    const user = await getUser()
    res.send(user)
}