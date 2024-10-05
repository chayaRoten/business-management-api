import { Request, Response } from 'express';
import { getServices, getService, addService, updateService, deleteService } from '../services/services.service'

/**
 * @swagger
 * /services:
 *   get:
 *     summary: Get all services
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: List of services
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   cost:
 *                     type: number
 */
export const GetServices = async (req: Request, res: Response) => {
  try {
    const services = await getServices();
    res.send(services);
  } catch (error) {
    console.error('Error retrieving services:', error);
    res.status(500).send('Failed to retrieve services.');
  }
}


/**
 * @swagger
 * /service/{id}:
 *   get:
 *     summary: Get a service by ID
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The service ID
 *     responses:
 *       200:
 *         description: A service
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 cost:
 *                   type: number
 */
export const GetService = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const service = await getService(id);
    if (!service) {
      return res.status(404).send('Service not found.');
  }
    res.send(service);
  } catch (error) {
    console.error('Error retrieving service:', error);
    res.status(500).send('Failed to retrieve service.');
  }
}



/**
 * @swagger
 * /services:
 *   post:
 *     summary: Add a new service
 *     tags: [Services]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - cost
 *             properties:
 *               name:
 *                 type: string
 *               cost:
 *                 type: number
 *     responses:
 *       201:
 *         description: The service was successfully created
 */
export const AddService = async (req: Request, res: Response) => {
  try {
    const { name, cost } = req.body;
    if (!name || !cost) {
      return res.status(400).send('Both name and cost are required.');
    }
    const newService = await addService(name, cost);
    res.status(201).send(newService);
  } catch (error) {
    console.error('Error adding service:', error);
    res.status(500).send('Failed to add service.');
  }
};



/**
 * @swagger
 * /services/{id}:
 *   put:
 *     summary: Update an existing service
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The service ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - cost
 *             properties:
 *               name:
 *                 type: string
 *               cost:
 *                 type: number
 *     responses:
 *       200:
 *         description: The service was successfully updated
 */
export const UpdateService = async (req: Request, res: Response) => {
  try {
    const id =  Number(req.params.id);
    const { name, cost } = req.body;
    if (!name || !cost) {
      return res.status(400).send('Name and cost are required.');
    }
    const updatedService = await updateService(id, name, cost);
    res.send(updatedService);
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).send('Failed to update service.');
  }
};



/**
 * @swagger
 * /services/{id}:
 *   delete:
 *     summary: Delete a service
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The service ID
 *     responses:
 *       200:
 *         description: The service was successfully deleted
 */
export const DeleteService = async (req: Request, res: Response) => {
  try {
    const id  = Number(req.params.id);
    if (!id) {
      return res.status(400).send('Service ID is required.');
    }
    const deletedService = await deleteService(id);
    res.send(deletedService);
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).send('Failed to delete service.');
  }
};
