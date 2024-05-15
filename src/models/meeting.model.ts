import mongoose, { Schema, Document, Model } from 'mongoose';


export interface IMeeting {
  name: string;
  address: string;
  email: string;
  phone: number;
  details: string;
  service: string;
  id:number;
}

const meetingSchema: Schema = new Schema({
  name: String,
  address: String,
  email: String,
  phone: Number,
  details: String,
  typeOfInquiry: String,
  service: String,
  id:Number,
});

const MeetingModel: Model<IMeeting> = mongoose.model<IMeeting>('meeting', meetingSchema);

export { MeetingModel };
