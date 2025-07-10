import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeUpdate, BeforeInsert, ManyToOne, JoinColumn } from 'typeorm';
import { Map } from './map.entity';
import { Utility } from './utility.entity';
import { User } from './user.entity';
import { LINEUP_PRECISION } from 'src/enums/game/lineupPrecision.enum';
import { SIDE } from 'src/enums/game/side.enum';


@Entity('lineups')
export class Lineup {
  @PrimaryGeneratedColumn()
  lineup_id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  lineup_video: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  lineup_image: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ type: 'enum', enum: LINEUP_PRECISION })
  precision: LINEUP_PRECISION;

  @Column({ type: 'enum', enum: SIDE })
  side: SIDE;

  @ManyToOne(() => Map, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'map_id' })
  map: Map;

  @Column()
  map_id: number;

  @ManyToOne(() => Utility, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'utility_id' })
  utility: Utility;

  @Column()
  utility_id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'created_by_admin_id' })
  createdByAdmin: User;

  @Column()
  created_by_admin_id: number;
}