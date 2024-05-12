import { Request, Response } from 'express';
import { getService, addService, updateService, deleteService } from '../services/services.service'

export const GetServices = async (req: Request, res: Response) => {
  const meeting = await getService()
  res.send(meeting)
}

export const AddService = async (req: Request, res: Response) => {
  const { name, cost } = req.body;
  const newService = await addService(name, cost);
  res.send(newService);
};

export const UpdateService = async (req: Request, res: Response) => {
  const { name, cost } = req.body;
  const newService = await updateService(name, cost);
  res.send(newService);
};

export const DeleteService = async (req: Request, res: Response) => {
  const { name } = req.params;
  const newService = await deleteService(name);
  res.send(newService);
};
