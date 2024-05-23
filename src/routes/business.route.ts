import express from 'express';
import * as businessController from '../controllers/business.controller';
const router = express.Router();


router.get('/business', businessController.GetBusiness)
router.post('/business', businessController.AddBusiness);
router.put('/business', businessController.UpdateCategory);

export default router;