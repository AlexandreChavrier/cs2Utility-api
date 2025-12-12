import { ACTION_TYPE } from 'src/app/enums/game/actions.enum';
import { z } from 'zod';

export const getActionsDtoSchema = z.object({
  map: z.string(),
  actionTypes: z
    .union([z.string(), z.array(z.string())])
    .transform((val) => {
      if (typeof val === 'string') {
        return [val];
      }
      return val;
    })
    .pipe(z.array(z.enum(ACTION_TYPE))),
});

export type GetActionsDtoIn = z.infer<typeof getActionsDtoSchema>;
