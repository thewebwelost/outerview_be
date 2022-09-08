import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Experience extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  profile!: number; // relation to profile

  @Column()
  name!: string;

  @Column()
  startDate!: Date;

  @Column()
  endDate!: Date;

  @Column()
  isCurrent!: boolean;

  @Column()
  responsibilities!: string[];

  @Column()
  achievements!: string[];

  @Column()
  keywords!: string[];
}
