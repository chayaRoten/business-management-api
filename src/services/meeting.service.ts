import { MeetingModel } from '../models/meeting.model';

export const getMeetings = async (): Promise<string | any> => {
    const meetings = await MeetingModel.find().exec();
    return meetings
}


export const addMeeting = async (name: string, address: string, email: string, phone: number, details: string, service: string, id: number): Promise<string> => {
    await MeetingModel.insertMany({ name: name, address: address, email: email, phone: phone, details: details, service: service, id: id });
    return 'Data Received!';
};

export const updateMeeting = async (name: string, address: string, email: string, phone: number, details: string, service: string, id: number): Promise<string> => {
    await MeetingModel.updateOne({ id: id }, { name: name, address: address, email: email, phone: phone, details: details, service: service });
    return 'Data Updated!';
};

export const deleteMeeting = async (id: number): Promise<string> => {
    await MeetingModel.deleteOne({ id: id });
    return 'Data Deleted!';
};