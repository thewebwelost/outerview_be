import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('applications')
export class Application extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user!: number; // relation to user

  @Column({ type: 'int', array: true })
  company!: number[];

  @Column({ type: 'int', array: true })
  job!: number[];

  @Column({ type: 'int', array: true })
  events: number[] | undefined;
}
