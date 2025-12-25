import { Action } from 'src/app/entities/action.entity';
import { Lineup } from 'src/app/entities/lineup.entity';
import { SIDE } from 'src/app/enums/game/side.enum';
import { number, z } from 'zod';

export const actionDtoSchema = z.object({
  uuid: z.uuid(),
  title: z.string(),
  mapId: z.string(),
  fromX: z.number(),
  fromY: z.number(),
  destinationPoint: z
    .object({
      uuid: z.uuid(),
      label: z.string(),
      x: z.number(),
      y: z.number(),
      iconUrl: z.string(),
    })
    .optional(),
  side: z.enum(SIDE),
  imageUrl: z.string(),
  videoUrl: z.string().optional(),
  thumbnailUrl: z.string().optional(),
  instructions: z.string(),
  votes: z.number(),
  views: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const actionListDtoSchema = z.array(actionDtoSchema);

export type ActionDto = z.infer<typeof actionDtoSchema>;
export type ActionListDto = z.infer<typeof actionListDtoSchema>;

export const toActionsDto = (action: Action): ActionDto => {
  return {
    uuid: action.uuid,
    title: action.title,
    mapId: action.mapId,
    fromX: Number(action.fromX),
    fromY: Number(action.fromY),
    destinationPoint: {
      uuid: action.destinationPoint.uuid,
      label: action.destinationPoint.label,
      x: Number(action.destinationPoint.x),
      y: Number(action.destinationPoint.y),
      iconUrl: action.destinationPoint.iconUrl,
    },
    side: action.side,
    imageUrl: action.imageUrl,
    videoUrl: action.videoUrl,
    thumbnailUrl: action.thumbnailUrl,
    instructions: action.instructions,
    views: action.views,
    votes: action.votes,
    createdAt: action.createdAt,
    updatedAt: action.updatedAt,
  };
};
