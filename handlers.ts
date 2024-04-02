import { Request, Response } from 'express';
import { users } from './usersData';
import { GetUsersQuery} from './types';
import { validateOrReject } from 'class-validator';
import { errorMessages } from './errorMessages';

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
  let getUserQuery = new GetUsersQuery()

  const surname = req.query.surname as string;
  getUserQuery.surname = surname ;

  try {
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