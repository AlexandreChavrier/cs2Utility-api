import { z } from 'zod';

export const registerDtoInSchema = z.object({
  email: z.email(),
  password: z.string().min(8), //ajouter sécu mot de passe avec nbr de caractères etc
  confirmPassword: z.string(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
})
.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'Password are not the same',
    path: ['confirmPassword'],
  }
)

export type RegisterDtoIn = z.infer<typeof registerDtoInSchema>;