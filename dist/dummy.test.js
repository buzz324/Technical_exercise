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
// jest.mock('class-validator', () => ({
//   validateOrReject: jest.fn(),
// }));
// jest.mock('class-validator', () => ({
//   ...jest.requireActual('class-validator'),
//   Length: jest.fn().mockImplementation(() => () => {}),
// }));
describe('getUsers function', () => {
    let mockRequest;
    let mockResponse;
    beforeEach(() => {
        mockRequest = { query: {} };
        mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should return matching users when valid surname is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const surname = 'Smith';
        mockRequest.query = { surname };
        yield (0, handlers_1.getUsers)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith([
            { surname: 'Smith', firstName: 'John', email: 'john.smith@example.com' },
            { surname: 'Smith', firstName: 'Johns', email: 'john.smith@example.com' }
        ]);
    }));
    //   it('should return 404 error when no matching users are found', async () => {
    //     const surname = 'NonExistent';
    //     mockRequest.query = { surname };
    //     const getUserQuery = new GetUsersQuery();
    //     getUserQuery.surname = surname;
    //     await getUsers(mockRequest as Request, mockResponse as Response);
    //     expect(mockResponse.status).toHaveBeenCalledWith(404);
    //     expect(mockResponse.json).toHaveBeenCalledWith({ message: 'No matching users found' });
    //   });
    //   it('should return 400 error when validation fails', async () => {
    //     const surname = ""
    //     mockRequest.query = { surname };
    //     const getUserQuery = new GetUsersQuery();
    //     getUserQuery.surname = surname;
    //     const errors = ['Surname must be between 1 and 100 characters'];
    //     let e: any;
    //     let result;
    //     try {
    //       await getUsers(mockRequest as Request, mockResponse as Response);
    //     } catch(error){
    //       e = error;
    //     }
    //     expect(e.status).toEqual(400);
    //     expect(e.json).toEqual(errors);
    //   });
});
