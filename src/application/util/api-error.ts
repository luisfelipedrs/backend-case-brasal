export enum HttpError {
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
}

export class ApiError extends Error {
    public readonly statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class BadRequestError extends ApiError {
    constructor(message: string) {
        super(message, HttpError.BAD_REQUEST);
    }
}

export class NotFoundError extends ApiError {
    constructor(message: string) {
        super(message, HttpError.NOT_FOUND);
    }
}

export class UnauthorizedError extends ApiError {
    constructor(message: string) {
        super(message, HttpError.UNAUTHORIZED);
    }
}