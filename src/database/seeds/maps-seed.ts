// src/database/seeds/seed-maps.ts
import { DataSource } from 'typeorm';
import { Map } from '../../app/entities/map.entity';

interface MapData {
  id: string;
  displayName: string;
  imageUrl: string;
  radarUrl: string;
  iconUrl: string;
  radarUpUrl?: string;
  radarDownUrl?: string;
  active: boolean;
}

const ALL_MAPS: MapData[] = [
  {
    id: 'dust2',
    displayName: 'Dust II',
    imageUrl: '/assets/maps/dust2/image.webp',
    radarUrl: '/assets/maps/dust2/radar.webp',
    iconUrl: '/assets/maps/dust2/icon.webp',
    active: true,
  },
  {
    id: 'mirage',
    displayName: 'Mirage',
    imageUrl: '/assets/maps/mirage/image.webp',
    radarUrl: '/assets/maps/mirage/radar.webp',
    iconUrl: '/assets/maps/mirage/icon.webp',
    active: true,
  },
  {
    id: 'inferno',
    displayName: 'Inferno',
    imageUrl: '/assets/maps/inferno/image.webp',
    radarUrl: '/assets/maps/inferno/radar.webp',
    iconUrl: '/assets/maps/inferno/icon.webp',
    active: true,
  },
  {
    id: 'nuke',
    displayName: 'Nuke',
    imageUrl: '/assets/maps/nuke/image.webp',
    radarUrl: '/assets/maps/nuke/radar.webp',
    iconUrl: '/assets/maps/nuke/icon.webp',
    radarUpUrl: '/assets/maps/nuke/radar-up.webp',
    radarDownUrl: '/assets/maps/nuke/radar-down.webp',
    active: true,
  },
  {
    id: 'overpass',
    displayName: 'Overpass',
    imageUrl: '/assets/maps/overpass/image.webp',
    radarUrl: '/assets/maps/overpass/radar.webp',
    iconUrl: '/assets/maps/overpass/icon.webp',
    active: true,
  },
  {
    id: 'vertigo',
    displayName: 'Vertigo',
    imageUrl: '/assets/maps/vertigo/image.webp',
    radarUrl: '/assets/maps/vertigo/radar.webp',
    iconUrl: '/assets/maps/vertigo/icon.webp',
    active: false,
  },
  {
    id: 'anubis',
    displayName: 'Anubis',
    imageUrl: '/assets/maps/anubis/image.webp',
    radarUrl: '/assets/maps/anubis/radar.webp',
    iconUrl: '/assets/maps/anubis/icon.webp',
    active: false,
  },
  {
    id: 'ancient',
    displayName: 'Ancient',
    imageUrl: '/assets/maps/ancient/image.webp',
    radarUrl: '/assets/maps/ancient/radar.webp',
    iconUrl: '/assets/maps/ancient/icon.webp',
    active: true,
  },
  {
    id: 'train',
    displayName: 'Train',
    imageUrl: '/assets/maps/train/image.webp',
    radarUrl: '/assets/maps/train/radar.webp',
    iconUrl: '/assets/maps/train/icon.webp',
    active: true,
  },
  {
    id: 'cache',
    displayName: 'Cache',
    imageUrl: '/assets/maps/cache/image.webp',
    radarUrl: '/assets/maps/cache/radar.webp',
    iconUrl: '/assets/maps/cache/icon.webp',
    active: false,
  },
  {
    id: 'cobblestone',
    displayName: 'Cobblestone',
    imageUrl: '/assets/maps/cobblestone/image.webp',
    radarUrl: '/assets/maps/cobblestone/radar.webp',
    iconUrl: '/assets/maps/cobblestone/icon.webp',
    active: false,
  },

  // ========== HOSTAGE MAPS ==========
  {
    id: 'office',
    displayName: 'Office',
    imageUrl: '/assets/maps/office/image.webp',
    radarUrl: '/assets/maps/office/radar.webp',
    iconUrl: '/assets/maps/office/icon.webp',
    active: false,
  },
  {
    id: 'italy',
    displayName: 'Italy',
    imageUrl: '/assets/maps/italy/image.webp',
    radarUrl: '/assets/maps/italy/radar.webp',
    iconUrl: '/assets/maps/italy/icon.webp',
    active: false,
  },
  {
    id: 'agency',
    displayName: 'Agency',
    imageUrl: '/assets/maps/agency/image.webp',
    radarUrl: '/assets/maps/agency/radar.webp',
    iconUrl: '/assets/maps/agency/icon.webp',
    active: false,
  },
  {
    id: 'militia',
    displayName: 'Militia',
    imageUrl: '/assets/maps/militia/image.webp',
    radarUrl: '/assets/maps/militia/radar.webp',
    iconUrl: '/assets/maps/militia/icon.webp',
    active: false,
  },
  {
    id: 'assault',
    displayName: 'Assault',
    imageUrl: '/assets/maps/assault/image.webp',
    radarUrl: '/assets/maps/assault/radar.webp',
    iconUrl: '/assets/maps/assault/icon.webp',
    active: false,
  },

  // ========== WINGMAN MAPS ==========
  {
    id: 'shortdust',
    displayName: 'Short Dust',
    imageUrl: '/assets/maps/shortdust/image.webp',
    radarUrl: '/assets/maps/shortdust/radar.webp',
    iconUrl: '/assets/maps/shortdust/icon.webp',
    active: false,
  },
  {
    id: 'shortnuke',
    displayName: 'Short Nuke',
    imageUrl: '/assets/maps/shortnuke/image.webp',
    radarUrl: '/assets/maps/shortnuke/radar.webp',
    iconUrl: '/assets/maps/shortnuke/icon.webp',
    active: false,
  },
  {
    id: 'boyard',
    displayName: 'Boyard',
    imageUrl: '/assets/maps/boyard/image.webp',
    radarUrl: '/assets/maps/boyard/radar.webp',
    iconUrl: '/assets/maps/boyard/icon.webp',
    active: false,
  },
  {
    id: 'lake',
    displayName: 'Lake',
    imageUrl: '/assets/maps/lake/image.webp',
    radarUrl: '/assets/maps/lake/radar.webp',
    iconUrl: '/assets/maps/lake/icon.webp',
    active: false,
  },
  {
    id: 'safehouse',
    displayName: 'Safehouse',
    imageUrl: '/assets/maps/safehouse/image.webp',
    radarUrl: '/assets/maps/safehouse/radar.webp',
    iconUrl: '/assets/maps/safehouse/icon.webp',
    active: false,
  },

  // ========== AUTRES MAPS OFFICIELLES ==========
  {
    id: 'basalt',
    displayName: 'Basalt',
    imageUrl: '/assets/maps/basalt/image.webp',
    radarUrl: '/assets/maps/basalt/radar.webp',
    iconUrl: '/assets/maps/basalt/icon.webp',
    active: false,
  },
  {
    id: 'iris',
    displayName: 'Iris',
    imageUrl: '/assets/maps/iris/image.webp',
    radarUrl: '/assets/maps/iris/radar.webp',
    iconUrl: '/assets/maps/iris/icon.webp',
    active: false,
  },
  {
    id: 'mills',
    displayName: 'Mills',
    imageUrl: '/assets/maps/mills/image.webp',
    radarUrl: '/assets/maps/mills/radar.webp',
    iconUrl: '/assets/maps/mills/icon.webp',
    active: false,
  },
  {
    id: 'shoots',
    displayName: 'Shoots',
    imageUrl: '/assets/maps/shoots/image.webp',
    radarUrl: '/assets/maps/shoots/radar.webp',
    iconUrl: '/assets/maps/shoots/icon.webp',
    active: false,
  },
  {
    id: 'assembly',
    displayName: 'Assembly',
    imageUrl: '/assets/maps/assembly/image.webp',
    radarUrl: '/assets/maps/assembly/radar.webp',
    iconUrl: '/assets/maps/assembly/icon.webp',
    active: false,
  },
  {
    id: 'memento',
    displayName: 'Memento',
    imageUrl: '/assets/maps/memento/image.webp',
    radarUrl: '/assets/maps/memento/radar.webp',
    iconUrl: '/assets/maps/memento/icon.webp',
    active: false,
  },
  {
    id: 'pool_day',
    displayName: 'Pool Day',
    imageUrl: '/assets/maps/pool_day/image.webp',
    radarUrl: '/assets/maps/pool_day/radar.webp',
    iconUrl: '/assets/maps/pool_day/icon.webp',
    active: false,
  },
  {
    id: 'thera',
    displayName: 'Thera',
    imageUrl: '/assets/maps/thera/image.webp',
    radarUrl: '/assets/maps/thera/radar.webp',
    iconUrl: '/assets/maps/thera/icon.webp',
    active: false,
  },
];

