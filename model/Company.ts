import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  location!: string;

  @Column()
  size!: string;

  @Column()
  product!: string;

  @Column()
  values!: string[];

  @Column()
  culture!: string;

  @Column()
  tech!: string[];
}
