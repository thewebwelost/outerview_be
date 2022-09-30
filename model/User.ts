import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Application } from './Application';
import { Profile } from './Profile';
import { Credentials } from './Credentials';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Credentials, (credentials) => credentials.user, {
    cascade: true,
    eager: true,
  })
  @JoinColumn([{ name: 'email', referencedColumnName: 'email' }])
  credentials!: Credentials;

  @Column({ type: 'varchar', nullable: true })
  avatar?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Profile, (profile) => profile.user)
  @JoinTable()
  profiles!: Profile[];

  @OneToMany(() => Application, (application) => application.user, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  applications!: Application[];
}
