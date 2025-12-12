import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  Request,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from 'src/app/entities/user.entity';
import { zodToNest } from 'src/lib/zod/ZodPipe';
import {
  toUserProfileDto,
  UserProfileDtoOut,
  UserProfilListDtoOut,
} from 'src/app/auth/dto/out/userProfileDtoOut';
import { UserService } from '../services/user.service';
import { ROLE } from 'src/app/enums/user/role.enum';
import { JwtAuthGuard } from 'src/app/auth/guards/auth.guards';
import { ConfigService } from '@nestjs/config';

export interface ReqWithUser extends Request {
  user: {
    userId: string;
    fullName: string;
    email: string;
    role: ROLE;
  };
}

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getMyProfile(
    @Req()
    req: ReqWithUser,
  ): Promise<UserProfileDtoOut> {
    const currentUserId = req.user?.userId;
    const currentUser = req.user?.fullName;

    if (!currentUserId) {
      throw new UnauthorizedException('Unknown user');
    }

    const user = await this.userService.findById({ userUuid: currentUserId });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return toUserProfileDto(user);
  }
}
