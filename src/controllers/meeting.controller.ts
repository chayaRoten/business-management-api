import { Request, Response } from 'express';
import { getMeetings } from '../services/meeting.service'

export const GetMeetings = async (req: Request, res: Response) => {
    const meeting = await getMeetings()
    res.send(meeting)
}