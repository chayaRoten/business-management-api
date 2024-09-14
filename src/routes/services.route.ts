import express from 'express';
import * as serviceController from '../controllers/services.controller';
import { checkAdminRole, authenticateToken } from '../middlewares/authentication.middlewares'

const router = express.Router();

router.get('/services', serviceController.GetServices)
router.get('/service/:id', checkAdminRole, authenticateToken, serviceController.GetService)
router.post('/services', checkAdminRole, authenticateToken, serviceController.AddService);
router.put('/services/:id', checkAdminRole, authenticateToken, serviceController.UpdateService);
router.delete('/services/:id', checkAdminRole, authenticateToken, serviceController.DeleteService);

export default router;