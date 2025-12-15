import { Lineup } from 'src/app/entities/lineup.entity';
import { Map } from 'src/app/entities/map.entity';
import { SIDE } from 'src/app/enums/game/side.enum';
import { number, z } from 'zod';

export const mapsDtoSchema = z.object({
  id: z.string(),
  displayName: z.string(),
  imageUrl: z.string(),
  radarUrl: z.string(),
  radarUpUrl: z.string().optional(),
  radarDownUrl: z.string().optional(),
  iconUrl: z.string(),
  active: z.boolean(),
});

export const mapsListDtoSchema = z.array(mapsDtoSchema);

export type MapsDto = z.infer<typeof mapsDtoSchema>;
export type MapsListDto = z.infer<typeof mapsListDtoSchema>;

export const toMapsDto = (map: Map): MapsDto => {
  return {
    id: map.id,
    displayName: map.displayName,
    imageUrl: map.imageUrl,
    radarUrl: map.radarUrl,
    radarUpUrl: map.radarUpUrl,
    radarDownUrl: map.radarDownUrl,
    iconUrl: map.iconUrl,
    active: map.active,
  };
};
