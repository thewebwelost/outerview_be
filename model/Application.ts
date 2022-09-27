import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { User } from './User';

@Entity('applications')
export class Application extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.applications, { onDelete: 'CASCADE' })
  user!: User; // relation to user

  @Column({ type: 'int', array: true })
  company!: number[];

  @Column({ type: 'int', array: true })
  job!: number[];

  @Column({ type: 'int', array: true })
  events: number[] | undefined;
}
