import express from 'express';
import * as usersController from '../controllers/user.controller';

const router = express.Router();

router.post('/signin',  usersController.signIn)
router.post('/signup', usersController.signUp)
router.get('/users', usersController.Get)


export default router;