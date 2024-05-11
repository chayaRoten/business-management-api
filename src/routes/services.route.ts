import express from 'express';
import * as serviceController from '../controllers/services.controller';
const router = express.Router();

router.get('/services', serviceController.GetServices)
router.post('/services', serviceController.AddService);
router.put('/services/:serviceId', serviceController.UpdateService);
router.delete('/services/:serviceId', serviceController.DeleteService);

export default router;