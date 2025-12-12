import { UTILITY_TYPE } from 'src/app/enums/game/utilityType.enum';
import { z } from 'zod';

export const getLineupsDtoSchema = z.object({
  map: z.string(),
  type: z.enum(UTILITY_TYPE),
});

export type GetLineupsDtoIn = z.infer<typeof getLineupsDtoSchema>;
