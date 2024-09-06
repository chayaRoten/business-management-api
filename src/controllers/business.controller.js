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
exports.UpdateBusiness = exports.AddBusiness = exports.GetBusiness = void 0;
const business_service_1 = require("../services/business.service");
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
const GetBusiness = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const business = yield (0, business_service_1.getBusiness)();
        res.send(business);
    }
    catch (error) {
        console.error('Failed to get business:', error);
        res.status(500).send('Failed to get business');
    }
});
exports.GetBusiness = GetBusiness;
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
const AddBusiness = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, address, about, phone, email } = req.body;
        const newBusines = yield (0, business_service_1.addBusiness)(id, name, address, about, phone, email);
        res.send(newBusines);
    }
    catch (error) {
        console.error('Failed to add business:', error);
        res.status(500).send('Failed to add business');
    }
});
exports.AddBusiness = AddBusiness;
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
const UpdateBusiness = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, address, about, email, phone } = req.body;
        const newBusines = yield (0, business_service_1.updateBusiness)(id, name, address, about, phone, email);
        res.send(newBusines);
    }
    catch (error) {
        console.error('Failed to update business:', error);
        res.status(500).send('Failed to update business');
    }
});
exports.UpdateBusiness = UpdateBusiness;
