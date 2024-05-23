import mongoose, { Schema, Model } from 'mongoose';


export interface IMeeting {
  userId: number;
  details: string;
  typeOfInquiry: string;
  date: string;
  time: string;
  id: number;
}

const meetingSchema: Schema = new Schema({
  userId: Number,
  details: String,
  typeOfInquiry: String,
  date: String,
  time: String,
  id: Number
});

const MeetingModel: Model<IMeeting> = mongoose.model<IMeeting>('meeting', meetingSchema);

export { MeetingModel };
