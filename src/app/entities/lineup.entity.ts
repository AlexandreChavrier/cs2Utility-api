import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
  JoinColumn,
} from 'typeorm';
import { Map } from './map.entity';
import { DestinationPoint } from './destinationPoint.entity';
import { UtilityType } from './utilityType.entity';
import { SIDE } from '../enums/game/side.enum';

type IntermediatePoint = {
  x: number;
  y: number;
  order: number;
};

@Entity('lineups')
export class Lineup {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  // FK explicites (sans @JoinColumn ici)
  @Column({ name: 'map_id' })
  @Index()
  mapId: string;

  @Column({ name: 'destination_point_id' })
  @Index()
  destinationPointId: string;

  @Column({ name: 'utility_type_id' })
  @Index()
  utilityTypeId: string;

  // Coordonnées du point de DÉPART
  @Column({ name: 'throw_from_x', type: 'decimal', precision: 5, scale: 2 })
  throwFromX: number;

  @Column({ name: 'throw_from_y', type: 'decimal', precision: 5, scale: 2 })
  throwFromY: number;

  @Column({ name: 'intermediate_points', type: 'jsonb', nullable: true })
  intermediatePoints?: IntermediatePoint[];

  @Column({ name: 'icon_url', nullable: true })
  iconUrl: string;

  // Métadonnées
  @Column({ type: 'enum', enum: SIDE, default: SIDE.ANY })
  @Index()
  side: SIDE;

  // Média
  @Column({ name: 'image_url' })
  imageUrl: string;

  @Column({ name: 'thumbnail_url', nullable: true })
  thumbnailUrl?: string;

  @Column({ name: 'video_url', nullable: true })
  videoUrl?: string;

  @Column({ type: 'text' })
  instructions: string;

  // Social
  @Column({ name: 'created_by', nullable: true })
  createdBy?: string;

  @Column({ default: 0 })
  votes: number;

  @Column({ default: 0 })
  views: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Map, (map) => map.lineups, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'map_id' })
  map: Map;

  @ManyToOne(() => DestinationPoint, (dp) => dp.lineups, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'destination_point_id' })
  destinationPoint: DestinationPoint;

  @ManyToOne(() => UtilityType, (ut) => ut.lineups, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'utility_type_id' })
  utilityType: UtilityType;
}
