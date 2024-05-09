import { BusinessModel, IBusiness } from '../models/business.model';

export const getBusiness = async (): Promise<any> => {
  try {
    const business = await BusinessModel.find().exec();
    console.log(business);
    return business;
  } catch (error) {
    console.error('Failed to get business:', error);
    throw error;
  }
}


// async function getBusinessById(businessId: string): Promise<IBusiness | null> {
//   try {
//     const business = await BusinessModel.findById(businessId).exec();
//     return business;
//   } catch (error) {
//     console.error('Failed to get business by ID:', error);
//     throw error;
//   }
// }

// async function getBusinesses(): Promise<IBusiness[]> {
//   try {
//     const businesses = await BusinessModel.find().exec();
//     return businesses;
//   } catch (error) {
//     console.error('Failed to get businesses:', error);
//     throw error;
//   }
// }
