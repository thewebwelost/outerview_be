import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { Contact } from './Contact';
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

  @OneToMany(() => Contact, (contact) => contact.company)
  @JoinTable()
  contact!: Contact;

  @OneToMany(() => Job, (job) => job.company)
  @JoinTable()
  job!: Job[];
}
