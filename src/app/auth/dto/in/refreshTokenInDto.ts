import { z } from 'zod';

export const refreshTokenDtoInSchema = z.object({
  refreshToken: z.string().min(1, 'refresh token required'),
});

export type RefreshTokenDtoInSchema = z.infer<typeof refreshTokenDtoInSchema>;