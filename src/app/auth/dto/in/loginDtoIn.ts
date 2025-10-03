import { z } from 'zod';

export const loginDtoInSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  rememberMe: z.boolean().optional().default(false) //ajouter sécu mot de passe avec nbr de caractères etc
})

export type LoginDtoIn = z.infer<typeof loginDtoInSchema>;