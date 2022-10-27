import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { Application } from './Application';

@Entity('events')
export class UserEvent {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Application, (application) => application.userEvents)
  application!: Application;

  @Column()
  title!: string;

  @Column()
  role!: string;

  @Column()
  step!: string; // TODO: define enum

  @Column()
  date!: Date;

  @Column()
  details!: string;
}
