import { Request, Response } from 'express';
import { getBusiness } from '../services/business.service'

export const GetBusiness = async (req: Request, res: Response) => {
    const business = await getBusiness()
    res.send(business)
}