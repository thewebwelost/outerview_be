import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { Company } from './Company';
import { Contact } from './Contact';
import { Profile } from './Profile';

export enum LinkType {
  LINK = 'LINK',
  SOCIAL = 'SOCIAL',
}

@Entity('links')
export class Link extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Profile, (profile) => profile.socials)
  profile!: Profile;

  @ManyToOne(() => Contact, (contact) => contact.links)
  contact!: Contact;

  @Column({ type: 'enum', enum: LinkType, default: LinkType.LINK })
  type!: string;

  @Column()
  title!: string;

  @Column()
  url!: string;
}
