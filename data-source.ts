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
import { Social } from './model/Social';
import { UserCredentials } from './model/UserCredentials';

const dbport = process.env.DB_PORT!;
const username = process.env.DB_USER!;
const password = process.env.DB_PASSWORD!;
const database = process.env.DB_NAME!;

const port: number = parseInt(<string>dbport, 10);

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: port,
  username,
  password,
  database,
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
    Social,
    UserCredentials,
  ],
  subscribers: [],
  migrations: [],
});
