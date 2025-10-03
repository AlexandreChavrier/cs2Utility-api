import { Controller, Post, Body, UseGuards, Get, Req, Request, Headers, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from 'src/app/entities/user.entity';
import { zodToNest } from 'src/lib/zod/ZodPipe';
import { toUserProfileDto, UserProfileDtoOut, UserProfilListDtoOut } from 'src/app/auth/dto/out/userProfileDtoOut';
import { UserService } from '../services/user.service';
import { ROLE } from 'src/app/enums/user/role.enum';
import { JwtAuthGuard } from 'src/app/auth/guards/auth.guards';
import { ConfigService } from '@nestjs/config';

export interface ReqWithUser extends Request {
  user: {
    userId: string,
    email: string,
    role: ROLE
  }
}

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
  ) { }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getMyProfile(
    @Req()
    req: any
  ): Promise<UserProfileDtoOut> {
    const currentUserId = req.user?.userId;
    console.log(currentUserId)
    if (!currentUserId) {
      throw new UnauthorizedException('Unknown user');
    }

    const user = await this.userService.findById({ userUuid: currentUserId })

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return toUserProfileDto(user)
  }

  // @Post('register')
  // async register(
  //   @Body(zodToNest(registerDtoInSchema))
  //   registerDto: RegisterDtoIn,
  // ): Promise<AuthResponseDtoOut> {
  //   const userRegistered = await this.authService.register({ ...registerDto });
  //   return userRegistered;
  // }

  // @Post('login')
  // async login(
  //   @Body(zodToNest(loginDtoInSchema))
  //   loginDto: LoginDtoIn,
  // ): Promise<AuthResponseDtoOut> {
  //   const userLogedIn = await this.authService.login({ ...loginDto });
  //   return userLogedIn;
  // }
}