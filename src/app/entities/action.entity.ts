import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
  UpdateDateColumn,
} from 'typeorm';
import { Map } from './map.entity';
import { ActionType } from './actionType.entity';
import { SIDE } from '../enums/game/side.enum';
import { DestinationPoint } from './destinationPoint.entity';

@Entity('actions')
export class Action {
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

  @Column({ name: 'action_type_id' })
  @Index()
  actionTypeId: string;

  // Coordonnées du point de DÉPART
  @Column({ name: 'from_x', type: 'decimal', precision: 5, scale: 2 })
  fromX: number;

  @Column({ name: 'from_y', type: 'decimal', precision: 5, scale: 2 })
  fromY: number;

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

  @Column({ default: 0 })
  votes: number;

  @Column({ default: 0 })
  views: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations (SANS @JoinColumn car déjà déclaré au-dessus)
  @ManyToOne(() => Map, (map) => map.lineups, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'map_id' })
  map: Map;

  @ManyToOne(() => DestinationPoint, (dp) => dp.lineups, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'destination_point_id' })
  destinationPoint: DestinationPoint;

  @ManyToOne(() => ActionType, (a) => a.actions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'action_type_id' })
  actionType: ActionType;
}
