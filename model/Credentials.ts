import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
} from 'typeorm';
import { User } from './User';

@Entity('credentials')
export class Credentials {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => User, (user) => user.credentials, { onDelete: 'CASCADE' })
  user!: User;

  @Column({ type: 'varchar', array: true, default: [] })
  refreshToken!: string[];

  @Column()
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  password!: string;
}
