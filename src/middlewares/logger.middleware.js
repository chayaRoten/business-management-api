"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log4js_1 = __importDefault(require("log4js"));
log4js_1.default.configure({
    appenders: {
        file: { type: 'file', filename: 'logger.log' },
        console: { type: 'console' }
    },
    categories: {
        default: { appenders: ['file', 'console'], level: 'info' }
    }
});
const logger = log4js_1.default.getLogger();
const logMiddleware = (req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        const logMessage = `
Route: ${req.originalUrl}
Method: ${req.method}
Date: ${new Date().toISOString()}
Status: ${res.statusCode}
Duration: ${duration}ms
User: ${req.user ? req.user.username : 'Guest'}
Role: ${req.user ? req.user.role : 'user'}
`;
        logger.info(logMessage);
    });
    next();
};
exports.default = logMiddleware;
