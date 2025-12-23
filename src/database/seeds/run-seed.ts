import { DataSource } from 'typeorm';
import { AppDataSource } from '../data-source'; // Ton DataSource
import { seedDust2CtSmokeDestinations } from './ct-smokes-dust2-seed';

async function runSeed() {
  try {
    // Initialise la connexion
    await AppDataSource.initialize();
    console.log('📦 Connexion DB établie');

    // Exécute le seed
    await seedDust2CtSmokeDestinations(AppDataSource);

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
