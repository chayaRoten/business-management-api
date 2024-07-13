import mongoose, { Schema, Model } from 'mongoose';


export interface IMeeting {
  clientName: string;
  note: string;
  serviceType: string;
  date: string;
  startTime: string;
  id: number;
  clientEmail:string;
}

const meetingSchema: Schema = new Schema({
  clientName: String,
  note: String,
  serviceType: String,
  date: String,
  startTime: String,
  id: Number,
  clientEmail:String
});

const MeetingModel: Model<IMeeting> = mongoose.model<IMeeting>('meeting', meetingSchema);

export { MeetingModel };
