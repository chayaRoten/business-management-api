import express from 'express';
import * as usersController from '../controllers/user.controller';
const router = express.Router();

router.get('/users', usersController.GetUser)

export default router;