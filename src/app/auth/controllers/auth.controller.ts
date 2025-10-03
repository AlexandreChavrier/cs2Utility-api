import { Controller, Post, Body, UseGuards, Get, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../guards/auth.guards';
import { zodToNest } from 'src/lib/zod/ZodPipe';
import { RegisterDtoIn, registerDtoInSchema } from '../dto/in/registerDtoIn';
import { LoginDtoIn, loginDtoInSchema } from '../dto/in/loginDtoIn';
import { AuthResponseDtoOut } from '../dto/out/authResponseDtoOut';
import { UserService } from 'src/app/user/services/user.service';
import { ROLE } from 'src/app/enums/user/role.enum';
import { toUserProfileDto } from '../dto/out/userProfileDtoOut';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  // Voir pour mettre les Guards
  @Post('register')
  async register(
    @Body(zodToNest(registerDtoInSchema))
    registerDto: RegisterDtoIn,
  ): Promise<AuthResponseDtoOut> {

    const existingUser = await this.userService.findByEmail({ email: registerDto.email });
    if (existingUser) {
      throw new UnauthorizedException('User already exist');
    }

    const user = await this.userService.create({
      userData: {
        email: registerDto.email,
        password: registerDto.password,
        user_firstname: registerDto.firstName,
        user_lastname: registerDto.lastName,
        role: ROLE.ROLE_USER
      }
    });

    const tokens = await this.authService.generateTokens(user.uuid);

    const response: AuthResponseDtoOut = {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      expiresIn: tokens.expiresIn,
      tokenType: tokens.tokenType,
      user: toUserProfileDto(user),
    }

    return response;
  }

  @Post('login')
  async login(
    @Body(zodToNest(loginDtoInSchema))
    loginDto: LoginDtoIn,
  ): Promise<AuthResponseDtoOut> {
    const user = await this.authService.validateUser({
      email: loginDto.email,
      password: loginDto.password
    });

    if (!user) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    await this.userService.updateLastLogin({ userId: user.uuid })

    const tokens = await this.authService.generateTokens(user.uuid);
    const response: AuthResponseDtoOut = {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      expiresIn: tokens.expiresIn,
      tokenType: tokens.tokenType,
      user: toUserProfileDto(user),
    }

    return response;
  }
}