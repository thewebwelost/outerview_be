import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('experience')
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

  @Column({ type: 'text', array: true })
  responsibilities!: string[];

  @Column({ type: 'text', array: true })
  achievements!: string[];

  @Column({ type: 'text', array: true })
  keywords!: string[];
}
