import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('jobs')
export class Job extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  application!: number;

  @Column()
  description!: string;

  @Column('simple-array')
  responsibilities!: string[];

  @Column('simple-array')
  skills!: string[];
}
