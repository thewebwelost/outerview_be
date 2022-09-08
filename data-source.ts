import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Application } from './model/Application';
import { Company } from './model/Company';
import { Contact } from './model/Contact';
import { Education } from './model/Education';
import { Event } from './model/Event';
import { Experience } from './model/Experience';
import { Job } from './model/Job';
import { Link } from './model/Link';
import { Profile } from './model/Profile';
import { User } from './model/User';

const port: number = parseInt(<string>process.env.DB_PORT, 10) || 3000;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: port,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [
    Application,
    Company,
    Contact,
    Education,
    Event,
    Experience,
    Job,
    Link,
    Profile,
    User,
  ],
  subscribers: [],
  migrations: [],
});

export const connectDb = () =>
  AppDataSource.initialize()
    .then(() => console.log('Connected to the database'))
    .catch((error) => console.log(error));
