import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user!: number; // relation to user

  @Column()
  name!: string;

  @Column()
  location!: string;

  @Column()
  size!: string;

  @Column()
  product!: string;

  @Column({ type: 'varchar', array: true })
  values!: string[];

  @Column()
  culture!: string;

  @Column({ type: 'varchar', array: true })
  tech!: string[];

  @Column({ type: 'int', array: true })
  contact!: number[];
}
