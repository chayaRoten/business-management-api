import express from 'express';
import * as usersController from '../controllers/user.controller';
const router = express.Router();

router.get('/users', usersController.GetUser)
router.post('/login',  usersController.loginUser)
router.post('/signUp', usersController.registerUser)

export default router;