import { getServices, getService, addService, updateService, deleteService } from '../src/services/services.service';
import { ServiceModel } from '../src/models/services.model';

// Mock the ServiceModel
jest.mock('../src/models/services.model');

describe('Service Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getServices', () => {
    it('should return a list of services', async () => {
      const mockServices = [{ id: 1, name: 'Service1', cost: 100 }];
      (ServiceModel.find as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue(mockServices) });

      const result = await getServices();
      expect(result).toEqual(mockServices);
    });

    it('should handle errors gracefully', async () => {
      (ServiceModel.find as jest.Mock).mockReturnValue({ exec: jest.fn().mockRejectedValue(new Error('DB error')) });

      await expect(getServices()).rejects.toThrow('Failed to retrieve services.');
    });
  });

  describe('getService', () => {
    it('should return a service by ID', async () => {
      const mockService = { id: 1, name: 'Service1', cost: 100 };
      (ServiceModel.findOne as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue(mockService) });

      const result = await getService(1);
      expect(result).toEqual(mockService);
    });

    it('should handle errors gracefully', async () => {
      (ServiceModel.findOne as jest.Mock).mockReturnValue({ exec: jest.fn().mockRejectedValue(new Error('DB error')) });

      await expect(getService(1)).rejects.toThrow('Failed to retrieve service.');
    });
  });

  describe('addService', () => {
    // it('should add a new service', async () => {
    //   (ServiceModel.findOne as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
    //   (ServiceModel.findOne as jest.Mock).mockReturnValueOnce({ exec: jest.fn().mockResolvedValue({ id: 1 }) });
    //   (ServiceModel.insertMany as jest.Mock).mockResolvedValue(true);

    //   const result = await addService('Service2', 200);
    //   expect(result).toBe('Data Received!');
    // });

    it('should return error if service already exists', async () => {
      const mockService = { id: 1, name: 'Service1', cost: 100 };
      (ServiceModel.findOne as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue(mockService) });

      await expect(addService('Service1', 200)).rejects.toThrow('Failed to add service.');
    });

    it('should handle errors gracefully', async () => {
      (ServiceModel.findOne as jest.Mock).mockReturnValue({ exec: jest.fn().mockRejectedValue(new Error('DB error')) });

      await expect(addService('Service3', 300)).rejects.toThrow('Failed to add service.');
    });
  });

  describe('updateService', () => {
    it('should update an existing service', async () => {
      (ServiceModel.updateOne as jest.Mock).mockResolvedValue({ nModified: 1 });

      const result = await updateService(1, 'ServiceUpdated', 150);
      expect(result).toBe('Data Updated!');
    });

    it('should handle errors gracefully', async () => {
      (ServiceModel.updateOne as jest.Mock).mockRejectedValue(new Error('DB error'));

      await expect(updateService(1, 'ServiceUpdated', 150)).rejects.toThrow('Failed to update service.');
    });
  });

  describe('deleteService', () => {
    it('should delete a service by ID', async () => {
      (ServiceModel.deleteOne as jest.Mock).mockResolvedValue({ deletedCount: 1 });

      const result = await deleteService(1);
      expect(result).toBe('Data Deleted!');
    });

    it('should handle errors gracefully', async () => {
      (ServiceModel.deleteOne as jest.Mock).mockRejectedValue(new Error('DB error'));

      await expect(deleteService(1)).rejects.toThrow('Failed to delete service.');
    });
  });
});
