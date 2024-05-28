import express from 'express';
import * as serviceController from '../controllers/services.controller';
import {checkAdminRole}  from '../middlewares/authentication.middlewares'

const router = express.Router();

router.get('/services',checkAdminRole, serviceController.GetServices )
router.get('/service/:id',checkAdminRole, serviceController.GetService)
router.post('/services',checkAdminRole, serviceController.AddService);
router.put('/services/:id',checkAdminRole, serviceController.UpdateService);
router.delete('/services/:id',checkAdminRole, serviceController.DeleteService);

export default router;