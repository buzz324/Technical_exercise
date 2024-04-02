"use strict";
// errorMessages.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwCustomError = exports.CustomError = void 0;
class CustomError {
    constructor(statusCode, errorObject) {
        this.statusCode = statusCode;
        this.errorObject = errorObject || {};
    }
}
exports.CustomError = CustomError;
const throwCustomError = (statusCode, errorObject) => {
    return new CustomError(statusCode, errorObject);
};
exports.throwCustomError = throwCustomError;
