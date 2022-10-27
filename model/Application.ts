import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { User } from './User';
import { UserEvent } from './UserEvent';

@Entity('applications')
export class Application {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.applications, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user!: User;

  @Column({ nullable: false })
  userId!: number;

  @OneToMany(() => UserEvent, (ev) => ev.application, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'userEvents', referencedColumnName: 'id' }])
  userEvents!: UserEvent[];

  @Column({ nullable: false })
  eventsIds!: number[];

  @Column()
  company!: string;

  @Column() // relation?
  link!: string;

  @Column()
  description!: string;

  @Column()
  salary!: string;

  @Column()
  location!: string;

  // @ManyToOne(() => Link, (link) => link.applications, { onDelete: 'CASCADE' })
  // @JoinColumn([{ name: 'linkIds', referencedColumnName: 'id' }])
  // link!: Link[];

  // @ManyToOne(() => Profiles, (link) => link.applications, { onDelete: 'CASCADE' })
  // @JoinColumn([{ name: 'linkIds', referencedColumnName: 'id' }])
  // link!: Profiles[];
}
