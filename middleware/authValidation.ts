import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

const authValidation = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    async (err: any, decoded: any) => {
      if (err) return res.sendStatus(403);
      // cb after decoded
      req.user = decoded;
      next();
    }
  );
};

export default authValidation;
