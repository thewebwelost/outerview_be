import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../model/User';
import { controllerErrorHandler } from '../helpers/controllerError';
import { AppDataSource } from '../data-source';

const createUser = async (req: Request, res: Response) => {
  const { username, email, password, rememberMe } = req.body;

  console.log({ username, email, password });

  if (!username || !password || !email)
    return res
      .status(400)
      .json({ message: 'Name, email or password is missing' });

  const duplicate = await AppDataSource.getRepository(User).findOneBy({
    email,
  });
  if (duplicate) return res.sendStatus(409); // Conflict

  try {
    // encrypting password
    const hashedPwd = await bcrypt.hash(password, 10);
    // create and store new user
    const user = await AppDataSource.getRepository(User).create({
      username,
      email,
      password: hashedPwd,
    });
    await AppDataSource.getRepository(User).save(user);

    res.status(201).json({ success: `User ${username} added` });
  } catch (err) {
    controllerErrorHandler({ err, res });
  }
};

export default {
  createUser,
};
