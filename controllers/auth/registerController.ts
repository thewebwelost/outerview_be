import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { controllerErrorHandler } from '../../helpers/controllerError';
import { AppDataSource } from '../../data-source';
import { User } from '../../model/User';
import { Credentials } from '../../model/Credentials';

const createUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !password || !email)
    return res
      .status(400)
      .json({ message: 'Name, email or password is missing' });
  // we check if user already exists
  const repo = await AppDataSource.getRepository(User);
  // const duplicate = await repo.findOne({
  //   relations: ['credentials'],
  //   where: { credentials: { email } },
  // });

  const duplicate = await repo
    .createQueryBuilder('user')
    // .leftJoin('user.credentials', 'credentials')
    .select('user')
    // .where('credentials.email = :email', { email })
    .getOne();

  console.log('***duplicate***', duplicate);

  // send conflict error if user exists
  if (duplicate) return res.sendStatus(409); // Conflict

  // otherwise create new user from provided data
  try {
    const hashedPwd = await bcrypt.hash(password, 10);

    const creds = new Credentials();
    creds.username = username;
    creds.email = email;
    creds.password = hashedPwd;

    const user = new User();
    user.credentials = creds;

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
