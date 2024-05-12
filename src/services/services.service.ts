import { ServiceModel } from '../models/services.model';

export const getService = async (): Promise<string | any> => {
  const services = await ServiceModel.find().exec();
  return services
}

export const addService = async (serviceName: String, cost: Number): Promise<string> => {
  await ServiceModel.insertMany({ name: serviceName, cost: cost });
  return 'Data Received!';
};


export const updateService = async (serviceName: String, cost: Number): Promise<string> => {
  await ServiceModel.updateOne({ name: serviceName }, { cost: cost });
  return 'Data Updated!';
};

export const deleteService = async (serviceName: String): Promise<string> => {
  await ServiceModel.deleteOne({ name: serviceName });
  return 'Data Deleted!';
};