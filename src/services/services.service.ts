/* eslint-disable @typescript-eslint/no-explicit-any */
import { ServiceModel } from '../models/services.model';

export const getService = async (): Promise<string | any> => {
  try {
    const services = await ServiceModel.find().exec();
    return services
  } catch (error) {
    console.error('Error retrieving services:', error);
    throw new Error('Failed to retrieve services.');
  }
}

export const addService = async (name: string, cost: number): Promise<string> => {
  try {
    const existingService = await ServiceModel.findOne({ name });
    if (existingService) {
      throw new Error('Service with this name already exists.');
    }
    await ServiceModel.insertMany({ name, cost: cost });
    return 'Data Received!';
  } catch (error) {
    console.error('Error adding service:', error);
    throw new Error('Failed to add service.');
  }
};


export const updateService = async (serviceName: string ,name:string, cost: number): Promise<string> => {
  try {
    await ServiceModel.updateOne({ name:serviceName }, {name, cost });
    return 'Data Updated!';
  } catch (error) {
    console.error('Error updating service:', error);
    throw new Error('Failed to update service.');
  }
};

export const deleteService = async (serviceName: string): Promise<string> => {
  try {
    await ServiceModel.deleteOne({ name: serviceName });
    return 'Data Deleted!';
  } catch (error) {
    console.error('Error deleting service:', error);
    throw new Error('Failed to delete service.');
  }
};