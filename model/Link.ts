import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Contact } from './Contact';
import { Profile } from './Profile';

@Entity('links')
export class Link {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Profile, (profile) => profile.socials)
  profile!: Profile;

  @ManyToOne(() => Contact, (contact) => contact.links)
  contact!: Contact;

  @Column()
  title!: string;

  @Column()
  url!: string;
}
