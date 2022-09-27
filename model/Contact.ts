import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { Company } from './Company';
import { Link } from './Link';
import { Event } from './Event';

@Entity('contacts')
export class Contact extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Company, (company) => company.contact)
  company!: Company;

  @ManyToOne(() => Event, (event) => event.interviewers)
  event!: Event;

  @Column()
  name!: string;

  @Column()
  position!: string;

  @Column()
  email!: string;

  @OneToMany(() => Link, (link) => link.contact)
  @JoinTable()
  links!: number[];
}
