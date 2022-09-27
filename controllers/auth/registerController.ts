import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { controllerErrorHandler } from '../../helpers/controllerError';
import { AppDataSource } from '../../data-source';
import { User } from '../../model/User';

const createUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !password || !email)
    return res
      .status(400)
      .json({ message: 'Name, email or password is missing' });
  // we check if user already exists
  const repo = await AppDataSource.getRepository(User);
  const duplicate = await repo.findOne({
    where: { email },
  });
  // send conflict error if user exists
  if (duplicate) return res.sendStatus(409); // Conflict

  // otherwise create new user from provided data
  try {
    const hashedPwd = await bcrypt.hash(password, 10);
    const user = repo.create({
      username,
      email,
      password: hashedPwd,
    });
    await repo.save(user);
    // send created user to client
    res.status(201).json({
      success: `User ${username} added`,
      user,
    });
  } catch (err) {
    controllerErrorHandler({ err, res });
  }
};

export default {
  createUser,
};
