import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('profiles')
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

  @Column('simple-array')
  details!: string[];

  @Column('simple-array')
  hardSkills!: string[];

  @Column('simple-array')
  softSkills!: string[];

  @Column({ type: 'int', array: true })
  experience!: number[];

  @Column({ type: 'int', array: true })
  education!: number[];

  @Column('simple-array')
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
