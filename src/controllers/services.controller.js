"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteService = exports.UpdateService = exports.AddService = exports.GetService = exports.GetServices = void 0;
const services_service_1 = require("../services/services.service");
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
const GetServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const services = yield (0, services_service_1.getServices)();
        res.send(services);
    }
    catch (error) {
        console.error('Error retrieving services:', error);
        res.status(500).send('Failed to retrieve services.');
    }
});
exports.GetServices = GetServices;
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
const GetService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const service = yield (0, services_service_1.getService)(id);
        res.send(service);
    }
    catch (error) {
        console.error('Error retrieving service:', error);
        res.status(500).send('Failed to retrieve service.');
    }
});
exports.GetService = GetService;
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
const AddService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, cost } = req.body;
        if (!name || !cost) {
            res.status(400).send('Name and cost are required.');
            return;
        }
        const newService = yield (0, services_service_1.addService)(name, cost);
        res.send(newService);
    }
    catch (error) {
        console.error('Error adding service:', error);
        res.status(500).send('Failed to add service.');
    }
});
exports.AddService = AddService;
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
const UpdateService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const { name, cost } = req.body;
        if (!name || !cost) {
            res.status(400).send('Name and cost are required.');
            return;
        }
        const updatedService = yield (0, services_service_1.updateService)(id, name, cost);
        res.send(updatedService);
    }
    catch (error) {
        console.error('Error updating service:', error);
        res.status(500).send('Failed to update service.');
    }
});
exports.UpdateService = UpdateService;
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
const DeleteService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        if (!id) {
            res.status(400).send('serviceName is required.');
            return;
        }
        const deletedService = yield (0, services_service_1.deleteService)(id);
        res.send(deletedService);
    }
    catch (error) {
        console.error('Error deleting service:', error);
        res.status(500).send('Failed to delete service.');
    }
});
exports.DeleteService = DeleteService;
