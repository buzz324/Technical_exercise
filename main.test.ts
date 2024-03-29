import { Request, Response } from 'express';
import { getUsers } from './handlers';

describe('getUsers function', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

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

    getUsers(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.json).toHaveBeenCalledWith([
      { surname: 'Smith', firstName: 'John', email: 'john.smith@example.com' },
    ]);
  });

  it('should return 400 error when no surname is provided', () => {
    mockRequest = { query: {surname: undefined} };
    getUsers(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Bad request' });
  });

  it('should return 400 error when no matching users are found', () => {
    const surname = 'NonExistent';
    mockRequest.query = { surname };

    getUsers(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'No matching users found' });
  });
});
