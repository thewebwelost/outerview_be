import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { AppDataSource } from './data-source';
import corsOptions from './config/corsOptions';
import credentials from './middleware/credentials';
import { register, login, refresh, logout, dashboard } from './routes';
import verifyToken from './middleware/verifyAuthorization';

const PORT = process.env.BASE_PORT!;

const app = express();
// express middlewares
app.use(cookieParser());
app.use(credentials);
app.use(cors(corsOptions()));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// auth routes
app.use('/register', register);
app.use('/login', login);
app.use('/refresh', refresh);
app.use('/logout', logout);
// must be protected
app.use('/dashboard', verifyToken, dashboard);

// all unknown requests will error 404
app.all('*', (req, res) => {
  console.log('[Unknowr request]', req);
  res.status(404).send('[server]: Unknown request!'); // TODO: deal with 404
});

// error logging
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('[server]: Something broke!');
});

// connect to DB and start the server
AppDataSource.initialize()
  .then(() => {
    console.log('Connected to the database');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.log(error));
