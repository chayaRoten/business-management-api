/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { getMeetings,getMeeting, addMeeting, updateMeeting, deleteMeeting } from '../services/meeting.service'
interface AuthRequest extends Request {
  user?: any;
}

/**
 * @swagger
 * /meetings:
 *   get:
 *     summary: Get all meetings for a user
 *     tags: [Meetings]
 *     responses:
 *       200:
 *         description: Successfully retrieved meetings
 *       500:
 *         description: Failed to retrieve meetings
 */
export const GetMeetings = async (req: AuthRequest, res: Response) => {
  try {
    // const user_name=req.user?.username;
    // const user_id = await getUserByName(user_name);
    const user_id = req.user?.user_id;
    const meetings = await getMeetings(user_id)
    res.status(200).json(meetings);
  } catch (error) {
    console.error('Error retrieving meetings:', error);
    res.status(500).json({ message: 'Failed to retrieve meetings' });
  }
}


/**
 * @swagger
 * /meeting/{id}:
 *   get:
 *     summary: Get a meeting by ID
 *     tags: [Meetings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Meeting ID
 *     responses:
 *       200:
 *         description: Successfully retrieved meeting
 *       500:
 *         description: Failed to retrieve meeting
 */
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



/**
 * @swagger
 * /meetings:
 *   post:
 *     summary: Add a new meeting
 *     tags: [Meetings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - note
 *               - serviceType
 *               - date
 *               - startTime
 *               - clientEmail
 *             properties:
 *               note:
 *                 type: string
 *               serviceType:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               startTime:
 *                 type: string
 *               clientEmail:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully added meeting
 *       500:
 *         description: Failed to add meeting
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AddMeeting = async (req: AuthRequest | any, res: Response) => {
  try {
    const { note, serviceType, date, startTime, clientEmail} = req.body;
    const user_name = req.user?.username;

    if (!serviceType || !date || !startTime || !clientEmail) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newMeeting = await addMeeting( user_name,  note, serviceType, date, startTime,clientEmail);
    res.status(201).json({ message: newMeeting });
  } catch (error) {
    console.error('Error adding meeting:', error);
    res.status(500).json({ message: 'Failed to add meeting.' });
  }
};



/**
 * @swagger
 * /meetings/{id}:
 *   put:
 *     summary: Update an existing meeting
 *     tags: [Meetings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Meeting ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - note
 *               - serviceType
 *               - date
 *               - startTime
 *               - clientEmail
 *             properties:
 *               note:
 *                 type: string
 *               serviceType:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               startTime:
 *                 type: string
 *               clientEmail:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated meeting
 *       400:
 *         description: All fields are required
 *       500:
 *         description: Failed to update meeting
 */
export const UpdateMeeting = async (req: AuthRequest, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { note, serviceType, date, startTime, clientEmail} = req.body;
    // const { details, serviceId, date, startTime, duration } = req.body;
    const user_name = req.user?.username;
    if (!id || !user_name || !note || !serviceType || !date || !startTime || !clientEmail) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }
    const newMeeting = await updateMeeting(user_name, note, serviceType, date, startTime, id , clientEmail);
    // const newMeeting = await updateMeeting(user_id, details, serviceId, date, startTime, id , duration);
    res.send(newMeeting);
  } catch (error) {
    console.error('Error updating meeting:', error);
    res.status(500).json({ message: 'Failed to update meeting' });
  }
};



/**
 * @swagger
 * /meetings/{id}:
 *   delete:
 *     summary: Delete a meeting by ID
 *     tags: [Meetings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Meeting ID
 *     responses:
 *       200:
 *         description: Successfully deleted meeting
 *       400:
 *         description: Invalid meeting ID
 *       404:
 *         description: Meeting not found
 *       500:
 *         description: Failed to delete meeting
 */
export const DeleteMeeting = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) {
      return res.status(400).json({ message: 'Invalid meeting ID' });
    }
    const deletedMeeting = await deleteMeeting(id);
    if (!deletedMeeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting meeting:', error);
    res.status(500).json({ message: 'Failed to delete meeting' });
  }
};

