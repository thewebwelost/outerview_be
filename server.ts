import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import connectDB from './config/dbConnection';
import corsOptions from './config/corsOptions';
import credentials from './middleware/credentials';
import register from './routes/register';
import auth from './routes/auth';
import refresh from './routes/refresh';
import logout from './routes/logout';

const PORT = process.env.PORT || 8080;

connectDB();
const app = express();

app.use(credentials);
app.use(cors(corsOptions()));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routing
app.use('/register', register);
app.use('/auth', auth);
app.use('/refresh', refresh);
app.use('/logout', logout);

app.all('*', (req, res) => {
  res.status(404).send(); // TODO: deal with 404
});

// error logging
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('[server]: Something broke!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
