import { getMeetings, getMeeting, addMeeting, updateMeeting, deleteMeeting } from '../src/services/meeting.service';
import { UserModel } from '../src/models/user.model';
import { MeetingModel } from '../src/models/meeting.model';

jest.mock('../src/models/user.model');
jest.mock('../src/models/meeting.model');

describe('getMeetings', () => {
  it('should return all meetings if the user is admin', async () => {
    const user = { id: 1, role: 'admin', username: 'adminUser' };
    (UserModel.findOne as jest.Mock).mockResolvedValue(user);
    const meetings = [
      { id: 1, clientName: 'John Doe', date: '2024-06-05', startTime: '10:00' },
      { id: 2, clientName: 'John Doe1', date: '2023-06-05', startTime: '10:00' }
    ];
    (MeetingModel.find as jest.Mock).mockResolvedValue(meetings);

    const result = await getMeetings(1);
    expect(result).toEqual(meetings);
  });

  it('should return meetings for the specific user if not admin', async () => {
    const user = { id: 2, role: 'user', username: 'user1' };
    (UserModel.findOne as jest.Mock).mockResolvedValue(user);
    const meetings = [
      { id: 4, clientName: 'user1', date: '2024-07-05', startTime: '10:00' },
      { id: 13, clientName: 'John Doe3', date: '2024-03-05', startTime: '10:00' }
    ];
    (MeetingModel.find as jest.Mock).mockResolvedValue(meetings);

    const result = await getMeetings(2);
    expect(result).toEqual(meetings.filter((meeting) => meeting.clientName === user.username));
  });

  it('should throw an error if an exception occurs', async () => {
    (UserModel.findOne as jest.Mock).mockRejectedValue(new Error('DB error'));
    await expect(getMeetings(1)).rejects.toThrow('DB error');
  });
});

describe('getMeeting', () => {
  it('should return the meeting with the specified id', async () => {
    const meeting = { id: 1, clientName: 'John Doe' };
    (MeetingModel.findOne as jest.Mock).mockResolvedValue(meeting);

    const result = await getMeeting(1);
    expect(result).toEqual(meeting);
  });

  it('should throw an error if an exception occurs', async () => {
    (MeetingModel.findOne as jest.Mock).mockRejectedValue(new Error('DB error'));
    await expect(getMeeting(1)).rejects.toThrow('DB error');
  });
});


describe('addMeeting', () => {
  it('should add a new meeting if not already scheduled', async () => {
    (MeetingModel.findOne as jest.Mock).mockResolvedValue(null);
    (MeetingModel.find as jest.Mock).mockReturnValue({
      sort: jest.fn().mockReturnValue({
        limit: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue([{ id: 1 }])
        })
      })
    });
    (MeetingModel.insertMany as jest.Mock).mockResolvedValue({});

    const result = await addMeeting('John Doe', 'Note', 'Service Type', '2024-08-05', '10:00', 'john@example.com');
    expect(result).toBe('Data Received!');
  });

  it('should throw an error if meeting is already scheduled', async () => {
    const existingMeeting = { id: 1, date: '2024-08-05', startTime: '10:00' };
    (MeetingModel.findOne as jest.Mock).mockResolvedValue(existingMeeting);

    await expect(addMeeting('John Doe', 'Note', 'Service Type', '2024-08-05', '10:00', 'john@example.com')).rejects.toThrow('Meeting already scheduled for this date and time.');
  });

  it('should throw an error if an exception occurs', async () => {
    (MeetingModel.findOne as jest.Mock).mockRejectedValue(new Error('DB error'));
    await expect(addMeeting('John Doe', 'Note', 'Service Type', '2024-08-05', '10:00', 'john@example.com')).rejects.toThrow('DB error');
  });
});

describe('updateMeeting', () => {
  it('should update the meeting with the specified id if not already scheduled', async () => {
    (MeetingModel.findOne as jest.Mock).mockResolvedValue(null);
    (MeetingModel.updateOne as jest.Mock).mockResolvedValue({});

    const result = await updateMeeting('John Doe', 'Note', 'Service Type', '2024-08-05', '10:00', 1, 'john@example.com');
    expect(result).toBe('Data Updated!');
  });

  it('should throw an error if meeting is already scheduled', async () => {
    const existingMeeting = { id: 2, date: '2024-08-05', startTime: '10:00' };
    (MeetingModel.findOne as jest.Mock).mockResolvedValue(existingMeeting);

    await expect(updateMeeting('John Doe', 'Note', 'Service Type', '2024-08-05', '10:00', 1, 'john@example.com')).rejects.toThrow('Meeting already scheduled for this date and time.');
  });

  it('should throw an error if an exception occurs', async () => {
    (MeetingModel.findOne as jest.Mock).mockResolvedValue(null);
  (MeetingModel.updateOne as jest.Mock).mockRejectedValue(new Error('DB error'));
  
  await expect(updateMeeting('John Doe', 'Note', 'Service Type', '2024-01-05', '10:00', 10, 'john@example.com'))
    .rejects.toThrow('DB error');
  });
});

describe('deleteMeeting', () => {
  it('should return true if the meeting is deleted', async () => {
    (MeetingModel.deleteOne as jest.Mock).mockResolvedValue({ deletedCount: 1 });

    const result = await deleteMeeting(1);
    expect(result).toBe(true);
  });

  it('should return false if the meeting is not deleted', async () => {
    (MeetingModel.deleteOne as jest.Mock).mockResolvedValue({ deletedCount: 0 });

    const result = await deleteMeeting(1);
    expect(result).toBe(false);
  });

  it('should throw an error if an exception occurs', async () => {
    (MeetingModel.deleteOne as jest.Mock).mockRejectedValue(new Error('DB error'));
    await expect(deleteMeeting(1)).rejects.toThrow('DB error');
  });
});
