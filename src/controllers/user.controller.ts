/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { getUsers, signup, signin } from '../services/user.service'


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
