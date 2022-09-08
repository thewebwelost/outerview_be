import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('education')
export class Education extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  profile!: number;

  @Column()
  name!: string;

  @Column()
  startDate!: Date;

  @Column()
  endDate!: Date;

  @Column()
  isCurrent!: boolean;

  @Column()
  degree!: string;

  @Column('simple-array')
  details!: string[];
}
