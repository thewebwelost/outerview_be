import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { AppDataSource } from './data-source';
import corsOptions from './config/corsOptions';
import credentials from './middleware/credentials';
import register from './routes/register';
import auth from './routes/auth';
import refresh from './routes/refresh';
import logout from './routes/logout';
import dashboard from './routes/dashboard';
import authValidation from './middleware/authValidation';

const PORT = process.env.APP_PORT || 8080;

AppDataSource.initialize()
  .then(() => console.log('Connected to the database'))
  .catch((error) => console.log(error));

const app = express();

app.use(cookieParser());
app.use(credentials);
app.use(cors(corsOptions()));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routing
app.use('/register', register);
app.use('/auth', auth);
app.use('/refresh', refresh);
app.use('/logout', logout);
app.use('/dashboard', authValidation, dashboard);

app.all('*', (req, res) => {
  console.log('[Unknowr request]', req);
  res.status(404).send('[server]: Unknown request!'); // TODO: deal with 404
});

// error logging
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('[server]: Something broke!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
