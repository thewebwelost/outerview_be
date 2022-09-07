import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Application extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int', array: true })
  company!: number[];

  @Column({ type: 'int', array: true })
  job!: number[];

  @Column({ type: 'int', array: true })
  contact!: number[];
}
