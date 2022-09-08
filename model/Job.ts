import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('jobs')
export class Job extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  application!: number;

  @Column()
  description!: string;

  @Column({ type: 'text', array: true })
  responsibilities!: string[];

  @Column({ type: 'text', array: true })
  skills!: string[];
}
