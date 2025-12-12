// src/entities/Map.ts
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
  PrimaryColumn,
} from 'typeorm';
import { DestinationPoint } from './destinationPoint.entity';
import { Lineup } from './lineup.entity';
import { Action } from './action.entity';

@Entity('maps')
export class Map {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  @Index()
  displayName: string;

  @Column({ name: 'image_url' })
  imageUrl: string;

  @Column({ name: 'radar_url' })
  radarUrl: string;

  @Column({ name: 'icon_url' })
  iconUrl: string;

  @Column({ name: 'radar_up_url', nullable: true })
  radarUpUrl?: string; // Pour Nuke uniquement

  @Column({ name: 'radar_down_url', nullable: true })
  radarDownUrl?: string; // Pour Nuke uniquement

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  @OneToMany(() => DestinationPoint, (destinationPoint) => destinationPoint.map)
  destinationPoints: DestinationPoint[];

  @OneToMany(() => Lineup, (lineup) => lineup.map)
  lineups: Lineup[];

  @OneToMany(() => Action, (action) => action.map)
  actions: Action[];
}
