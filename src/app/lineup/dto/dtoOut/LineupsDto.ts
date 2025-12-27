import { Lineup } from 'src/app/entities/lineup.entity';
import { SIDE } from 'src/app/enums/game/side.enum';
import { number, z } from 'zod';

export const lineupDtoSchema = z.object({
  uuid: z.uuid(),
  title: z.string(),
  mapId: z.string(),
  throwFromX: z.number(),
  throwFromY: z.number(),
  destinationPoint: z.object({
    uuid: z.uuid(),
    label: z.string(),
    x: z.number(),
    y: z.number(),
    iconUrl: z.string(),
  }),
  intermediatePoints: z
    .array(
      z.object({
        x: z.number(),
        y: z.number(),
        order: z.number(),
      }),
    )
    .optional(),
  side: z.enum(SIDE),
  iconUrl: z.string(),
  imageUrl: z.string(),
  videoUrl: z.string().optional(),
  thumbnailUrl: z.string().optional(),
  instructions: z.string(),
  votes: z.number(),
  views: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const lineupListDtoSchema = z.array(lineupDtoSchema);

export type LineupDto = z.infer<typeof lineupDtoSchema>;
export type LineupListDto = z.infer<typeof lineupListDtoSchema>;

export const toLineupsDto = (lineup: Lineup): LineupDto => {
  return {
    uuid: lineup.uuid,
    title: lineup.title,
    mapId: lineup.mapId,
    throwFromX: Number(lineup.throwFromX),
    throwFromY: Number(lineup.throwFromY),
    destinationPoint: {
      uuid: lineup.destinationPoint.uuid,
      label: lineup.destinationPoint.label,
      x: Number(lineup.destinationPoint.x),
      y: Number(lineup.destinationPoint.y),
      iconUrl: lineup.destinationPoint.iconUrl,
    },
    intermediatePoints:
      lineup.intermediatePoints?.map((point) => ({
        x: Number(point.x),
        y: Number(point.y),
        order: Number(point.order),
      })) ?? [],
    side: lineup.side,
    iconUrl: lineup.iconUrl,
    imageUrl: lineup.imageUrl,
    videoUrl: lineup.videoUrl,
    thumbnailUrl: lineup.thumbnailUrl,
    instructions: lineup.instructions,
    views: lineup.views,
    votes: lineup.votes,
    createdAt: lineup.createdAt,
    updatedAt: lineup.updatedAt,
  };
};
