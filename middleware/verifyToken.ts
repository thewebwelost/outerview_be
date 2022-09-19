import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader?.split(' ')[1];

    if (accessToken && accessToken !== 'undefined') {
      jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string);
      next();
    }
  } catch {
    return res.status(401).json({
      error: new Error('Invalid access token'),
    });
  }
}
