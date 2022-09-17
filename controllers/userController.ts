import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../model/User';
import { controllerErrorHandler } from '../helpers/controllerError';

export const getUserRepo = async () => {
  const repo = await AppDataSource.getRepository(User);
  return repo;
};

const getUser = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);

  console.log('[cookies.jwt]', cookies.jwt);

  if (!req.body.email) {
    return res.status(400).json({ message: 'No user email was provided' });
  }

  try {
    const repo = await getUserRepo();
    const user = await repo.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: `User ${req.body.email} not found` });
    }
    return res.status(200).json(user);
  } catch (err) {
    controllerErrorHandler({ err, res });
  }
};

export default {
  getUser,
};
