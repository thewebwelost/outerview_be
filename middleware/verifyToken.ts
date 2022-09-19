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
      jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string, () =>
        next()
      );
    }

    return res.status(403).json({
      error: 'ERROR: Could not connect to the protected route',
    });
  } catch (error) {
    return res.status(401).json({ error });
  }
}
