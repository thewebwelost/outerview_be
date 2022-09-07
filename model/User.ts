import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ type: 'int', array: true })
  profiles!: number[];

  @Column({ type: 'int', array: true })
  applications!: number[];

  @Column({ type: 'int', array: true })
  events!: number[];
}
