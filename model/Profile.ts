import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user!: number; // relation to user

  @Column()
  name!: string;

  @Column()
  title!: string;

  @Column()
  summary!: string;

  @Column({ type: 'text', array: true })
  details!: string[];

  @Column({ type: 'text', array: true })
  hardSkills!: string[];

  @Column({ type: 'text', array: true })
  softSkills!: string[];

  @Column({ type: 'int', array: true })
  experience!: number[];

  @Column({ type: 'int', array: true })
  education!: number[];

  @Column({ type: 'text', array: true })
  achievements!: string[];

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

  @Column({ type: 'int', array: true })
  socials!: number[];
}
