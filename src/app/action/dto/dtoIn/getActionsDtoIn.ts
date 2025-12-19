import { ACTION_TYPE } from 'src/app/enums/game/actions.enum';
import { z } from 'zod';

export const getActionsDtoSchema = z.object({
  map: z.string(),
  actionType: z.enum(ACTION_TYPE),
});

export type GetActionsDtoIn = z.infer<typeof getActionsDtoSchema>;
