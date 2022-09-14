import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../model/User';
import { controllerErrorHandler } from '../helpers/controllerError';

export const getUserRepo = async () => {
  const repo = await AppDataSource.getRepository(User);
  return repo;
};

const getUser = async (req: Request, res: Response) => {
  if (!req.params.email) {
    return res.status(400).json({ message: 'No user email was provided' });
  }

  try {
    const repo = await getUserRepo();
    const user = repo.findOne({
      where: {
        email: req.params.email,
      },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: `User ${req.params.id} not found` });
    }
    return res.status(200).json(user);
  } catch (err) {
    controllerErrorHandler({ err, res });
  }

  res.sendStatus(200); // TODO: everything to be cleaned
};

export default {
  getUser,
};