export async function seedMaps(dataSource: DataSource) {
  const mapRepo = dataSource.getRepository(Map);

  console.log('🗺️  Début du seed des maps...\n');

  let createdCount = 0;
  let updatedCount = 0;

  for (const mapData of ALL_MAPS) {
    const existingMap = await mapRepo.findOne({ where: { id: mapData.id } });

    if (!existingMap) {
      await mapRepo.save(mapData);
      console.log(
        `✅ Map "${mapData.displayName}" créée ${mapData.active ? '(ACTIVE)' : '(inactive)'}`,
      );
      createdCount++;
    } else {
      await mapRepo.update({ id: mapData.id }, mapData);
      console.log(
        `✓ Map "${mapData.displayName}" mise à jour ${mapData.active ? '(ACTIVE)' : '(inactive)'}`,
      );
      updatedCount++;
    }
  }

  const activeMaps = ALL_MAPS.filter((m) => m.active).length;

  console.log('\n🎉 Seed des maps terminé !');
  console.log(`📊 Total : ${ALL_MAPS.length} maps`);
  console.log(`   ✅ ${createdCount} créées`);
  console.log(`   🔄 ${updatedCount} mises à jour`);
  console.log(`   🎮 ${activeMaps} maps actives (pool compétitif)`);
  console.log(`   📦 ${ALL_MAPS.length - activeMaps} maps réserve/wingman\n`);
}
