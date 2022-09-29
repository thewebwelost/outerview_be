import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Job } from './Job';
import { User } from './User';
import { UserEvent } from './UserEvent';

@Entity('applications')
export class Application {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.applications, { onDelete: 'CASCADE' })
  user!: User;

  @OneToOne(() => Job, (job) => job.application)
  @JoinColumn()
  job!: Job[];

  @OneToMany(() => UserEvent, (event) => event.application)
  @JoinTable()
  events?: UserEvent[];
}
