import { UTILITY_TYPE } from 'src/enums/game/utilityType.enum';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('utilities')
export class Utility {
  @PrimaryGeneratedColumn()
  utility_id: number;

  @Column({ type: 'enum', enum: UTILITY_TYPE, unique: true })
  name: UTILITY_TYPE;

  @Column({ type: 'varchar', length: 255 })
  icon: string;
}