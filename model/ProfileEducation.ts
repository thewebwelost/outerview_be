import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProfileEducation {
  @PrimaryGeneratedColumn()
  id!: number;

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

  @Column()
  details!: string[];
}
