import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Link } from './Link';

@Entity()
export class ApplicationContact {
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
