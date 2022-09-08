import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('profiles')
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user!: number; // relation to user

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

  @Column({ type: 'int', array: true, nullable: true })
  experience?: number[];

  @Column({ type: 'int', array: true, nullable: true })
  education?: number[];

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

  @Column({ type: 'int', array: true, nullable: true })
  socials?: number[];
}
