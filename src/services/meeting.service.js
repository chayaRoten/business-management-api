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
exports.deleteMeeting = exports.updateMeeting = exports.addMeeting = exports.getMeeting = exports.getMeetings = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const meeting_model_1 = require("../models/meeting.model");
const user_model_1 = require("../models/user.model");
const getMeetings = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.UserModel.findOne({ id });
        if (user) {
            const meetings = yield meeting_model_1.MeetingModel.find();
            if (user.role == "admin")
                return meetings;
            else {
                return meetings.filter(x => x.clientName == user.username);
            }
        }
    }
    catch (error) {
        console.error('Error getting meetings:', error);
        throw new Error(error.message || 'Failed to retrieve meetings.');
    }
});
exports.getMeetings = getMeetings;
const getMeeting = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const meeting = yield meeting_model_1.MeetingModel.findOne({ id });
        return meeting;
    }
    catch (error) {
        console.error('Error getting meeting:', error);
        throw new Error(error.message || 'Failed to retrieve meeting.');
    }
});
exports.getMeeting = getMeeting;
const addMeeting = (clientName, note, serviceType, date, startTime, clientEmail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingMeeting = yield meeting_model_1.MeetingModel.findOne({ date, startTime });
        if (existingMeeting) {
            throw new Error('Meeting already scheduled for this date and time.');
        }
        const lastMeeting = yield meeting_model_1.MeetingModel.find().sort({ id: -1 }).limit(1).exec();
        const newId = lastMeeting.length ? lastMeeting[0].id + 1 : 1;
        yield meeting_model_1.MeetingModel.insertMany({ clientName, note, serviceType, date, startTime, id: newId, clientEmail });
        return 'Data Received!';
    }
    catch (error) {
        console.error('Error adding meeting:', error);
        throw new Error(error.message || 'Failed to add meeting.');
    }
});
exports.addMeeting = addMeeting;
const updateMeeting = (clientName, note, serviceType, date, startTime, id, clientEmail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingMeeting = yield meeting_model_1.MeetingModel.findOne({ date, startTime });
        if (existingMeeting) {
            throw new Error('Meeting already scheduled for this date and time.');
        }
        yield meeting_model_1.MeetingModel.updateOne({ id }, { clientName, note, serviceType, date, startTime, clientEmail });
        return 'Data Updated!';
    }
    catch (error) {
        console.error('Error updating meeting:', error);
        throw new Error(error.message || 'Failed to update meeting.');
    }
});
exports.updateMeeting = updateMeeting;
const deleteMeeting = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield meeting_model_1.MeetingModel.deleteOne({ id });
        return result.deletedCount > 0;
    }
    catch (error) {
        console.error('Error deleting meeting:', error);
        throw new Error(error.message || 'Failed to delete meeting.');
    }
});
exports.deleteMeeting = deleteMeeting;
