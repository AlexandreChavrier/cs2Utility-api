import { UTILITY_TYPE } from 'src/enums/game/utilityType.enum';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('action_types')
export class ActionType {
  @PrimaryGeneratedColumn()
  action_type_id: number;

  @Column({ type: 'enum', enum: UTILITY_TYPE, unique: true })
  name: UTILITY_TYPE;

  @Column({ type: 'varchar', length: 255 })
  icon: string;
}