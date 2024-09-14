import express from 'express';
import * as businessController from '../controllers/business.controller';
import { checkAdminRole, authenticateToken } from '../middlewares/authentication.middlewares'

const router = express.Router();


router.get('/business', authenticateToken, checkAdminRole, businessController.GetBusiness)
router.post('/business', authenticateToken, checkAdminRole,  businessController.AddBusiness);
router.put('/business', authenticateToken, checkAdminRole,  businessController.UpdateBusiness);

export default router;