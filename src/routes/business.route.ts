import express from 'express';
import * as businessController from '../controllers/business.controller';
import { checkAdminRole, authenticateToken } from '../middlewares/authentication.middlewares'

const router = express.Router();


router.get('/business', checkAdminRole, authenticateToken, businessController.GetBusiness)
router.post('/business', checkAdminRole, authenticateToken, businessController.AddBusiness);
router.put('/business', checkAdminRole, authenticateToken, businessController.UpdateBusiness);

export default router;