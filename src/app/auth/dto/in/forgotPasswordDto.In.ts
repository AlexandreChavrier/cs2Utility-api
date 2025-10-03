import { z } from 'zod';

export const forgotPasswordDtoInSchema = z.object({
  email: z.email(),
})

export type ForgotPasswordDtoIn = z.infer<typeof forgotPasswordDtoInSchema>;

