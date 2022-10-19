import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  JoinTable,
  OneToMany,
  Column,
} from 'typeorm';
import { Job } from './Job';
import { User } from './User';
import { UserEvent } from './UserEvent';

@Entity('applications')
export class Application {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.applications, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user!: User;

  @Column({ nullable: false })
  userId!: number;

  @OneToOne(() => Job, (job) => job.application)
  @JoinColumn()
  job!: Job[];

  @OneToMany(() => UserEvent, (event) => event.application)
  @JoinTable()
  events?: UserEvent[];
}
