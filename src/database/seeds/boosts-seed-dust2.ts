import { DataSource } from 'typeorm';
import { Map } from '../../app/entities/map.entity';
import { ActionType } from '../../app/entities/actionType.entity';
import { DestinationPoint } from '../../app/entities/destinationPoint.entity';
import { Action } from '../../app/entities/action.entity';
import { SIDE } from '../../app/enums/game/side.enum';

export async function seedDust2BoostActions(dataSource: DataSource) {
  const mapRepo = dataSource.getRepository(Map);
  const actionTypeRepo = dataSource.getRepository(ActionType);
  const destinationPointRepo = dataSource.getRepository(DestinationPoint);
  const actionRepo = dataSource.getRepository(Action);

  // 1. Récupérer la map Dust2
  const dust2 = await mapRepo.findOne({ where: { id: 'dust2' } });
  if (!dust2) {
    throw new Error("❌ Map Dust2 non trouvée. Assurez-vous qu'elle existe.");
  }
  console.log('✓ Map Dust2 trouvée');

  // 2. Récupérer ou créer l'action type "boost"
  let boostType = await actionTypeRepo.findOne({ where: { id: 'boost' } });
  if (!boostType) {
    boostType = await actionTypeRepo.save({
      id: 'boost',
      name: 'Boost',
      iconUrl: '/assets/actionIcons/boost.webp',
    });
    console.log('✅ ActionType Boost créé');
  } else {
    console.log('✓ ActionType Boost trouvé');
  }

  // 3. Définir tous les boosts (position = où on se met pour boost)
  const boostsData = [
    {
      title: 'Boost boxes long doors',
      x: 65.56,
      y: 59.08,
    },
    {
      title: 'Boost Suicide',
      x: 45.79,
      y: 84.7,
    },
    {
      title: 'Boost B window',
      x: 30.46,
      y: 13.18,
    },
    {
      title: 'Boost CT boxes',
      x: 52.56,
      y: 26.36,
    },
    {
      title: 'Boost A site',
      x: 70.0,
      y: 18.51,
    },
    {
      title: 'Boost blue container long',
      x: 69.11,
      y: 45.16,
    },
  ];

  // 4. Créer chaque destination point et action associée
  console.log('\n📍 Création des boosts...\n');

  for (const data of boostsData) {
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
        label: data.title,
        iconUrl: '/assets/inGameActions/boost.webp',
      });
      console.log(
        `✅ DestinationPoint créé: ${data.title} (${data.x}, ${data.y})`,
      );
    } else {
      console.log(`✓ DestinationPoint existe déjà: ${data.title}`);
    }

    // Vérifier si une action existe déjà pour ce point
    const existingAction = await actionRepo.findOne({
      where: {
        mapId: dust2.id,
        destinationPointId: destinationPoint.uuid,
        actionTypeId: boostType.id,
      },
    });

    // Créer l'action si elle n'existe pas
    if (!existingAction) {
      const action = await actionRepo.save({
        title: data.title,
        mapId: dust2.id,
        destinationPointId: destinationPoint.uuid,
        actionTypeId: boostType.id,
        fromX: data.x,
        fromY: data.y,
        side: SIDE.ANY,
        imageUrl: '/assets/actions/placeholder.webp',
        thumbnailUrl: '/assets/actions/placeholder-thumb.webp',
        videoUrl: '',
        instructions: `${data.title} - À compléter`,
        votes: 0,
        views: 0,
      });
      console.log(`✅ Action créée: ${data.title} (${action.uuid})`);
    } else {
      console.log(`✓ Action existe déjà: ${data.title}`);
    }
  }

  console.log('\n🎉 Seed des actions boost terminé !');
}
