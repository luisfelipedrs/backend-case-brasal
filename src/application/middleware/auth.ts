import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

const secret: string = process.env.JWT_SECRET || '12345';

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.split(' ')[1];

        if (!token) {
            throw new Error();
        }

        const decoded = jwt.verify(token, secret);
        (req as CustomRequest).token = decoded;

        next();

    } catch(err) {
        console.log(err)
        res.status(401).json({
            error: 'Please authenticate'
        });
    }
}