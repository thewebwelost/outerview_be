import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { Application } from './Application';

@Entity('events')
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Application, (application) => application.events)
  application!: Application;

  @Column()
  title!: string;

  @Column()
  role!: string;

  @Column()
  step!: string; // TODO: define enum

  @Column()
  date!: Date;

  @Column({ type: 'int', array: true })
  interviewers!: number[];

  @Column()
  details!: string;
}
