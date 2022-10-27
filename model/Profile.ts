import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { Education } from './Education';
import { Experience } from './Experience';
import { Link } from './Link';
import { User } from './User';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.profiles, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user!: User;

  @Column({ nullable: false })
  userId!: number;

  @Column()
  name!: string;

  @Column({ type: 'text', nullable: true })
  title!: string;

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

  @Column({ type: 'simple-array', nullable: true })
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

  @OneToMany(() => Link, (link) => link.profile)
  @JoinTable()
  socials?: Link[];
}
