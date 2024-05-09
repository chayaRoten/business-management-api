import { Request, Response } from 'express';
import { getServices } from '../services/services.service'

export const GetServices = async (req: Request, res: Response) => {
    const meeting = await getServices()
    res.send(meeting)
}