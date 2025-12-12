import { DataSource } from 'typeorm';
import { AppDataSource } from '../data-source'; // Ton DataSource
import { seedDust2BoostActions } from './boosts-seed-dust2';

async function runSeed() {
  try {
    // Initialise la connexion
    await AppDataSource.initialize();
    console.log('📦 Connexion DB établie');

    // Exécute le seed
    await seedDust2BoostActions(AppDataSource);

    // Ferme la connexion
    await AppDataSource.destroy();
    console.log('✅ Seed terminé, connexion fermée');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors du seed:', error);
    process.exit(1);
  }
}

runSeed();
