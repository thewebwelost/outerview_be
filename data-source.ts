import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Application } from './model/Application';
import { Company } from './model/Company';
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
  entities: [User, Profile, Company, Application],
  subscribers: [],
  migrations: [],
});
