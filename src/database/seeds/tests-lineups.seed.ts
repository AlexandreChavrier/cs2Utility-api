import { DataSource } from 'typeorm';
import { Map } from '../../app/entities/map.entity';
import { UtilityType } from '../../app/entities/utilityType.entity';
import { DestinationPoint } from '../../app/entities/destinationPoint.entity';
import { Lineup } from '../../app/entities/lineup.entity';
import { SIDE } from '../../app/enums/game/side.enum';

export async function seedTestLineup(dataSource: DataSource) {
  const mapRepo = dataSource.getRepository(Map);
  const utilityTypeRepo = dataSource.getRepository(UtilityType);
  const destinationPointRepo = dataSource.getRepository(DestinationPoint);
  const lineupRepo = dataSource.getRepository(Lineup);

  // 1. Créer la map Dust2
  let dust2 = await mapRepo.findOne({ where: { id: 'dust2' } });
  if (!dust2) {
    dust2 = await mapRepo.save({
      id: 'dust2',
      name: 'dust2',
      imageUrl: '/assets/maps/dust2/image.webp',
      radarUrl: '/assets/maps/dust2/radar.webp',
      iconUrl: '/assets/maps/dust2/icon.webp',
      active: true,
    });
    console.log('✅ Map Dust2 créée');
  } else {
    console.log('✓ Map Dust2 existe déjà');
  }

  // 2. Créer le type utility "smoke"
  let smokeType = await utilityTypeRepo.findOne({ where: { id: 'smoke' } });
  if (!smokeType) {
    smokeType = await utilityTypeRepo.save({
      id: 'smoke',
      name: 'smoke',
      iconUrl: '/assets/utilityIcons/smoke.webp',
    });
    console.log('✅ UtilityType Smoke créé');
  } else {
    console.log('✓ UtilityType Smoke existe déjà');
  }

  // 3. Créer le destination point (Xbox)
  let xboxDestination = await destinationPointRepo.findOne({
    where: {
      mapId: dust2.id,
      x: 48,
      y: 39.7,
    },
  });

  if (!xboxDestination) {
    xboxDestination = await destinationPointRepo.save({
      mapId: dust2.id,
      x: 48,
      y: 39.7,
      label: 'Xbox',
      iconUrl: '/assets/utilityIcons/smokeBadge.webp',
    });
    console.log('✅ DestinationPoint Xbox créé');
  } else {
    console.log('✓ DestinationPoint Xbox existe déjà');
  }

  // 4. Créer le lineup
  const existingLineup = await lineupRepo.findOne({
    where: {
      mapId: dust2.id,
      destinationPointId: xboxDestination.uuid,
      utilityTypeId: smokeType.id,
    },
  });

  if (!existingLineup) {
    const lineup = await lineupRepo.save({
      title: 'Xbox smoke depuis T spawn',
      mapId: dust2.id,
      destinationPointId: xboxDestination.uuid,
      utilityTypeId: smokeType.id,
      throwFromX: 30, // Point de départ
      throwFromY: 85, // Point de départ
      side: SIDE.T,
      imageUrl: '/assets/lineups/dust2/xbox-smoke-1.webp',
      thumbnailUrl: '/assets/lineups/dust2/xbox-smoke-1-thumb.webp',
      videoUrl: '/assets/lineups/dust2/xbox-smoke-1.mp4',
      instructions:
        'Stand in T spawn corner, aim at the top of the wall, throw smoke.',
      votes: 0,
      views: 0,
    });
    console.log('✅ Lineup créé:', lineup.uuid);
  } else {
    console.log('✓ Lineup existe déjà:', existingLineup.uuid);
  }

  console.log('\n🎉 Seed terminé !');
}
