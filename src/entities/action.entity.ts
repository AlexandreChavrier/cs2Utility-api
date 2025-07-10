import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Map } from './map.entity';
import { ActionType } from './action_type.entity';
import { User } from './user.entity';
import { SIDE } from 'src/enums/game/side.enum';

@Entity('actions')
export class Action {
  @PrimaryGeneratedColumn()
  action_id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  action_image: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  action_video: string;

  @Column({ type: 'enum', unique: true })
  side_recommended: SIDE;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Map, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'map_id' })
  map: Map

  @Column()
  map_id: number

  @ManyToOne(() => ActionType, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'action_type_id' })
  actionType: ActionType;

  @Column()
  action_type_id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'created_by_admin_id' })
  createdByAdmin: User;

  @Column()
  created_by_admin_id: number;

}