import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { Company } from './Company';
import { ApplicationContact } from './ApplicationContact';

interface Job {
  description: string;
  responsibilities: string[];
  skills: string[];
}

@Entity()
export class Application extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  company!: Company;

  @Column()
  job!: Job;

  @Column()
  contact!: ApplicationContact[];
}
