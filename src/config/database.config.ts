import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getAppDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const databaseUrl = configService.get<string>('DATABASE_URL');

  // 🔍 LOGS DE DEBUG CRITIQUES
  console.log('==========================================');
  console.log('🔗 DATABASE_URL présente ?', !!databaseUrl);

  if (databaseUrl) {
    const maskedUrl = databaseUrl.replace(/:([^@]+)@/, ':****@');
    console.log('🔗 DATABASE_URL (masqué):', maskedUrl);

    // Parse l'URL pour voir les détails
    try {
      const url = new URL(databaseUrl.replace('postgresql://', 'http://'));
      console.log('📍 Hostname:', url.hostname);
      console.log('📍 Database:', url.pathname.substring(1).split('?')[0]);
      console.log('📍 Search params:', url.search);
    } catch (e) {
      console.log('❌ Erreur parsing URL');
    }
    console.log('==========================================');

    return {
      type: 'postgres',
      url: databaseUrl,
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: false,
      logging: ['query', 'error'], // ← Active TOUS les logs SQL
      autoLoadEntities: true,
    };
  }

  console.log('⚠️ Using separate DB variables (FALLBACK)');
  console.log('==========================================');
  return {
    type: 'postgres',
    host: configService.get<string>('DB_HOST', 'localhost'),
    port: configService.get<number>('DB_PORT', 5432),
    username: configService.get<string>('DB_USERNAME', 'dev'),
    password: configService.get<string>('DB_PASSWORD', 'cs2utility-dev'),
    database: configService.get<string>('DB_DATABASE', 'cs2utility-api-dev'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false,
    logging: ['query', 'error'],
    autoLoadEntities: true,
  };
};
