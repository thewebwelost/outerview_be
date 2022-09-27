import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToOne,
  JoinTable,
} from 'typeorm';
import { Job } from './Job';
import { User } from './User';

@Entity('applications')
export class Application extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.applications, { onDelete: 'CASCADE' })
  user!: User;

  @OneToOne(() => Job, (job) => job.application)
  @JoinTable()
  job!: Job[];

  @Column({ type: 'int', array: true })
  events: number[] | undefined;
}
