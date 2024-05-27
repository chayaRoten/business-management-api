import express from 'express';
import * as usersController from '../controllers/user.controller';
const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a user
 *     responses:
 *       200:
 *         description: A single user object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   example: john@example.com
 *       500:
 *         description: Internal server error
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: error in fetch user
 */
router.post('/signin',  usersController.signIn)
router.post('/signup', usersController.signUp)
router.get('/users', usersController.Get)


export default router;