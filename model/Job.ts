import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { Application } from './Application';
import { Company } from './Company';

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Application, (application) => application.job)
  application!: Application;

  @ManyToOne(() => Company, (company) => company.job)
  @JoinTable()
  company!: Company;

  @Column()
  description!: string;

  @Column('simple-array')
  responsibilities!: string[];

  @Column('simple-array')
  skills!: string[];
}
