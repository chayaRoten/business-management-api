import mongoose, { Schema, Document, Model } from 'mongoose';


export interface IMeeting {
  name: string;
  address: string;
  email: string;
  phone: number;
  details: string;
  typeOfInquiry: string;
}

const meetingSchema: Schema = new Schema({
  name: String,
  address: String,
  email: String,
  phone: Number,
  details: String,
  typeOfInquiry: String,
});

const MeetingModel: Model<IMeeting> = mongoose.model<IMeeting>('meeting', meetingSchema);

export { MeetingModel };
