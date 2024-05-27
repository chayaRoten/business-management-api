// import { expect, test } from 'jest';
import {  addMeeting} from '../../src/services/meeting.service';
// import { MeetingModel } from '../../src/models/meeting.model';

// Mocking the MeetingModel
// jest.mock('../../src/models/meeting.model');

// describe('MeetingService', () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   describe('getMeetings', () => {
//     it('should return a list of meetings', async () => {
//       const mockMeetings = [
//         { id: 1, name: 'Meeting1', address: 'Address1', email: 'email1@example.com', phone: 1234567890, details: 'Details1', service: 'Service1' },
//         { id: 2, name: 'Meeting2', address: 'Address2', email: 'email2@example.com', phone: 1234567891, details: 'Details2', service: 'Service2' }
//       ];
//       (MeetingModel.find as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue(mockMeetings) });

//       const meetings = await getMeetings();
//       expect(meetings).toEqual(mockMeetings);
//     });
//   });

  describe('addMeeting', () => {
    test('addCustomer should add a new customer with valid parameters', () => {
        expect(addMeeting(4785, 'aaaa', "ff",'10-10-2020','service1')).toEqual({ name: 'John Doe', address: 'Hafa', email: 'john.doe@example.com' , phone: 544444444, details:'example',service:'service1', id:121212121212});
    //   });
    // it('should return "Data Received!" when a meeting is added', async () => {
    //   (MeetingModel.insertMany as jest.Mock).mockResolvedValue({});

    //   const response = await addMeeting('Meeting1', 'Address1', 'email1@example.com', 1234567890, 'Details1', 'Service1', 1);
    //   expect(response).toBe('Data Received!');
    //   expect(MeetingModel.insertMany).toHaveBeenCalledWith({
    //     name: 'Meeting1',
    //     address: 'Address1',
    //     email: 'email1@example.com',
    //     phone: 1234567890,
    //     details: 'Details1',
    //     service: 'Service1',
    //     id: 1
    //   });
    // });
  });

//   describe('updateMeeting', () => {
//     it('should return "Data Updated!" when a meeting is updated', async () => {
//       (MeetingModel.updateOne as jest.Mock).mockResolvedValue({});

//       const response = await updateMeeting('Meeting1', 'Address1', 'email1@example.com', 1234567890, 'Details1', 'Service1', 1);
//       expect(response).toBe('Data Updated!');
//       expect(MeetingModel.updateOne).toHaveBeenCalledWith(
//         { id: 1 },
//         {
//           name: 'Meeting1',
//           address: 'Address1',
//           email: 'email1@example.com',
//           phone: 1234567890,
//           details: 'Details1',
//           service: 'Service1'
//         }
//       );
//     });
//   });

//   describe('deleteMeeting', () => {
//     it('should return "Data Deleted!" when a meeting is deleted', async () => {
//       (MeetingModel.deleteOne as jest.Mock).mockResolvedValue({});

//       const response = await deleteMeeting(1);
//       expect(response).toBe('Data Deleted!');
//       expect(MeetingModel.deleteOne).toHaveBeenCalledWith({ id: 1 });
//     });
//   });
});
