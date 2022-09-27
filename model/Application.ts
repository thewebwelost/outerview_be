import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  OneToOne,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Job } from './Job';
import { User } from './User';
import { Event } from './Event';

@Entity('applications')
export class Application extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.applications, { onDelete: 'CASCADE' })
  user!: User;

  @OneToOne(() => Job, (job) => job.application)
  @JoinTable()
  job!: Job[];

  @OneToMany(() => Event, (event) => event.application)
  @JoinTable()
  events?: Event[];
}
