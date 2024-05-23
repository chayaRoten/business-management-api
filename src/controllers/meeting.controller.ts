/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { getMeetings, addMeeting, updateMeeting, deleteMeeting } from '../services/meeting.service'

interface AuthRequest extends Request {
  user?: any;
}

export const GetMeetings = async (req: Request, res: Response) => {
  try {
    const meetings = await getMeetings()
    res.status(200).json(meetings);
  } catch (error) {
    console.error('Error retrieving meetings:', error);
    res.status(500).json({ message: 'Failed to retrieve meetings' });
  }
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AddMeeting = async (req: AuthRequest | any, res: Response) => {
  try {
    const { details, typeOfInquiry, date, time } = req.body;
    const user_id = req.user?.user_id;
    const newMeeting = await addMeeting(user_id, details, typeOfInquiry, date, time);
    res.status(201).json({ message: newMeeting });
  } catch (error) {
    console.error('Error adding meeting:', error);
    res.status(500).json({ message: 'Failed to add meeting.' });
  }
};

export const UpdateMeeting = async (req: AuthRequest, res: Response) => {
  try {
    const meetingId = Number(req.params.meetingId);
    const { details, typeOfInquiry, date, time } = req.body;
    const user_id = req.user?.user_id;
    if (!meetingId || !user_id || !details || !typeOfInquiry || !date || !time) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }
    const newMeeting = await updateMeeting(user_id, details, typeOfInquiry, date, time, meetingId);
    res.send(newMeeting);
  } catch (error) {
    console.error('Error updating meeting:', error);
    res.status(500).json({ message: 'Failed to update meeting' });
  }
};

export const DeleteMeeting = async (req: Request, res: Response) => {
  try {
    const meetingId = Number(req.params.meetingId);
    if (!meetingId) {
      res.status(400).json({ message: 'Invalid meeting ID' });
      return;
    }
    const deletedMeeting = await deleteMeeting(meetingId);
    if (!deletedMeeting) {
      res.status(404).json({ message: 'Meeting not found' });
      return;
    }
    res.status(200).json({ message: 'Meeting deleted successfully' });
  } catch (error) {
    console.error('Error deleting meeting:', error);
    res.status(500).json({ message: 'Failed to delete meeting' });
  }
};

