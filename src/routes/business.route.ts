import express from 'express';
import * as businessController from '../controllers/business.controller';
import {checkAdminRole}  from '../middlewares/authentication.middlewares'

const router = express.Router();


router.get('/business',checkAdminRole, businessController.GetBusiness)
router.post('/business',checkAdminRole, businessController.AddBusiness);
router.put('/business',checkAdminRole, businessController.UpdateBusiness);

export default router;