import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface ExtRequest extends Request {
  authenticated: boolean;
}

export const validateJwtToken = (
  req: ExtRequest,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies('access-token');

  if (!accessToken)
    return res.status(400).json({ error: 'User not authenticated' });

  try {
    const isValidToken = verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET as string
    );

    if (isValidToken) {
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};
