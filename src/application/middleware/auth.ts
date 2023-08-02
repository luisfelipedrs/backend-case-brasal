import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError, UnauthorizedError } from '../util/api-error';

const secret: string = process.env.JWT_SECRET || '12345';

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.split(' ')[1];

        if (!token) {
            throw new BadRequestError('Token não informado');
        }

        const decoded = jwt.verify(token, secret);
        (req as CustomRequest).token = decoded;

        next();

    } catch(err) {
        throw new UnauthorizedError('Usuário não autenticado');
    }
}