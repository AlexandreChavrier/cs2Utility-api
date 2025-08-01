import { MAP } from 'src/enums/game/map.enum';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("maps")
export class Map {
  @PrimaryGeneratedColumn()
  map_id: number;

  @Column({ type: 'enum', enum: MAP })
  map_name: MAP;

  @Column({ type: 'varchar', length: 255 })
  map_image: string;
}