import { Request, Response } from 'express';
import { users } from './usersData';
import { GetUsersQuery} from './types';
import { validateOrReject } from 'class-validator';
import { errorMessages } from './errorMessages';

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
  const getUserQuery = new GetUsersQuery()
  const { surname } = req.query;
  
  if (typeof surname !== 'string') {
    return res.status(400).json(errorMessages.invalidSurname);
  }

  try {
    getUserQuery.surname = surname;
    await validateOrReject(getUserQuery);
  } catch (errors) {
    return res.status(400).json(errorMessages.invalidSurname);
  }

  const matchingUsers = users.filter(user => user.surname.toLowerCase() === surname.toLowerCase());
  if (!matchingUsers.length) {
    return res.status(404).json(errorMessages.noMatchingUsers);
  }
  return res.status(200).json(matchingUsers);
}