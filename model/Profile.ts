import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('profiles')
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user!: number; // relation to user

  @Column()
  name!: string;

  @Column({ nullable: true })
  title: string | undefined;

  @Column({ nullable: true })
  summary: string | undefined;

  @Column({ type: 'simple-array', nullable: true })
  details: string[] | undefined;

  @Column({ type: 'simple-array', nullable: true })
  hardSkills: string[] | undefined;

  @Column({ type: 'simple-array', nullable: true })
  softSkills: string[] | undefined;

  @Column({ type: 'int', array: true, nullable: true })
  experience: number[] | undefined;

  @Column({ type: 'int', array: true, nullable: true })
  education: number[] | undefined;

  @Column('simple-array')
  achievements: string[] | undefined;

  @Column({ nullable: true })
  country: string | undefined;

  @Column({ nullable: true })
  city: string | undefined;

  @Column({ nullable: true })
  state: string | undefined;

  @Column({ nullable: true })
  email: string | undefined;

  @Column({ nullable: true })
  website: string | undefined;

  @Column({ type: 'int', array: true, nullable: true })
  socials: number[] | undefined;
}
