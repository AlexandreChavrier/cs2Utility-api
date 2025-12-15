import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
  PrimaryColumn,
} from 'typeorm';
import { Lineup } from './lineup.entity';

@Entity('utility_types')
export class UtilityType {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  @Index()
  name: string;

  @Column({ name: 'icon_url' })
  iconUrl: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  @OneToMany(() => Lineup, (lineup) => lineup.utilityType)
  lineups: Lineup[];
}
