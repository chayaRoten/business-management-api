import express from 'express';
import * as businessController from '../controllers/meeting.controller';
const router = express.Router();

router.get('/meetings', businessController.GetMeetings)
router.post('/meetings', businessController.AddMeeting);
router.put('/meetings/:meetingId', businessController.UpdateMeeting);
router.delete('/meetings/:meetingId', businessController.DeleteMeeting);


export default router;