import { Request, Response } from 'express';
import { getUsers } from './handlers';
import { GetUsersQuery } from './types';
import { errorMessages } from './errorMessages';

jest.mock('class-validator', () => ({
  validateOrReject: jest.fn(),
}));

jest.mock('class-validator', () => ({
  ...jest.requireActual('class-validator'),
  Length: jest.fn().mockImplementation(() => () => {}),
}));

describe('getUsers function', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = { query: {} };
    mockResponse = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis()
    };
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return matching users when valid surname is provided', async () => {
    const surname = 'Smith';
    mockRequest.query = { surname };

    const getUserQuery = new GetUsersQuery();
    getUserQuery.surname = surname;

    await getUsers(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith([
      { surname: 'Smith', firstName: 'John', email: 'john.smith@example.com' },
      { surname: 'Smith', firstName: 'Johns', email: 'john.smith@example.com' }
    ]);
  });

  it('should return 404 error when no matching users are found', async () => {
    const surname = 'NonExistent';
    mockRequest.query = { surname };

    const getUserQuery = new GetUsersQuery();
    getUserQuery.surname = surname;

    await getUsers(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith(errorMessages.noMatchingUsers);
  });

  
  it('should return 400 error when validation fails', async () => {
    const surname = undefined
    mockRequest.query = { surname };

    await getUsers(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(errorMessages.invalidSurname);
  });
})
