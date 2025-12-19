// src/entities/ActionType.ts
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
import { Action } from './action.entity';

@Entity('action_types')
export class ActionType {
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
  @OneToMany(() => Action, (action) => action.actionType)
  actions: Action[];
}
