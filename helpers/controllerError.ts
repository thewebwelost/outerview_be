import { Response } from 'express';

export const controllerErrorHandler = ({
  err,
  res,
}: {
  err: unknown;
  res: Response;
}) => {
  let message = 'Unknown Error';
  if (err instanceof Error) message = err.message;
  res.status(500).json({ message });
};
