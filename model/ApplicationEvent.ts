import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { ApplicationContact } from './ApplicationContact';

@Entity()
export class ApplicationEvent extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  company!: string;

  @Column()
  role!: string;

  @Column()
  step!: string;

  @Column()
  time!: string;

  @Column()
  date!: Date;

  @Column()
  interviewer!: ApplicationContact[];

  @Column()
  details!: string;
}
