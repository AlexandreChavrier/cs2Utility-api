import { UTILITY_TYPE } from 'src/app/enums/game/utilityType.enum';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ACTION_TYPE } from '../enums/game/actions.enum';

@Entity('action_types')
export class ActionType {
  @PrimaryGeneratedColumn()
  action_type_id: number;

  @Column({ type: 'enum', enum: ACTION_TYPE, unique: true })
  name: ACTION_TYPE;

  @Column({ type: 'varchar', length: 255 })
  icon: string;
}