import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../model/User';

const createUser = async (req: Request, res: Response) => {
  const { username, email, password, rememberMe } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: 'Name or password missing' });

  const duplicate = await User.findOneBy({ email });
  if (duplicate) return res.sendStatus(409); // Conflict

  try {
    // encrypting password
    const hashedPwd = await bcrypt.hash(password, 10);
    // create and store new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPwd,
    });

    res.status(201).json({ success: `User ${newUser.username} added` });
  } catch (err) {
    let message = 'Unknown Error';
    if (err instanceof Error) message = err.message;
    res.status(500).json({ message });
  }

  res.sendStatus(200); // TODO: everything to be cleaned
};

export default {
  createUser,
};
