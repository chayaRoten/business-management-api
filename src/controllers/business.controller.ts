import { Request, Response } from 'express';
import { getBusiness, addBusiness, updateBusiness } from '../services/business.service'


/**
 * @swagger
 * /business:
 *   get:
 *     summary: Get all businesses
 *     tags: [Business]
 *     responses:
 *       200:
 *         description: Successfully retrieved businesses
 *       500:
 *         description: Failed to retrieve businesses
 */
export const GetBusiness = async (req: Request, res: Response) => {
  try {
    const business = await getBusiness()
    res.send(business)
  } catch (error) {
    console.error('Failed to get business:', error);
    res.status(500).send('Failed to get business');
  }
}



/**
 * @swagger
 * /business:
 *   post:
 *     summary: Add a new business
 *     tags: [Business]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - address
 *               - about
 *               - phone
 *               - email
 *             properties:
 *               id:
 *                 type: integer
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               about:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully added business
 *       500:
 *         description: Failed to add business
 */
export const AddBusiness = async (req: Request, res: Response) => {
  try {
    const { id, name, address, about, phone, email } = req.body;
    const newBusines = await addBusiness(id, name, address, about, phone ,email);
    res.send(newBusines);
  } catch (error) {
    console.error('Failed to add business:', error);
    res.status(500).send('Failed to add business');
  }
};



/**
 * @swagger
 * /business:
 *   put:
 *     summary: Update an existing business
 *     tags: [Business]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - address
 *               - about
 *               - phone
 *               - email
 *             properties:
 *               id:
 *                 type: integer
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               about:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated business
 *       500:
 *         description: Failed to update business
 */
export const UpdateBusiness = async (req: Request, res: Response) => {
  try {
    const { id, name, address, about, email , phone } = req.body;
    const newBusines = await updateBusiness(id, name, address, about, phone , email);
    res.send(newBusines);
  } catch (error) {
    console.error('Failed to update business:', error);
    res.status(500).send('Failed to update business');
  }
};