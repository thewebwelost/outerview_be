import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from './Profile';

@Entity('education')
export class Education {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Profile, (profile) => profile.education, {
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

  @Column()
  degree!: string;

  @Column('simple-array')
  details!: string[];
}
