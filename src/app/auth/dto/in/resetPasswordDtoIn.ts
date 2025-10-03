import { z } from 'zod';

export const resetPasswordDtoInSchema = z.object({
  token: z.string().min(1, 'Token requis'),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
})

export type ResetPasswordDtoIn = z.infer<typeof resetPasswordDtoInSchema>;