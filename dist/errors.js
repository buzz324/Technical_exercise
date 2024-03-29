"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.NotFoundError = exports.BadRequestError = void 0;
class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name; // Ensures that the error name is set correctly
        this.status = 400;
    }
}
exports.BadRequestError = BadRequestError;
class NotFoundError extends Error {
    constructor(message = 'Not Found') {
        super(message);
        this.name = this.constructor.name;
        this.status = 404;
        this.message = message;
    }
}
exports.NotFoundError = NotFoundError;
class InternalServerError extends Error {
    constructor(message = 'Internal Server Error') {
        super(message);
        this.name = this.constructor.name;
        //   this.status = 500;
    }
}
exports.InternalServerError = InternalServerError;
