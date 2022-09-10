import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @Column({ type: 'int', array: true, nullable: true })
  profiles: number[] | undefined;

  @Column({ type: 'int', array: true, nullable: true })
  applications: number[] | undefined;
}
