// import { MeetingModel } from '../../src/models/meeting.model';
import {
  getMeetings,
  getMeeting,
  addMeeting,
  updateMeeting,
  deleteMeeting
} from '../../src/services/meeting.service';

// Import necessary modules
import mongoose from 'mongoose';
// import { getMeetings } from '../src/services/meeting.service';

// Mock mongoose find method
jest.mock('mongoose', () => ({
  ...jest.requireActual('mongoose'),
  Model: {
    find: jest.fn().mockImplementation(() => Promise.resolve([
      { userId: 78410, meeting: 'Meeting 1' },
      { userId: 78410, meeting: 'Meeting 2' }
    ])),
  },
}));

describe('getMeetings function', () => {
  it('should retrieve meetings for a user', async () => {
    const userId = 78410;
    const meetings = await getMeetings(userId);
    expect(meetings).toHaveLength(2);
  });

  it('should throw an error if retrieval fails', async () => {
    mongoose.Model.find.mockImplementationOnce(() => Promise.reject(new Error('Failed to retrieve meetings')));
    const userId = 456;
    await expect(getMeetings(userId)).rejects.toThrow('Failed to retrieve meetings.');
  });
});

describe('getMeetings function', () => {
  it('should retrieve meetings for a user', async () => {
    // Arrange
    const userId = 78410; // Assuming a user ID for testing

    // Act
    const meetings = await getMeetings(userId);

    // Assert
    expect(Array.isArray(meetings)).toBe(true);
    // Add more assertions based on your expected data structure
  })
  it('should throw an error if retrieval fails', async () => {
    // Arrange
    const userId = 456; // Assuming a user ID for testing

    // Act & Assert
    await expect(getMeetings(userId)).rejects.toThrow('Failed to retrieve meetings.');
  });
})

// describe('getMeeting function', () => {
//   it('should retrieve a meeting by ID', async () => {
//     // Arrange
//     const meetingId = 1; // Assuming a meeting ID for testing

//     // Act
//     const meeting = await getMeeting(meetingId);

//     // Assert
//     expect(meeting).toBeDefined();
//     // Add more assertions based on your expected data structure
//   });

//   it('should throw an error if retrieval fails', async () => {
//     // Arrange
//     const meetingId = 999; // Assuming a non-existent meeting ID for testing

//     // Act & Assert
//     await expect(getMeeting(meetingId)).rejects.toThrow('Failed to retrieve meeting.');
//   });
// });

// describe('addMeeting function', () => {
//   it('should add a new meeting', async () => {
//     // Arrange
//     const userId = 123; // Assuming a user ID for testing
//     const details = "Test Meeting";
//     const serviceId = 1;
//     const date = "2024-05-30";
//     const startTime = "10:00";
//     const duration = 60;

//     // Act
//     const result = await addMeeting(userId, details, serviceId, date, startTime, duration);

//     // Assert
//     expect(result).toBe('Data Received!');
//     // You may want to assert more about the created meeting, like checking if it exists in the database
//   });

//   it('should throw an error if addition fails', async () => {
//     // Arrange: You may create a test scenario where addition fails
//     // Act & Assert
//     // Add your test scenario here
//   });
// });
// describe('updateMeeting function', () => {
//   it('should update an existing meeting', async () => {
//     // Arrange
//     const userId = 123; // Assuming a user ID for testing
//     const details = "Updated Meeting";
//     const serviceId = 1;
//     const date = "2024-05-30";
//     const startTime = "10:00";
//     const meetingId = 1; // Assuming an existing meeting ID for testing
//     const duration = 60;

//     // Act
//     const result = await updateMeeting(userId, details, serviceId, date, startTime, meetingId, duration);

//     // Assert
//     expect(result).toBe('Data Updated!');
//     // You may want to assert more about the updated meeting, like checking if its details have changed
//   });

//   it('should throw an error if update fails', async () => {
//     // Arrange: You may create a test scenario where update fails
//     // Act & Assert
//     // Add your test scenario here
//   });
// });




// describe('deleteMeeting function', () => {
//   it('should delete a meeting by ID', async () => {
//     // Arrange
//     const meetingId = 1; // Assuming an existing meeting ID for testing

//     // Act
//     const result = await deleteMeeting(meetingId);

//     // Assert
//     expect(result).toBe(true);
//     // You may want to assert more about the deletion, like checking if the meeting no longer exists in the database
//   });

//   it('should return false if meeting does not exist', async () => {
//     // Arrange
//     const meetingId = 999; // Assuming a non-existent meeting ID for testing

//     // Act
//     const result = await deleteMeeting(meetingId);

//     // Assert
//     expect(result).toBe(false);
//   });

//   it('should throw an error if deletion fails', async () => {
//     // Arrange: You may create a test scenario where deletion fails
//     // Act & Assert
//     // Add your test scenario here
//   });
// });