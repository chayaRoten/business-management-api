import { Request, Response } from 'express';
import { getService, addService, updateService, deleteService } from '../services/services.service'

export const GetServices = async (req: Request, res: Response) => {
  try {
    const services = await getService();
    res.send(services);
  } catch (error) {
    console.error('Error retrieving services:', error);
    res.status(500).send('Failed to retrieve services.');
  }
}


export const AddService = async (req: Request, res: Response) => {
  try {
    const { name, cost } = req.body;
    if (!name || !cost) {
      res.status(400).send('Name and cost are required.');
      return;
    }
    const newService = await addService(name, cost);
    res.send(newService);
  } catch (error) {
    console.error('Error adding service:', error);
    res.status(500).send('Failed to add service.');
  }
};

export const UpdateService = async (req: Request, res: Response) => {
  try {
    const serviceName = req.params.serviceName;
    const { name, cost } = req.body;
    if (!name || !cost) {
      res.status(400).send('Name and cost are required.');
      return;
    }
    const updatedService = await updateService(serviceName, name, cost);
    res.send(updatedService);
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).send('Failed to update service.');
  }
};

export const DeleteService = async (req: Request, res: Response) => {
  try {
    const { serviceName } = req.params;
    if (!serviceName) {
      res.status(400).send('serviceName is required.');
      return;
    }
    const deletedService = await deleteService(serviceName);
    res.send(deletedService);
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).send('Failed to delete service.');
  }
};
