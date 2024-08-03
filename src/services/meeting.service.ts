/* eslint-disable @typescript-eslint/no-explicit-any */
import { MeetingModel } from '../models/meeting.model';
import { UserModel } from '../models/user.model';


export const getMeetings = async (id: number): Promise<any> => {
    try {
        const user = await UserModel.findOne({ id });
        if (user) {
            const meetings = await MeetingModel.find();
            if (user.role == "admin")
                return meetings;
            else {
                return meetings.filter(x => x.clientName == user.username)
            }
        }
    } catch (error: any) {
        console.error('Error getting meetings:', error);
        throw new Error(error.message || 'Failed to retrieve meetings.');
    }
}

export const getMeeting = async (id: number): Promise<any> => {
    try {
        const meeting = await MeetingModel.findOne({ id });
        return meeting
    } catch (error: any) {
        console.error('Error getting meeting:', error);
        throw new Error(error.message || 'Failed to retrieve meeting.');
    }
}

export const addMeeting = async (clientName: string, note: string, serviceType: string, date: string, startTime: string, clientEmail: string): Promise<string> => {
    try {
        const existingMeeting = await MeetingModel.findOne({ date, startTime });

        if (existingMeeting) {
            throw new Error('Meeting already scheduled for this date and time.');
        }
        const lastMeeting = await MeetingModel.find().sort({ id: -1 }).limit(1).exec();
        const newId = lastMeeting.length ? lastMeeting[0].id + 1 : 1;
        await MeetingModel.insertMany({ clientName, note, serviceType, date, startTime, id: newId, clientEmail });
        return 'Data Received!';
    } catch (error: any) {
        console.error('Error adding meeting:', error);
        throw new Error(error.message || 'Failed to add meeting.');
    }
};

export const updateMeeting = async (clientName: string, note: string, serviceType: string, date: string, startTime: string, id: number, clientEmail: string): Promise<string> => {
    try {
        const existingMeeting = await MeetingModel.findOne({ date, startTime });
        if (existingMeeting) {
            throw new Error('Meeting already scheduled for this date and time.');
        }
        await MeetingModel.updateOne({ id }, { clientName, note, serviceType, date, startTime, clientEmail });
        return 'Data Updated!';
    } catch (error: any) {
        console.error('Error updating meeting:', error);
        throw new Error(error.message || 'Failed to update meeting.');
    }
};

export const deleteMeeting = async (id: number): Promise<boolean> => {
    try {
        const result = await MeetingModel.deleteOne({ id });
        return result.deletedCount > 0;
    } catch (error: any) {
        console.error('Error deleting meeting:', error);
        throw new Error(error.message || 'Failed to delete meeting.');
    }

};