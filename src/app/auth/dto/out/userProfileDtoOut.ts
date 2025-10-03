import { User } from 'src/app/entities/user.entity';
import { ROLE } from 'src/app/enums/user/role.enum';
import { z } from 'zod';

export const userProfileDtoOutSchema = z.object({
  uuid: z.uuid(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  fullName: z.string(),
  role: z.enum(Object.values(ROLE) as [ROLE]),
  createdAt: z.date(),
  updatedAt: z.date(),
  lastLoginAt: z.date().nullable,
});

export const userProfilListDtoOutSchema = z.array(userProfileDtoOutSchema);

export type UserProfileDtoOut = z.infer<typeof userProfileDtoOutSchema>;
export type UserProfilListDtoOut = z.infer<typeof userProfilListDtoOutSchema>;

export const toUserProfileDto = (user: User): UserProfileDtoOut => {
  return {
    uuid: user.uuid,
    email: user.email,
    firstName: user.user_firstname,
    lastName: user.user_lastname,
    fullName: `${user.user_firstname} ${user.user_lastname}`,
    role: user.role,
    createdAt: user.created_at,
    updatedAt: user.updatedAt,
    lastLoginAt: user.last_login_at,
  }
}

