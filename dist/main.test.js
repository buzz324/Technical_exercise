"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handlers_1 = require("./handlers");
describe('getUsers function', () => {
    let mockRequest;
    let mockResponse;
    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
    });
    it('should return matching users when valid surname is provided', () => {
        const surname = 'Smith';
        mockRequest.query = { surname };
        (0, handlers_1.getUsers)(mockRequest, mockResponse);
        expect(mockResponse.json).toHaveBeenCalledWith([
            { surname: 'Smith', firstName: 'John', email: 'john.smith@example.com' },
        ]);
    });
    it('should return 400 error when no surname is provided', () => {
        mockRequest = { query: { surname: undefined } };
        (0, handlers_1.getUsers)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Bad request' });
    });
    it('should return 400 error when no matching users are found', () => {
        const surname = 'NonExistent';
        mockRequest.query = { surname };
        (0, handlers_1.getUsers)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'No matching users found' });
    });
});
