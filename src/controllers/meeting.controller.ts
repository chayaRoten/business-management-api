/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { getMeetings,getMeeting, addMeeting, updateMeeting, deleteMeeting } from '../services/meeting.service'

interface AuthRequest extends Request {
  user?: any;
}

export const GetMeetings = async (req: AuthRequest, res: Response) => {
  try {
    const user_id = req.user?.user_id;
    const meetings = await getMeetings(user_id)
    res.status(200).json(meetings);
  } catch (error) {
    console.error('Error retrieving meetings:', error);
    res.status(500).json({ message: 'Failed to retrieve meetings' });
  }
}

export const GetMeeting = async (req: AuthRequest, res: Response) => {
  try {
    const id = Number(req.params.id);
    const meeting = await getMeeting(id)
    res.status(200).json(meeting);
  } catch (error) {
    console.error('Error retrieving meeting:', error);
    res.status(500).json({ message: 'Failed to retrieve meeting' });
  }
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AddMeeting = async (req: AuthRequest | any, res: Response) => {
  try {
    const { details, serviceId, date, startTime, duration } = req.body;
    const user_id = req.user?.user_id;
    const newMeeting = await addMeeting(user_id, details, serviceId, date, startTime, duration);
    res.status(201).json({ message: newMeeting });
  } catch (error) {
    console.error('Error adding meeting:', error);
    res.status(500).json({ message: 'Failed to add meeting.' });
  }
};

export const UpdateMeeting = async (req: AuthRequest, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { details, serviceId, date, startTime, duration } = req.body;
    const user_id = req.user?.user_id;
    if (!id || !user_id || !details || !serviceId || !date || !startTime || !duration) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }
    const newMeeting = await updateMeeting(user_id, details, serviceId, date, startTime, id , duration);
    res.send(newMeeting);
  } catch (error) {
    console.error('Error updating meeting:', error);
    res.status(500).json({ message: 'Failed to update meeting' });
  }
};

export const DeleteMeeting = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) {
      res.status(400).json({ message: 'Invalid meeting ID' });
      return;
    }
    const deletedMeeting = await deleteMeeting(id);
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

