import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

const authValidation = (req: Request, res: Response, next: NextFunction) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.sendStatus(401);
  }

  verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    async (err: any, decoded: any) => {
      console.log('decoded', decoded);
      if (err) return res.sendStatus(403);
    }
  );

  next();
};

export default authValidation;
