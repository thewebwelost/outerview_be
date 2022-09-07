import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Job extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user!: number;

  @Column()
  description!: string;

  @Column({ type: 'varchar', array: true })
  responsibilities!: string[];

  @Column({ type: 'varchar', array: true })
  skills!: string[];
}
