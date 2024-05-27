import mongoose, { Schema, Model } from 'mongoose';


export interface IMeeting {
  userId: number;
  details: string;
  serviceId: number;
  date: string;
  startTime: string;
  id: number;
  duration:number;
}

const meetingSchema: Schema = new Schema({
  userId: Number,
  details: String,
  serviceId: Number,
  date: String,
  startTime: String,
  id: Number,
  duration:Number
});

const MeetingModel: Model<IMeeting> = mongoose.model<IMeeting>('meeting', meetingSchema);

export { MeetingModel };
