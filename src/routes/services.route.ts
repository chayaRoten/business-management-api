import express from 'express';
import * as serviceController from '../controllers/services.controller';
const router = express.Router();

router.get('/services', serviceController.GetServices)
router.get('/service/:id', serviceController.GetService)
router.post('/services', serviceController.AddService);
router.put('/services/:id', serviceController.UpdateService);
router.delete('/services/:id', serviceController.DeleteService);

export default router;