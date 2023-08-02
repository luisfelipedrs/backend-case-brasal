import { HttpStatus } from "./http-code";

export class ApiError extends Error {
    public readonly statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class BadRequestError extends ApiError {
    constructor(message: string) {
        super(message, HttpStatus.BAD_REQUEST);
    }
}

export class NotFoundError extends ApiError {
    constructor(message: string) {
        super(message, HttpStatus.NOT_FOUND);
    }
}

export class UnauthorizedError extends ApiError {
    constructor(message: string) {
        super(message, HttpStatus.UNAUTHORIZED);
    }
}