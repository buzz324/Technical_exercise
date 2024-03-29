import { Request, Response } from 'express';
import { users } from './usersData';

export const getUsers = (req: Request, res: Response) => {
  const surname = req.query.surname;
  if (typeof surname !== 'string') {
    return res.status(404).json({ error: 'Bad request' });
  }

  const matchingUsers = users.filter(user => user.surname.toLowerCase() === surname.toLowerCase());
  if (matchingUsers.length === 0) {
    return res.status(400).json({ error: 'No matching users found' });
  }
  res.status(200).json(matchingUsers);
}