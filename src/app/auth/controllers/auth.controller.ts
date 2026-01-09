import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  UnauthorizedException,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../guards/auth.guards';
import { zodToNest } from 'src/lib/zod/ZodPipe';
import { RegisterDtoIn, registerDtoInSchema } from '../dto/in/registerDtoIn';
import { LoginDtoIn, loginDtoInSchema } from '../dto/in/loginDtoIn';
import { AuthResponseDtoOut } from '../dto/out/authResponseDtoOut';
import { UserService } from 'src/app/user/services/user.service';
import { ROLE } from 'src/app/enums/user/role.enum';
import { toUserProfileDto } from '../dto/out/userProfileDtoOut';
import { ConfigService } from '@nestjs/config';
import { ReqWithUser } from 'src/app/user/controllers/user.controller';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  @Post('register')
  async register(
    @Body(zodToNest(registerDtoInSchema))
    registerDto: RegisterDtoIn,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AuthResponseDtoOut> {
    const existingUser = await this.userService.findByEmail({
      email: registerDto.email,
    });
    if (existingUser) {
      throw new UnauthorizedException('User already exist');
    }

    const user = await this.userService.create({
      userData: {
        email: registerDto.email,
        password: registerDto.password,
        user_firstname: registerDto.firstName,
        user_lastname: registerDto.lastName,
        role: ROLE.ROLE_USER,
      },
    });

    const tokens = await this.authService.generateTokens(user.uuid);

    this.setAuthCookies(response, tokens.accessToken, tokens.refreshToken);

    // Ne pas mettre les tokens dans le body mais dans les cookies
    return {
      expiresIn: tokens.expiresIn,
      tokenType: tokens.tokenType,
      user: toUserProfileDto(user),
    };
  }

  @Post('login')
  async login(
    @Body(zodToNest(loginDtoInSchema))
    loginDto: LoginDtoIn,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AuthResponseDtoOut> {
    const user = await this.authService.validateUser({
      email: loginDto.email,
      password: loginDto.password,
    });

    if (!user) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    await this.userService.updateLastLogin({ userId: user.uuid });

    const tokens = await this.authService.generateTokens(user.uuid);

    this.setAuthCookies(response, tokens.accessToken, tokens.refreshToken);

    return {
      expiresIn: tokens.expiresIn,
      tokenType: tokens.tokenType,
      user: toUserProfileDto(user),
    };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(
    @Res({ passthrough: true }) response: Response,
    @Req() req: ReqWithUser,
  ) {
    const currentUser = req.user?.fullName;
    response.clearCookie('access_token', { path: '/' });
    response.clearCookie('refresh_token', { path: '/' });

    return {
      userFullName: currentUser,
      message: 'Logout successfull',
    };
  }

  @Post('refresh')
  async refresh(
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ) {
    const refreshToken = (request as any).cookies?.refresh_token;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    try {
      const decoded = await this.authService.verifyToken(refreshToken);

      const tokens = await this.authService.refreshTokens({
        userId: decoded.sub, // 'sub' contient généralement le userId dans un JWT
        refreshToken: refreshToken,
      });

      this.setAuthCookies(response, tokens.accessToken, tokens.refreshToken);

      return {
        message: 'Tokens refreshed successfully',
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private setAuthCookies(
    response: Response,
    accessToken: string,
    refreshToken: string,
  ) {
    const isProduction =
      this.configService.get<string>('NODE_ENV') === 'production';

    response.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: this.configService.get<number>('JWT_ACCESS_EXPIRATION'),
      path: '/',
    });

    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: this.configService.get<number>('JWT_REFRESH_EXPIRATION'),
      path: '/',
    });
  }
}
