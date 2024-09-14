import express from 'express';
import * as serviceController from '../controllers/services.controller';
import { checkAdminRole, authenticateToken } from '../middlewares/authentication.middlewares'

const router = express.Router();

router.get('/services', serviceController.GetServices)
router.get('/service/:id', checkAdminRole, authenticateToken, serviceController.GetService)
router.post('/services',authenticateToken, checkAdminRole, serviceController.AddService);
router.put('/services/:id', authenticateToken, checkAdminRole,  serviceController.UpdateService);
router.delete('/services/:id', authenticateToken, checkAdminRole, serviceController.DeleteService);

export default router;