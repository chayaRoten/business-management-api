import { MeetingModel } from '../../src/models/meeting.model';
import {
  getMeetings,
  getMeeting,
  addMeeting,
  updateMeeting,
  deleteMeeting
} from '../../src/services/meeting.service';


// import { jest } from '@jest/globals';

// // jest.mock('../../src/models/meeting.model');
// jest.mock('../../src/models/meeting.model', () => ({
//   find: jest.fn(),
//   findOne: jest.fn(),
//   insertMany: jest.fn(),
//   updateOne: jest.fn(),
//   deleteOne: jest.fn()
// }));

// describe('Meeting Service', () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   describe('getMeetings', () => {
//     test('should return meetings for a specific user', async () => {
//       const mockMeetings = [
//         { userId: 1, details: 'Meeting 1' },
//         { userId: 2, details: 'Meeting 2' }
//       ];
//       (MeetingModel.find as jest.Mock).mockReturnValue({
//         exec: jest.fn().mockResolvedValue(mockMeetings)
//       });

//       const result = await getMeetings(1);
//       expect(result).toEqual([{ userId: 1, details: 'Meeting 1' }]);
//     });

//     test('should throw an error if retrieval fails', async () => {
//       (MeetingModel.find as jest.Mock).mockReturnValue({
//         exec: jest.fn().mockRejectedValue(new Error('DB Error'))
//       });

//       await expect(getMeetings(1)).rejects.toThrow('Failed to retrieve meetings.');
//     });
//   });

//   describe('getMeeting', () => {
//     test('should return a specific meeting by id', async () => {
//       const mockMeeting = { id: 1, details: 'Meeting 1' };
//       (MeetingModel.findOne as jest.Mock).mockReturnValue({
//         exec: jest.fn().mockResolvedValue(mockMeeting)
//       });

//       const result = await getMeeting(1);
//       expect(result).toEqual(mockMeeting);
//     });

//     test('should throw an error if retrieval fails', async () => {
//       (MeetingModel.findOne as jest.Mock).mockReturnValue({
//         exec: jest.fn().mockRejectedValue(new Error('DB Error'))
//       });

//       await expect(getMeeting(1)).rejects.toThrow('Failed to retrieve meeting.');
//     });

//   });



// describe('addMeeting', () => {
//   test('should add a new meeting and return success message', async () => {
//     (MeetingModel.findOne as jest.Mock).mockResolvedValueOnce(null);
//     (MeetingModel.findOne as jest.Mock).mockResolvedValueOnce({ id: 999 });
//     (MeetingModel.insertMany as jest.Mock).mockResolvedValue(undefined);

//     const result = await addMeeting(1, 'Details', 'Service', '2024-01-01', '10:00', 60);
//     expect(result).toEqual('Data Received!');
//   });

//   test('should throw an error if meeting already exists', async () => {
//     (MeetingModel.findOne as jest.Mock).mockResolvedValue({});

//     await expect(addMeeting(1, 'Details', 'Service', '2024-01-01', '10:00', 60)).rejects.toThrow('Meeting already scheduled for this date and time.');
//   });

//   test('should throw an error if adding fails', async () => {
//     (MeetingModel.findOne as jest.Mock).mockResolvedValue(null);
//     (MeetingModel.insertMany as jest.Mock).mockRejectedValue(new Error('DB Error'));

//     await expect(addMeeting(1, 'Details', 'Service', '2024-01-01', '10:00', 60)).rejects.toThrow('Failed to add meeting.');
//   });
// });

// describe('updateMeeting', () => {
//   test('should update an existing meeting and return success message', async () => {
//     (MeetingModel.findOne as jest.Mock).mockResolvedValue(null);
//     (MeetingModel.updateOne as jest.Mock).mockResolvedValue(undefined);

//     const result = await updateMeeting(1, 'Details', 'Service', '2024-01-01', '10:00', 1, 60);
//     expect(result).toEqual('Data Updated!');
//   });

//   test('should throw an error if meeting already exists at new time', async () => {
//     (MeetingModel.findOne as jest.Mock).mockResolvedValue({});

//     await expect(updateMeeting(1, 'Details', 'Service', '2024-01-01', '10:00', 1, 60)).rejects.toThrow('Meeting already scheduled for this date and time.');
//   });

//   test('should throw an error if updating fails', async () => {
//     (MeetingModel.findOne as jest.Mock).mockResolvedValue(null);
//     (MeetingModel.updateOne as jest.Mock).mockRejectedValue(new Error('DB Error'));

//     await expect(updateMeeting(1, 'Details', 'Service', '2024-01-01', '10:00', 1, 60)).rejects.toThrow('Failed to update meeting.');
//   });
// });

// describe('deleteMeeting', () => {
//   test('should delete a meeting and return true if successful', async () => {
//     (MeetingModel.deleteOne as jest.Mock).mockResolvedValue({ deletedCount: 1 });

//     const result = await deleteMeeting(1);
//     expect(result).toBe(true);
//   });

//   test('should return false if no meeting was deleted', async () => {
//     (MeetingModel.deleteOne as jest.Mock).mockResolvedValue({ deletedCount: 0 });

//     const result = await deleteMeeting(1);
//     expect(result).toBe(false);
//   });

//   test('should throw an error if deletion fails', async () => {
//     (MeetingModel.deleteOne as jest.Mock).mockRejectedValue(new Error('DB Error'));

//     await expect(deleteMeeting(1)).rejects.toThrow('Failed to delete meeting.');
//   });
// });

// });

describe('addMeeting', () => {
  test('addCustomer should add a new customer with valid parameters', () => {
    const headers = {
      'Authorization': 'sampleToken123'
    };
    expect(addMeeting(7979797, 'details', 78888, '10-10-2020', 'startTime', 120))
    .toEqual({ userId:7979797,details: 'details', serviceId: 78888, date: '10-10-2020', startTime: 'startTime', duration: 120 });
    
  })})