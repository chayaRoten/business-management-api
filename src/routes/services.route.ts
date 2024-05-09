import express from 'express';
import * as serviceController from '../controllers/services.controller';
const router = express.Router();

router.get('/services', serviceController.GetServices)

export default router;