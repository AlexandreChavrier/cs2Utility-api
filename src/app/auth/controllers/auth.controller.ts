import { Controller, Post, Body, UseGuards, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { instanceToPlain } from 'class-transformer';
import { JwtAuthGuard } from '../guards/auth.guards';
import { User } from 'src/app/entities/user.entity';
import { register } from 'module';

interface AuthenticatedRequest extends Request {
  user: User;
}


@Controller('auth')
export class AuthController {
  constructor (private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(
    @Req() req: AuthenticatedRequest,
    @Res() res: Response
    ) {  
    res.send(
      instanceToPlain(req.user, {
        groups: ['profile']
      })
    );
  }

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto, 
    @Res() res: Response
  ) {
    const user = await this.authService.register({ registerDto });

    res.send(
      instanceToPlain(user, {
        groups: ['profile']
      })
    );
  }

  @Post('login')
  async login
  (@Body() loginDto: LoginDto,
   @Res() res: Response
  ) {
    const user = await this.authService.login({ loginDto });

    res.send(
      instanceToPlain(user, {
        groups: ['auth']
      })
    );
  }
}