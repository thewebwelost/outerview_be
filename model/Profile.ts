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

  @Column()
  details!: string[];

  @Column()
  hardSkills!: string[];

  @Column()
  softSkills!: string[];

  @Column()
  experience!: ProfileExperience[];

  @Column()
  education!: ProfileEducation[];

  @Column()
  achievements!: Achievements[];

  @Column()
  contacts!: Contacts;

  @Column()
  applications!: string[];
}
