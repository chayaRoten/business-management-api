/* eslint-disable @typescript-eslint/no-explicit-any */
import { BusinessModel } from '../models/business.model';

export const getBusiness = async (): Promise<any> => {
  try {
    const business = await BusinessModel.find().exec();
    return business;
  } catch (error) {
    console.error('Error getting business:', error);
    throw new Error('Failed to get business.');
  }
}

export const addBusiness = async (id: number, name: string, address: string, services: string): Promise<string> => {
  try {
    await BusinessModel.insertMany({ id, name, address, services });
    return 'Data Received!';
  } catch (error) {
    console.error('Error adding business:', error);
    throw new Error('Failed to add business.');
  }
};


export const updateBusiness = async (id: number, name: string, address: string, services: string): Promise<string> => {
  try {
    await BusinessModel.updateOne({ id }, { name, address, services });
    return 'Data Updated!';
  } catch (error) {
    console.error('Error updating business:', error);
    throw new Error('Failed to update business.');
  }
};
