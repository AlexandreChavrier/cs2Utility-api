// src/entities/DestinationPoint.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { Map } from './map.entity';
import { Lineup } from './lineup.entity';

@Entity('destination_points')
export class DestinationPoint {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  // FK explicites (sans @JoinColumn ici)
  @Column({ name: 'map_id' })
  @Index()
  mapId: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  x: number; // Pourcentage

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  y: number; // Pourcentage

  @Column()
  label: string; // "Xbox"

  // @Column({ type: 'simple-array' })
  // commonNames: string[]; // ["xbox", "mid box"] pour la recherche

  // Média
  @Column({ name: 'icon_url' })
  iconUrl: string; // Badge à afficher

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  @ManyToOne(() => Map, (map) => map.destinationPoints, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'map_id' })
  map: Map;

  @OneToMany(() => Lineup, (lineup) => lineup.destinationPoint)
  lineups: Lineup[];

  // Manque la relaton vers actions
}
