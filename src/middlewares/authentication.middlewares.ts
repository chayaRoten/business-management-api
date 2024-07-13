/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


interface AuthRequest extends Request {
    user?: any;
}

const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY || '')
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
}


const checkAdminRole = (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    console.log("user  "+ user);
    
    if (user && user.role === 'admin') {
        next();
    } else {
        return res.status(403).send("You are not authorized to perform this action");
    }
}

export { authenticateToken, checkAdminRole };

