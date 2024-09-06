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
exports.signUp = exports.signIn = exports.Get = void 0;
const user_service_1 = require("../services/user.service");
// /**
//  * @swagger
//  * /users:
//  *   get:
//  *     summary: Get all users
//  *     tags: [Users]
//  *     responses:
//  *       200:
//  *         description: List of users
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 type: object
//  *                 properties:
//  *                   id:
//  *                     type: integer
//  *                   username:
//  *                     type: string
//  *                   email:
//  *                     type: string
//  */
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
  *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
const Get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_service_1.getUsers)();
        res.send(user);
    }
    catch (error) {
        console.error(`error in fetch user ${error.message}`);
        res.status(500).send('error in fetch user');
    }
});
exports.Get = Get;
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
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, username } = req.body;
        const result = yield (0, user_service_1.signin)(email, password, username);
        res.send(result);
    }
    catch (error) {
        console.log(`error in log in ${error.message}`);
        res.status(500).send('error in log in');
    }
});
exports.signIn = signIn;
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
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, username } = req.body;
        const result = yield (0, user_service_1.signup)(email, password, username);
        res.send(result);
    }
    catch (error) {
        console.log(`error in sign in ${error.message}`);
        res.status(500).send('error in sign in');
    }
});
exports.signUp = signUp;
