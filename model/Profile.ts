import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { Education } from './Education';
import { Experience } from './Experience';
import { Link } from './Link';
import { Social } from './Social';
import { User } from './User';

@Entity('profiles')
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.profiles, { onDelete: 'CASCADE' })
  user!: User;

  @Column()
  name!: string;

  @Column({ type: 'text', nullable: true })
  title?: string;

  @Column({ type: 'text', nullable: true })
  summary?: string;

  @Column({ type: 'simple-array', nullable: true })
  details?: string[];

  @Column({ type: 'simple-array', nullable: true })
  hardSkills?: string[];

  @Column({ type: 'simple-array', nullable: true })
  softSkills?: string[];

  @OneToMany(() => Experience, (experience) => experience.profile)
  @JoinTable()
  experience?: Experience[];

  @OneToMany(() => Education, (education) => education.profile)
  @JoinTable()
  education?: Education[];

  @Column('simple-array')
  achievements?: string[];

  @Column({ type: 'text', nullable: true })
  country?: string;

  @Column({ type: 'text', nullable: true })
  city?: string;

  @Column({ type: 'text', nullable: true })
  state?: string;

  @Column({ type: 'text', nullable: true })
  email?: string;

  @Column({ type: 'text', nullable: true })
  website?: string;

  @OneToMany(() => Social, (social) => social.profile)
  @JoinTable()
  socials?: Social[];
}
