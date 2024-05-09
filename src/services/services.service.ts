import { ServiceModel } from '../models/services.model';

export const getServices = async (): Promise<string | any> => {
    const services = await ServiceModel.find().exec();
    console.log(services);
    return services
}
