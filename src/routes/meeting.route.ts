import express from 'express';
import * as businessController from '../controllers/meeting.controller';
const router = express.Router();

router.get('/meetings', businessController.GetMeetings)

export default router;