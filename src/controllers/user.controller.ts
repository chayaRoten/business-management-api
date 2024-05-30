/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { getUsers, signup, signin } from '../services/user.service'




/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 */

export const Get = async (req: Request, res: Response) => {
  try {
    const user = await getUsers()
    res.send(user)
  }
  catch (error: any) {
    console.error(`error in fetch user ${error.message}`);
    res.status(500).send('error in fetch user');
  }
}


/**
 * @swagger
 * /signin:
 *   post:
 *     summary: Sign in and receive a token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - username
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               username:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Bearer <token>
 */

export const signIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, username } = req.body;
    const result = await signin(email, password, username);
    res.send(result);
  } catch (error: any) {
    console.log(`error in log in ${error.message}`);
    res.status(500).send('error in log in');
  }
};

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Sign up and create a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - username
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               username:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created and token returned
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Bearer <token>
 */

export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, username } = req.body;
    const result = await signup(email, password, username);
    res.send(result);
  } catch (error: any) {
    console.log(`error in sign in ${error.message}`);
    res.status(500).send('error in sign in');
  }
};
