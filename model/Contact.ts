import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('contacts')
export class Contact extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  companyId!: number;

  @Column()
  name!: string;

  @Column()
  position!: string;

  @Column()
  email!: string;

  @Column({ type: 'int', array: true })
  links!: number[];
}
