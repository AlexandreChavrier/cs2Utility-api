// src/database/seeds/seed-action-types.ts
import { DataSource } from 'typeorm';
import { ActionType } from '../../app/entities/actionType.entity';
import { ACTION_TYPE } from 'src/app/enums/game/actions.enum';

interface ActionTypeData {
  id: string;
  name: string;
  iconUrl: string;
}

const ALL_ACTION_TYPES: ActionTypeData[] = [
  {
    id: 'boost',
    name: 'Boost', // ✅
    iconUrl: '/assets/inGameActions/boost.webp',
  },
  {
    id: 'wallbang',
    name: 'Wallbang', // ✅ Pas "Prefire lines" !
    iconUrl: '/assets/inGameActions/wallbang.webp',
  },
  {
    id: 'prefire',
    name: 'Prefire lines', // ✅
    iconUrl: '/assets/inGameActions/prefireLine.webp',
  },
  {
    id: 'bomb-plant',
    name: 'Bomb safe plant', // ✅
    iconUrl: '/assets/inGameActions/bombSafePlant.webp',
  },
];

export async function seedActionTypes(dataSource: DataSource) {
  const actionTypeRepo = dataSource.getRepository(ActionType);

  console.log('🎯 Début du seed des action types...\n');

  let createdCount = 0;
  let updatedCount = 0;

  for (const actionTypeData of ALL_ACTION_TYPES) {
    const existing = await actionTypeRepo.findOne({
      where: { id: actionTypeData.id },
    });

    if (!existing) {
      await actionTypeRepo.save(actionTypeData);
      console.log(`✅ ActionType "${actionTypeData.name}" créé`);
      createdCount++;
    } else {
      await actionTypeRepo.update({ id: actionTypeData.id }, actionTypeData);
      console.log(`✓ ActionType "${actionTypeData.name}" mis à jour`);
      updatedCount++;
    }
  }

  console.log('\n🎉 Seed des action types terminé !');
  console.log(`📊 Total : ${ALL_ACTION_TYPES.length} action types`);
  console.log(`   ✅ ${createdCount} créés`);
  console.log(`   🔄 ${updatedCount} mis à jour\n`);
}
