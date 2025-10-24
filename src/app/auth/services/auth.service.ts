import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException, UseInterceptors } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/services/user.service';
import { User } from '../../entities/user.entity';
import { ConfigService } from '@nestjs/config';

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
        expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRATION'),
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

  async refreshTokens({ userId, refreshToken }: {
    userId: string,
    refreshToken: string,
  }) {
    const user = await this.userService.findById({ userUuid: userId });

    if (!user || !user.refresh_token_hash) {
      throw new UnauthorizedException('Unknown user or invalid token');
    }

    const compareTokens = await bcrypt.compare(refreshToken, user.refresh_token_hash);

    if (!compareTokens) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const tokens = await this.generateTokens(userId);
    return tokens;
  }

  async verifyToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      return payload;
    } catch (error){
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}