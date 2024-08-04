import { getBusiness, addBusiness, updateBusiness } from '../src/services/business.service';
import { BusinessModel } from '../src/models/business.model';

jest.mock('../src/models/business.model'); // Mock the BusinessModel

describe('Business Service', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls after each test
  });

  describe('getBusiness', () => {
    it('should return a list of businesses', async () => {
      // Mock the find method to return a list of businesses
      const mockBusinesses = [{ id: 1, name: 'Business1' }, { id: 2, name: 'Business2' }];
      (BusinessModel.find as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue(mockBusinesses) });

      const result = await getBusiness();
      expect(result).toEqual(mockBusinesses);
    });

    it('should throw an error if fetching businesses fails', async () => {
      (BusinessModel.find as jest.Mock).mockReturnValue({ exec: jest.fn().mockRejectedValue(new Error('DB error')) });

      await expect(getBusiness()).rejects.toThrow('Failed to get business.');
    });
  });

  describe('addBusiness', () => {
    it('should add a new business and return success message', async () => {
      // Mock insertMany to return a success response
      (BusinessModel.insertMany as jest.Mock).mockResolvedValue(true);

      const result = await addBusiness(1, 'Business1', '123 Main St', 'A great business', '123-456-7890', 'business1@example.com');
      expect(result).toBe('Data Received!');
    });

    it('should throw an error if adding a business fails', async () => {
      (BusinessModel.insertMany as jest.Mock).mockRejectedValue(new Error('DB error'));

      await expect(addBusiness(1, 'Business1', '123 Main St', 'A great business', '123-456-7890', 'business1@example.com')).rejects.toThrow('Failed to add business.');
    });
  });

  describe('updateBusiness', () => {
    it('should update a business and return success message', async () => {
      // Mock updateOne to return a success response
      (BusinessModel.updateOne as jest.Mock).mockResolvedValue({ nModified: 1 });

      const result = await updateBusiness(1, 'Updated Business', '123 Main St', 'Updated description', '123-456-7890', 'business1@example.com');
      expect(result).toBe('Data Updated!');
    });

    it('should throw an error if updating a business fails', async () => {
      (BusinessModel.updateOne as jest.Mock).mockRejectedValue(new Error('DB error'));

      await expect(updateBusiness(1, 'Updated Business', '123 Main St', 'Updated description', '123-456-7890', 'business1@example.com')).rejects.toThrow('Failed to update business.');
    });
  });
});
