import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { Profile } from './Profile';

@Entity('social')
export class Social {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Profile, (profile) => profile.socials)
  profile!: Profile;

  @Column()
  title!: string;

  @Column()
  url!: string;
}
