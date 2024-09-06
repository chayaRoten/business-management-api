"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAdminRole = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    if (!token) {
        return res.sendStatus(401);
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_KEY || '');
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(401).send("Invalid Token");
    }
};
exports.authenticateToken = authenticateToken;
const checkAdminRole = (req, res, next) => {
    const user = req.user;
    console.log("user  " + user);
    if (user && user.role === 'admin') {
        next();
    }
    else {
        return res.status(403).send("You are not authorized to perform this action");
    }
};
exports.checkAdminRole = checkAdminRole;
