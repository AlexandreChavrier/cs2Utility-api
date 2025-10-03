import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException, UseInterceptors } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/services/user.service';
import { User } from '../../entities/user.entity';
import { ROLE } from 'src/app/enums/user/role.enum';
import { ConfigService } from '@nestjs/config';
import { AuthResponseDtoOut } from '../dto/out/authResponseDtoOut';
import { toUserProfileDto } from '../dto/out/userProfileDtoOut';
import { timeStamp } from 'console';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) { }

  async validateUser({ email, password }: {
    email: string;
    password: string
  }): Promise<User | null> {
    const user = await this.userService.findByEmail({ email });

    if (user && await this.userService.validatePassword({ plainPassword: password, hashedPassword: user.password })) {
      return user;
    }
    return null;
  }

  async generateTokens(userId: string) {
    const payload = { sub: userId }; 

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRATION', '15m'),
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION', '7d'),
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      }),
    ]);

    // Hasher et sauvegarder le refresh token en DB pour validation future
    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    await this.userService.updateRefreshToken({ uuid: userId, refreshTokenHash: refreshTokenHash });

    return {
      accessToken,
      refreshToken,
      expiresIn: 15 * 60,
      tokenType: 'Bearer',
    };
  }
}