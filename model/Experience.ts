import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from './Profile';

@Entity('experience')
export class Experience {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Profile, (profile) => profile.experience, {
    onDelete: 'CASCADE',
  })
  profile!: Profile;

  @Column()
  name!: string;

  @Column()
  startDate!: Date;

  @Column()
  endDate!: Date;

  @Column()
  isCurrent!: boolean;

  @Column('simple-array')
  responsibilities!: string[];

  @Column('simple-array')
  achievements!: string[];

  @Column('simple-array')
  keywords!: string[];
}
