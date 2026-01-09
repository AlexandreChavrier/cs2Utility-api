import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

// Charger les variables d'environnement
config();

const configService = new ConfigService();

// Fonction pour parser DATABASE_URL ou utiliser les variables séparées
function getDatabaseConfig() {
  const databaseUrl = configService.get<string>('DATABASE_URL');

  if (databaseUrl) {
    // Si DATABASE_URL existe, on l'utilise
    return {
      type: 'postgres' as const,
      url: databaseUrl,
      ssl: {
        rejectUnauthorized: false, // Nécessaire pour Neon/Supabase
      },
    };
  }

  // Sinon, on utilise les variables séparées (pour dev local)
  return {
    type: 'postgres' as const,
    host: configService.get<string>('DB_HOST', 'localhost'),
    port: configService.get<number>('DB_PORT', 5432),
    username: configService.get<string>('DB_USERNAME', 'dev'),
    password: configService.get<string>('DB_PASSWORD', 'cs2utility-dev'),
    database: configService.get<string>('DB_DATABASE', 'cs2utility-api-dev'),
  };
}

export const AppDataSource = new DataSource({
  ...getDatabaseConfig(),
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  logging: configService.get<string>('NODE_ENV') === 'development',
});
