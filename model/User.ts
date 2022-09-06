import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

import { Profile } from './Profile';
import { Application } from './Application';
import { ApplicationEvent } from './ApplicationEvent';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  avatar!: string;

  @Column()
  username!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  createdAt!: Date;

  @Column()
  updatedAt!: Date;

  @Column()
  profiles!: Profile[];

  @Column()
  applications!: Application[];

  @Column()
  events!: ApplicationEvent[];
}
