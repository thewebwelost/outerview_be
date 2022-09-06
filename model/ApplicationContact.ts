import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { Link } from './Link';

@Entity()
export class ApplicationContact extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  position!: string;

  @Column()
  email!: string;

  @Column()
  links!: Link[];
}
