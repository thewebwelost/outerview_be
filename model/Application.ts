import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Company } from './Company';
import { ApplicationContact } from './ApplicationContact';

interface Job {
  description: string;
  responsibilities: string[];
  skills: string[];
}

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  company!: Company;

  @Column()
  job!: Job;

  @Column()
  contact!: ApplicationContact[];
}
