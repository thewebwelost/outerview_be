import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader?.split(' ')[0];
    let decodedUser;
    if (accessToken && accessToken !== 'undefined') {
      decodedUser = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET as string
      );
    }
    next();
  } catch {
    res.status(401).json({
      error: new Error('Invalid access token'),
    });
  }
}
