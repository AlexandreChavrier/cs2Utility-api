import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Configuration du préfixe global

  // Configuration des pipes globaux
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.use(cookieParser());

  const allowedOrigins = configService.get<string>(
    'ALLOWED_ORIGINS',
    'http://localhost:3000',
  );
  // Configuration CORS
  app.enableCors({
    origin: allowedOrigins.split(','),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const port = configService.get<number>('PORT', 4000);
  await app.listen(port);

  console.log(`🚀 Application running on: http://localhost:${port}`);
  console.log(`🔧 API endpoints: http://localhost:${port}/`);
}
bootstrap();
