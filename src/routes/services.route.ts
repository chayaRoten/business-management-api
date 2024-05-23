import express from 'express';
import * as serviceController from '../controllers/services.controller';
const router = express.Router();

router.get('/services', serviceController.GetServices)
router.post('/services', serviceController.AddService);
router.put('/services/:serviceName', serviceController.UpdateService);
router.delete('/services/:serviceName', serviceController.DeleteService);

export default router;