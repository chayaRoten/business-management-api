import express from 'express';
import * as businessController from '../controllers/meeting.controller';
const router = express.Router();

router.get('/meetings', businessController.GetMeetings)
router.post('/meetings', businessController.AddMeeting);
router.put('/meetings/:meetingsId', businessController.UpdateMeeting);
router.delete('/meetings/:meetingsId', businessController.DeleteMeeting);


export default router;