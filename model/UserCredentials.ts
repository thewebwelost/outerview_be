import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
} from 'typeorm';
import { User } from './User';

@Entity('userCredentials')
export class UserCredentials extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => User, (user) => user.userCredentials, { onDelete: 'CASCADE' })
  user!: User;

  @Column({ type: 'varchar', array: true, default: [] })
  refreshToken!: string[];

  @Column()
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;
}
