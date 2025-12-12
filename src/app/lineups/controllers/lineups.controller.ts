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

import { zodToNest } from 'src/lib/zod/ZodPipe';

import { LineupsService } from '../services/lineups.service';

@Controller('user')
export class LineupController {
  constructor(private lineupsService: LineupsService) {}

  @Get('')
  async getLineups() {
    console.log('Bonjour');
  }
}
