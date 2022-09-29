import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { Application } from './Application';
import { Contact } from './Contact';

@Entity('events')
export class UserEvent {
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

  @OneToMany(() => Contact, (contact) => contact.event)
  @JoinTable()
  interviewers!: number[];

  @Column()
  details!: string;
}
