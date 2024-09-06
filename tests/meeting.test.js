"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const meeting_service_1 = require("../src/services/meeting.service");
const user_model_1 = require("../src/models/user.model");
const meeting_model_1 = require("../src/models/meeting.model");
jest.mock('../src/models/user.model');
jest.mock('../src/models/meeting.model');
describe('getMeetings', () => {
    it('should return all meetings if the user is admin', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = { id: 1, role: 'admin', username: 'adminUser' };
        user_model_1.UserModel.findOne.mockResolvedValue(user);
        const meetings = [
            { id: 1, clientName: 'John Doe', date: '2024-06-05', startTime: '10:00' },
            { id: 2, clientName: 'John Doe1', date: '2023-06-05', startTime: '10:00' }
        ];
        meeting_model_1.MeetingModel.find.mockResolvedValue(meetings);
        const result = yield (0, meeting_service_1.getMeetings)(1);
        expect(result).toEqual(meetings);
    }));
    it('should return meetings for the specific user if not admin', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = { id: 2, role: 'user', username: 'user1' };
        user_model_1.UserModel.findOne.mockResolvedValue(user);
        const meetings = [
            { id: 4, clientName: 'user1', date: '2024-07-05', startTime: '10:00' },
            { id: 13, clientName: 'John Doe3', date: '2024-03-05', startTime: '10:00' }
        ];
        meeting_model_1.MeetingModel.find.mockResolvedValue(meetings);
        const result = yield (0, meeting_service_1.getMeetings)(2);
        expect(result).toEqual(meetings.filter((meeting) => meeting.clientName === user.username));
    }));
    it('should throw an error if an exception occurs', () => __awaiter(void 0, void 0, void 0, function* () {
        user_model_1.UserModel.findOne.mockRejectedValue(new Error('DB error'));
        yield expect((0, meeting_service_1.getMeetings)(1)).rejects.toThrow('DB error');
    }));
});
describe('getMeeting', () => {
    it('should return the meeting with the specified id', () => __awaiter(void 0, void 0, void 0, function* () {
        const meeting = { id: 1, clientName: 'John Doe' };
        meeting_model_1.MeetingModel.findOne.mockResolvedValue(meeting);
        const result = yield (0, meeting_service_1.getMeeting)(1);
        expect(result).toEqual(meeting);
    }));
    it('should throw an error if an exception occurs', () => __awaiter(void 0, void 0, void 0, function* () {
        meeting_model_1.MeetingModel.findOne.mockRejectedValue(new Error('DB error'));
        yield expect((0, meeting_service_1.getMeeting)(1)).rejects.toThrow('DB error');
    }));
});
describe('addMeeting', () => {
    it('should add a new meeting if not already scheduled', () => __awaiter(void 0, void 0, void 0, function* () {
        meeting_model_1.MeetingModel.findOne.mockResolvedValue(null);
        meeting_model_1.MeetingModel.find.mockReturnValue({
            sort: jest.fn().mockReturnValue({
                limit: jest.fn().mockReturnValue({
                    exec: jest.fn().mockResolvedValue([{ id: 1 }])
                })
            })
        });
        meeting_model_1.MeetingModel.insertMany.mockResolvedValue({});
        const result = yield (0, meeting_service_1.addMeeting)('John Doe', 'Note', 'Service Type', '2024-08-05', '10:00', 'john@example.com');
        expect(result).toBe('Data Received!');
    }));
    it('should throw an error if meeting is already scheduled', () => __awaiter(void 0, void 0, void 0, function* () {
        const existingMeeting = { id: 1, date: '2024-08-05', startTime: '10:00' };
        meeting_model_1.MeetingModel.findOne.mockResolvedValue(existingMeeting);
        yield expect((0, meeting_service_1.addMeeting)('John Doe', 'Note', 'Service Type', '2024-08-05', '10:00', 'john@example.com')).rejects.toThrow('Meeting already scheduled for this date and time.');
    }));
    it('should throw an error if an exception occurs', () => __awaiter(void 0, void 0, void 0, function* () {
        meeting_model_1.MeetingModel.findOne.mockRejectedValue(new Error('DB error'));
        yield expect((0, meeting_service_1.addMeeting)('John Doe', 'Note', 'Service Type', '2024-08-05', '10:00', 'john@example.com')).rejects.toThrow('DB error');
    }));
});
describe('updateMeeting', () => {
    it('should update the meeting with the specified id if not already scheduled', () => __awaiter(void 0, void 0, void 0, function* () {
        meeting_model_1.MeetingModel.findOne.mockResolvedValue(null);
        meeting_model_1.MeetingModel.updateOne.mockResolvedValue({});
        const result = yield (0, meeting_service_1.updateMeeting)('John Doe', 'Note', 'Service Type', '2024-08-05', '10:00', 1, 'john@example.com');
        expect(result).toBe('Data Updated!');
    }));
    it('should throw an error if meeting is already scheduled', () => __awaiter(void 0, void 0, void 0, function* () {
        const existingMeeting = { id: 2, date: '2024-08-05', startTime: '10:00' };
        meeting_model_1.MeetingModel.findOne.mockResolvedValue(existingMeeting);
        yield expect((0, meeting_service_1.updateMeeting)('John Doe', 'Note', 'Service Type', '2024-08-05', '10:00', 1, 'john@example.com')).rejects.toThrow('Meeting already scheduled for this date and time.');
    }));
    it('should throw an error if an exception occurs', () => __awaiter(void 0, void 0, void 0, function* () {
        meeting_model_1.MeetingModel.findOne.mockResolvedValue(null);
        meeting_model_1.MeetingModel.updateOne.mockRejectedValue(new Error('DB error'));
        yield expect((0, meeting_service_1.updateMeeting)('John Doe', 'Note', 'Service Type', '2024-01-05', '10:00', 10, 'john@example.com'))
            .rejects.toThrow('DB error');
    }));
});
describe('deleteMeeting', () => {
    it('should return true if the meeting is deleted', () => __awaiter(void 0, void 0, void 0, function* () {
        meeting_model_1.MeetingModel.deleteOne.mockResolvedValue({ deletedCount: 1 });
        const result = yield (0, meeting_service_1.deleteMeeting)(1);
        expect(result).toBe(true);
    }));
    it('should return false if the meeting is not deleted', () => __awaiter(void 0, void 0, void 0, function* () {
        meeting_model_1.MeetingModel.deleteOne.mockResolvedValue({ deletedCount: 0 });
        const result = yield (0, meeting_service_1.deleteMeeting)(1);
        expect(result).toBe(false);
    }));
    it('should throw an error if an exception occurs', () => __awaiter(void 0, void 0, void 0, function* () {
        meeting_model_1.MeetingModel.deleteOne.mockRejectedValue(new Error('DB error'));
        yield expect((0, meeting_service_1.deleteMeeting)(1)).rejects.toThrow('DB error');
    }));
});
