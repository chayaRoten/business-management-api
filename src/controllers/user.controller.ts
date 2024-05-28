/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { getUsers, signup, signin } from '../services/user.service'




/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The user ID
 *                     example: 1
 *                   username:
 *                     type: string
 *                     description: The username
 *                     example: john_doe
 *                   email:
 *                     type: string
 *                     description: The email address
 *                     example: john@example.com
 *                   role:
 *                     type: string
 *                     description: The role of the user
 *                     example: user
 *       500:
 *         description: Internal server error
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Error in fetching users
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
 * /users/signin:
 *   post:
 *     summary: Sign in user
 *     description: Sign in an existing user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 description: The password of the user
 *                 example: password123
 *               username:
 *                 type: string
 *                 description: The username of the user
 *                 example: john_doe
 *     responses:
 *       200:
 *         description: A token for authentication
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Bearer <token>
 *       500:
 *         description: Internal server error
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Error in login
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

// *     security:
// *       - bearerAuth: []


/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Sign up user
 *     description: Sign up a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 description: The password of the user
 *                 example: password123
 *               username:
 *                 type: string
 *                 description: The username of the user
 *                 example: john_doe
 *     responses:
 *       200:
 *         description: A token for authentication
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Bearer <token>
 *       500:
 *         description: Internal server error
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Error in signup
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
