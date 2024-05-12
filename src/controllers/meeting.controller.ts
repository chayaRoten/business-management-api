import { Request, Response } from 'express';
import { getMeetings ,addMeeting, updateMeeting ,deleteMeeting } from '../services/meeting.service'

export const GetMeetings = async (req: Request, res: Response) => {
    const meeting = await getMeetings()
    res.send(meeting)
}

export const AddMeeting = async (req: Request, res: Response) => {
    const { name, address, email, phone, details, service, id } = req.body;
    const newMeeting = await addMeeting(name, address, email, phone, details, service, id);
    res.send(newMeeting);
  };
  
  export const UpdateMeeting = async (req: Request, res: Response) => {
    const { name, address, email, phone, details, service, id } = req.body;
    const newMeeting = await updateMeeting(name,address, email, phone, details, service, id );
    res.send(newMeeting);
  };
  
  export const DeleteMeeting = async (req: Request, res: Response) => {
    const { id } = req.params;
    const newMeeting = await deleteMeeting(Number(id));
    res.send(newMeeting);
  };

  