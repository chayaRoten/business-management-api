/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authenticateToken = (req: Request | any, res: Response, next: NextFunction) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"] || req.headers['authorization'];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY || '')
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();


}

export default authenticateToken;
