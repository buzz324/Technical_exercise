"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const handlers_1 = require("./handlers");
const types_1 = require("./types");
jest.mock('class-validator', () => ({
    validateOrReject: jest.fn(),
}));
jest.mock('class-validator', () => (Object.assign(Object.assign({}, jest.requireActual('class-validator')), { Length: jest.fn().mockImplementation(() => () => { }) })));
describe('getUsers function', () => {
    let mockRequest;
    let mockResponse;
    beforeEach(() => {
        mockRequest = { query: {} };
        mockResponse = {
            json: jest.fn().mockReturnThis(),
            status: jest.fn().mockReturnThis()
        };
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should return matching users when valid surname is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const surname = 'Smith';
        mockRequest.query = { surname };
        const getUserQuery = new types_1.GetUsersQuery();
        getUserQuery.surname = surname;
        yield (0, handlers_1.getUsers)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith([
            { surname: 'Smith', firstName: 'John', email: 'john.smith@example.com' },
            { surname: 'Smith', firstName: 'Johns', email: 'john.smith@example.com' }
        ]);
    }));
    it('should return 404 error when no matching users are found', () => __awaiter(void 0, void 0, void 0, function* () {
        const surname = 'NonExistent';
        mockRequest.query = { surname };
        const getUserQuery = new types_1.GetUsersQuery();
        getUserQuery.surname = surname;
        yield (0, handlers_1.getUsers)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'No matching users found' });
    }));
    it('should return 400 error when validation fails', () => __awaiter(void 0, void 0, void 0, function* () {
        const surname = undefined;
        mockRequest.query = { surname };
        yield (0, handlers_1.getUsers)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
    }));
});
