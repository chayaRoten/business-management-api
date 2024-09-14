import express from 'express';
import * as businessController from '../controllers/meeting.controller';
import { checkAdminRole, authenticateToken } from '../middlewares/authentication.middlewares'

const router = express.Router();

router.get('/meetings', businessController.GetMeetings)
router.get('/meeting/:id', authenticateToken, businessController.GetMeeting)
router.post('/meetings', authenticateToken, businessController.AddMeeting);
router.put('/meetings/:id', authenticateToken, checkAdminRole, businessController.UpdateMeeting);
router.delete('/meetings/:id', authenticateToken, businessController.DeleteMeeting);


export default router;