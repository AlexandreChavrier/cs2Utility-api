import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getDatabaseConfig } from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './app/user/user.module';
import { AuthModule } from './app/auth/auth.module';
import { LineupModule } from './app/lineup/lineup.module';
import { MapModule } from './app/map/map.module';
import { ActionModule } from './app/action/actions.module';
import { ActionTypeModule } from './app/action-type/actionsType.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getDatabaseConfig,
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    LineupModule,
    MapModule,
    ActionModule,
    ActionTypeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
