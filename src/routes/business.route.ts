import express from 'express';
import * as businessController from '../controllers/business.controller';
const router = express.Router();


router.get('/business', businessController.GetBusiness)

export default router;