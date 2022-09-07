import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { ProfileExperience } from './ProfileExperience';
import { ProfileEducation } from './ProfileEducation';
import { Link } from './Link';

interface Contacts {
  country: string;
  city: string;
  state: string;
  email: string;
  website: string;
  socials: Link[];
}

interface Achievements {
  title: string;
  description: string;
}

@Entity()
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  title!: string;

  @Column()
  summary!: string;

  @Column('text', { array: true })
  details!: string[];

  @Column('text', { array: true })
  hardSkills!: string[];

  @Column('text', { array: true })
  softSkills!: string[];

  @Column()
  experience!: ProfileExperience[];

  @Column()
  education!: ProfileEducation[];

  @Column()
  achievements!: Achievements[];

  @Column()
  country!: string;

  @Column()
  city!: string;

  @Column()
  state!: string;

  @Column()
  email!: string;

  @Column()
  website!: string;

  // @Column()
  // socials!: Link[];

  @Column('int', { array: true })
  applications!: number[];
}
