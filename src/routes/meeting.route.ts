import express from 'express';
import * as businessController from '../controllers/meeting.controller';
import {checkAdminRole}  from '../middlewares/authentication.middlewares'

const router = express.Router();

router.get('/meetings', businessController.GetMeetings)
router.get('/meeting/:id', businessController.GetMeeting)
router.post('/meetings', businessController.AddMeeting);
router.put('/meetings/:id',checkAdminRole, businessController.UpdateMeeting);
router.delete('/meetings/:id', businessController.DeleteMeeting);


export default router;