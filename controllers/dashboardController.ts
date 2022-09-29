import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../model/User';
import { controllerErrorHandler } from '../helpers/controllerError';

const getDashboard = async (req: Request, res: Response) => {
  if (!req.user?.email) {
    return res.status(400).json({ message: 'No user email was provided' });
  }

  try {
    const repo = await AppDataSource.getRepository(User);
    const user = await repo.findOne({
      select: ['id', 'avatar', 'credentials', 'profiles', 'applications'],
      where: { credentials: { email: req.user?.email } },
    });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    return res.status(200).json({ ...user });
  } catch (err) {
    controllerErrorHandler({ err, res });
  }
};

export default {
  getDashboard,
};
