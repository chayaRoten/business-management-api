import { Request, Response } from 'express';
import { getBusiness, addBusiness, updateBusiness } from '../services/business.service'

export const GetBusiness = async (req: Request, res: Response) => {
  const business = await getBusiness()
  res.send(business)
}

export const AddBusiness = async (req: Request, res: Response) => {
  const { id, name, address, service } = req.body;
  const newBusines = await addBusiness(id, name, address, service);
  res.send(newBusines);
};

export const UpdateCategory = async (req: Request, res: Response) => {
  const { id, name, address, service } = req.body;
  const newBusines = await updateBusiness(id, name, address, service);
  res.send(newBusines);
};