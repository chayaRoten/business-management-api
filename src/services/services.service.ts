/* eslint-disable @typescript-eslint/no-explicit-any */
import { ServiceModel } from '../models/services.model';

export const getServices = async (): Promise<string | any> => {
  try {
    const services = await ServiceModel.find().exec();
    return services
  } catch (error) {
    console.error('Error retrieving services:', error);
    throw new Error('Failed to retrieve services.');
  }
}

export const getService = async (id: number): Promise<string | any> => {
  try {
    const service = await ServiceModel.findOne({ id }).exec();
    return service
  } catch (error) {
    console.error('Error retrieving service:', error);
    throw new Error('Failed to retrieve service.');
  }
}

export const addService = async (name: string, cost: number): Promise<string> => {
  try {
    const existingService = await ServiceModel.findOne({ name }).exec();
    if (existingService) {
      throw new Error('Service with this name already exists.');
    }
    const lastServices = await ServiceModel.findOne().sort({ id: -1 }).exec();
    const newId = lastServices ? lastServices.id + 1 : 1;
    await ServiceModel.insertMany({ name, cost: cost, id: newId });
    return 'Data Received!';
  } catch (error: any) {
    console.error('Error adding service:', error);
    throw new Error(error.message || 'Failed to add service.');
  }
};

export const updateService = async (id: number, name: string, cost: number): Promise<string> => {
  try {
    await ServiceModel.updateOne({ id }, { name, cost });
    return 'Data Updated!';
  } catch (error) {
    console.error('Error updating service:', error);
    throw new Error('Failed to update service.');
  }
};

export const deleteService = async (id: number): Promise<string> => {
  try {
    await ServiceModel.deleteOne({ id });
    return 'Data Deleted!';
  } catch (error) {
    console.error('Error deleting service:', error);
    throw new Error('Failed to delete service.');
  }
};