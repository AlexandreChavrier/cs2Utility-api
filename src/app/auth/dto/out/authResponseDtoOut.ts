import { z } from 'zod';
import { userProfileDtoOutSchema } from './userProfileDtoOut';

export const authResponseDtoOutSchema = z.object({
  expiresIn: z.number(),
  tokenType: z.string().default('Bearer'),
  user: userProfileDtoOutSchema,
});

export type AuthResponseDtoOut = z.infer<typeof authResponseDtoOutSchema>