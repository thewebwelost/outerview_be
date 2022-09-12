import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { controllerErrorHandler } from '../helpers/controllerError';
import { getUserRepo } from './userController';

const createUser = async (req: Request, res: Response) => {
  const { username, email, password, rememberMe } = req.body;

  if (!username || !password || !email)
    return res
      .status(400)
      .json({ message: 'Name, email or password is missing' });

  const repo = await getUserRepo();
  const duplicate = await repo.findOne({
    where: { email },
  });

  if (duplicate) return res.sendStatus(409); // Conflict

  try {
    // encrypting password
    const hashedPwd = await bcrypt.hash(password, 10);
    // create and store new user
    const user = repo.create({
      username,
      email,
      password: hashedPwd,
    });
    await repo.save(user);

    res.status(201).json({
      success: `User ${username} added`,
    });
  } catch (err) {
    controllerErrorHandler({ err, res });
  }
};

export default {
  createUser,
};
