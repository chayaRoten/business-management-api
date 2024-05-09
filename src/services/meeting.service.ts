import { MeetingModel } from '../models/meeting.model';

export const getMeetings = async (): Promise<string | any> => {
    const meetings = await MeetingModel.find().exec();
    console.log(meetings);
    return meetings
}
