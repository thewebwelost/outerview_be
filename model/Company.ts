import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('companies')
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

  @Column('simple-array')
  values!: string[];

  @Column()
  culture!: string;

  @Column('simple-array')
  tech!: string[];

  @Column({ type: 'int', array: true })
  contact!: number[];
}
