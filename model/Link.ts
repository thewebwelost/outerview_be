import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Application } from './Application';
import { Profile } from './Profile';

@Entity('links')
export class Link {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Profile, (profile) => profile.socials)
  profile!: Profile;

  @ManyToOne(() => Application, (application) => application.link)
  application!: Application;

  @Column()
  title!: string;

  @Column()
  url!: string;
}
