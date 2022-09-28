import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinTable,
  OneToOne,
} from 'typeorm';
import { Application } from './Application';
import { Profile } from './Profile';
import { User } from './User';

@Entity('userCredentials')
export class UserCredentials extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => User, (user) => user.userCredentials)
  user!: User;

  @Column({ type: 'varchar', array: true, default: [] }) // TODO: move to own table
  refreshToken!: string[];

  @Column() // TODO: move to own table
  username!: string;

  @Column({ unique: true }) // TODO: move to own table
  email!: string;

  @Column() // TODO: move to own table
  password!: string;
}
