import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Application } from './Application';
import { Job } from './Job';

@Entity('companies')
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  location!: string;

  @Column()
  size!: string;

  @Column()
  product!: string;

  @Column('simple-array')
  values!: string[];

  @Column()
  culture!: string;

  @Column('simple-array')
  tech!: string[];

  @Column({ type: 'int', array: true })
  contact!: number[];

  @OneToMany(() => Job, (job) => job.company)
  job!: Job[];
}
