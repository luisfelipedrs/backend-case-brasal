import { NextFunction, Request, Response } from "express";
import { ApiError } from "../util/api-error";

export const errorHandler = (
    error: Error & Partial<ApiError>,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = error.statusCode ?? 500;
    const message = error.statusCode ? error.message : 'Interal Server Error';
    return res.status(statusCode).json({ message });
}