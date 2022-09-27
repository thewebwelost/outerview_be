import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { Application } from './Application';
import { Profile } from './Profile';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', array: true, default: [] })
  refreshToken!: string[];

  @Column({ type: 'varchar', nullable: true })
  avatar: string | undefined;

  @Column()
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Profile, (profile) => profile.user)
  @JoinTable()
  profiles: Profile[] | undefined;

  @OneToMany(() => Application, (application) => application.user, {
    cascade: true,
  })
  @JoinTable()
  applications: Application[] | undefined;
}
