/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import log4js from 'log4js';

log4js.configure({
    appenders: {
        file: { type: 'file', filename: 'logger.log' },
        console: { type: 'console' }
    },
    categories: {
        default: { appenders: ['file', 'console'], level: 'info' }
    }
});

const logger = log4js.getLogger();

const logMiddleware = (req: Request | any, res: Response, next: NextFunction): void => {
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

export default logMiddleware;
