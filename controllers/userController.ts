import { Request, Response } from 'express';
import { User } from '../model/User';

const getUser = async (req: Request, res: Response) => {
  if (!req.params.email) {
    return res.status(400).json({ message: 'No user Id was provided' });
  }

  try {
    const user = await User.findOneBy({
      email: req.params.email,
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: `User ${req.params.id} not found` });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
  }

  res.sendStatus(200); // TODO: everything to be cleaned
};

export default {
  getUser,
};
