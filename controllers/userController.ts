import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../model/User';

const getUserById = async (id: number) => {
  if (!id) return new Error('No user id provided');

  try {
    const userRepo = await AppDataSource.getRepository(User);
    const user = userRepo.findOneBy({
      id,
    });

    return user;
  } catch (err) {
    let message = 'Unknown Error';
    if (err instanceof Error) message = err.message;
    throw new Error('Failed to get user' + message);
  }
};

const updateUser = (req: Request, res: Response) => {};

export default {
  getUserById,
  updateUser,
};
