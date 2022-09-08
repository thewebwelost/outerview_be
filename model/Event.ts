import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  application!: number; // relation to application

  @Column()
  title!: string;

  @Column()
  role!: string;

  @Column()
  step!: string;

  @Column()
  date!: Date;

  @Column({ type: 'int', array: true })
  interviewers!: number[];

  @Column()
  details!: string;
}
