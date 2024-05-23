import { Request, Response } from 'express';
import { getBusiness, addBusiness, updateBusiness } from '../services/business.service'

export const GetBusiness = async (req: Request, res: Response) => {
  try {
    const business = await getBusiness()
    res.send(business)
  } catch (error) {
    console.error('Failed to get business:', error);
    res.status(500).send('Failed to get business');
  }
}

export const AddBusiness = async (req: Request, res: Response) => {
  try {
    const { id, name, address, service } = req.body;
    const newBusines = await addBusiness(id, name, address, service);
    res.send(newBusines);
  } catch (error) {
    console.error('Failed to add business:', error);
    res.status(500).send('Failed to add business');
  }
};

export const UpdateCategory = async (req: Request, res: Response) => {
  try {
    const { id, name, address, service } = req.body;
    const newBusines = await updateBusiness(id, name, address, service);
    res.send(newBusines);
  } catch (error) {
    console.error('Failed to update business:', error);
    res.status(500).send('Failed to update business');
  }
};