import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

export enum LinkType {
  LINK = 'link',
  SOCIAL = 'social',
}

@Entity('links')
export class Link extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int', array: true })
  profile!: number; // relation to profile

  @Column({ type: 'enum', enum: LinkType, default: LinkType.LINK })
  type!: string;

  @Column()
  title!: string;

  @Column()
  url!: string;
}
