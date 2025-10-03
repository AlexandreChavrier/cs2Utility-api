import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

// Charger les variables d'environnement
config();

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get<string>('DB_HOST', 'localhost'),
  port: configService.get<number>('DB_PORT', 5432),
  username: configService.get<string>('DB_USERNAME', 'dev'),
  password: configService.get<string>('DB_PASSWORD', 'cs2utility-dev'),
  database: configService.get<string>('DB_DATABASE', 'cs2utility-api-dev'),
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  logging: configService.get<string>('NODE_ENV') === 'development',
});
