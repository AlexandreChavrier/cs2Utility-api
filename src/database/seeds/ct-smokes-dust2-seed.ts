import { DataSource } from 'typeorm';
import { Map } from '../../app/entities/map.entity';
import { UtilityType } from '../../app/entities/utilityType.entity';
import { DestinationPoint } from '../../app/entities/destinationPoint.entity';
import { Lineup } from '../../app/entities/lineup.entity';
import { SIDE } from '../../app/enums/game/side.enum';

export async function seedDust2CtSmokeDestinations(dataSource: DataSource) {
  const mapRepo = dataSource.getRepository(Map);
  const utilityTypeRepo = dataSource.getRepository(UtilityType);
  const destinationPointRepo = dataSource.getRepository(DestinationPoint);
  const lineupRepo = dataSource.getRepository(Lineup);

  // 1. Récupérer la map Dust2 (elle existe déjà)
  const dust2 = await mapRepo.findOne({ where: { id: 'dust2' } });
  if (!dust2) {
    throw new Error("❌ Map Dust2 non trouvée. Assurez-vous qu'elle existe.");
  }
  console.log('✓ Map Dust2 trouvée');

  // 2. Récupérer le type utility "smoke" (il existe déjà)
  const smokeType = await utilityTypeRepo.findOne({ where: { id: 'smoke' } });
  if (!smokeType) {
    throw new Error('❌ UtilityType Smoke non trouvé.');
  }
  console.log('✓ UtilityType Smoke trouvé');

  // 3. Définir tous les destination points avec leurs lineups
  const destinationsWithLineups = [
    {
      x: 63.96,
      y: 55.46,
      label: 'Long Doors',
      throwFromX: 0,
      throwFromY: 0,
      title: 'Long Doors smoke',
    },
    {
      x: 77.4,
      y: 39.82,
      label: 'Long Block',
      throwFromX: 25,
      throwFromY: 80,
      title: 'Long Block smoke',
    },
    {
      x: 45.94,
      y: 68.12,
      label: 'Suicide',
      throwFromX: 28,
      throwFromY: 82,
      title: 'Suicide smoke',
    },
    {
      x: 20.13,
      y: 40.25,
      label: 'B Tunnel',
      throwFromX: 35,
      throwFromY: 88,
      title: 'B Tunnel smoke',
    },
    {
      x: 51.91,
      y: 63.14,
      label: 'Top Mid',
      throwFromX: 32,
      throwFromY: 85,
      title: 'Top Mid smoke',
    },
  ];

  // 4. Créer chaque destination point + lineup associée
  console.log('\n📍 Création des destination points et lineups...\n');

  for (const data of destinationsWithLineups) {
    // Vérifier si le destination point existe
    let destinationPoint = await destinationPointRepo.findOne({
      where: {
        mapId: dust2.id,
        x: data.x,
        y: data.y,
      },
    });

    // Créer le destination point s'il n'existe pas
    if (!destinationPoint) {
      destinationPoint = await destinationPointRepo.save({
        mapId: dust2.id,
        x: data.x,
        y: data.y,
        label: data.label,
        iconUrl: '/assets/utilityIcons/smoke/ctBadge.webp',
      });
      console.log(
        `✅ DestinationPoint créé: ${data.label} (${data.x}, ${data.y})`,
      );
    } else {
      console.log(`✓ DestinationPoint existe déjà: ${data.label}`);
    }

    // Vérifier si un lineup existe pour ce point
    const existingLineup = await lineupRepo.findOne({
      where: {
        mapId: dust2.id,
        destinationPointId: destinationPoint.uuid,
        utilityTypeId: smokeType.id,
      },
    });

    // Créer un lineup factice s'il n'existe pas
    if (!existingLineup) {
      const lineup = await lineupRepo.save({
        title: data.title,
        mapId: dust2.id,
        destinationPointId: destinationPoint.uuid,
        utilityTypeId: smokeType.id,
        throwFromX: data.throwFromX,
        throwFromY: data.throwFromY,
        side: SIDE.CT,
        imageUrl: '',
        thumbnailUrl: '',
        videoUrl: '',
        instructions: `Smoke pour ${data.label} - À compléter`,
        votes: 0,
        views: 0,
      });
      console.log(`✅ Lineup créé pour ${data.label}: ${lineup.uuid}`);
    } else {
      console.log(`✓ Lineup existe déjà pour ${data.label}`);
    }
  }

  console.log('\n🎉 Seed des destination points et lineups terminé !');
}
