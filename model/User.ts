import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinTable,
  OneToOne,
} from 'typeorm';
import { Application } from './Application';
import { Profile } from './Profile';
import { UserCredentials } from './UserCredentials';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => UserCredentials, (userCredentials) => userCredentials.user, {
    cascade: true,
    eager: true,
  })
  @JoinTable({ name: 'credentials' })
  userCredentials!: UserCredentials;

  @Column({ type: 'varchar', nullable: true })
  avatar: string | undefined;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Profile, (profile) => profile.user)
  @JoinTable()
  profiles: Profile[] | undefined;

  @OneToMany(() => Application, (application) => application.user, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  applications: Application[] | undefined;
}
