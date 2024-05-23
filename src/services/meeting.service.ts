import { MeetingModel } from '../models/meeting.model';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getMeetings = async (): Promise<any> => {
    try {
        const meetings = await MeetingModel.find().exec();
        return meetings
    } catch (error) {
        console.error('Error getting meetings:', error);
        throw new Error('Failed to retrieve meetings.');
    }
}

export const addMeeting = async (userId: number, details: string, typeOfInquiry: string, date: string, time: string): Promise<string> => {
    try {
        const existingMeeting = await MeetingModel.findOne({ date, time });
        if (existingMeeting) {
            throw new Error('Meeting already scheduled for this date and time.');
        }
        const lastMeeting = await MeetingModel.findOne().sort({ id: -1 }).exec();
        const newId = lastMeeting ? lastMeeting.id + 1 : 1;
        await MeetingModel.insertMany({ userId, details, typeOfInquiry, date, time, id: newId });
        return 'Data Received!';
    } catch (error) {
        console.error('Error adding meeting:', error);
        throw new Error('Failed to add meeting.');
    }
};

export const updateMeeting = async (userId: number, details: string, typeOfInquiry: string, date: string, time: string, id: number): Promise<string> => {
    try {
        const existingMeeting = await MeetingModel.findOne({ date, time });
        if (existingMeeting) {
            throw new Error('Meeting already scheduled for this date and time.');
        }
        await MeetingModel.updateOne({ id }, { userId, details, typeOfInquiry, date, time });
        return 'Data Updated!';
    } catch (error) {
        console.error('Error updating meeting:', error);
        throw new Error('Failed to update meeting.');
    }
};

export const deleteMeeting = async (id: number): Promise<boolean> => {
    try {
        const result = await MeetingModel.deleteOne({ id });
        return result.deletedCount > 0;
    } catch (error) {
        console.error('Error deleting meeting:', error);
        throw new Error('Failed to delete meeting.');
    }

};
