import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Job extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  application!: number;

  @Column()
  description!: string;

  @Column({ type: 'varchar', array: true })
  responsibilities!: string[];

  @Column({ type: 'varchar', array: true })
  skills!: string[];
}
