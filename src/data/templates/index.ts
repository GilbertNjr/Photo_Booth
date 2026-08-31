import type { TemplateData } from '../../types/template';
import {
  templateCatchYoursStrip,
} from './catchYours';
import { templateCaramelClick } from './caramelClick';
import { templatePinkScrapbookCollage } from './pinkScrapbookCollage';
import {
  templateSweetMoment,
  templateSpecialDay,
  templateFilmStory,
  templateMovieLove,
  templateDailyChronicle,
} from './masterTemplates';
import { cardBurgundyGinghamScrapbook } from './burgundyScrapbook';
import {
  cardFavoritePersonScrapbook,
  cardDarkRomanceCherries,
  cardSilverDigicamGingham,
  cardILoveYouFloralGrid,
} from './fiveAssetTemplates';
import {
  cardMinimalLuxury,
  cardY2K,
} from './twelveCards';
import {
  bandungDigicam,
  jogjaHeritage,
} from './indonesiaTemplates';
import {
  seoulLife4Cuts,
  tokyoPurikura,
} from './globalCountry';
import {
  gradNavyVictory,
  gradBurgundyHonors,
  gradEmeraldScholar,
  gradGazettePress,
} from './graduation';
import {
  friendshipBestieForever,
  friendshipSquadGoals,
  friendshipY2KGingham,
} from './friendship';
import {
  bdayPartyCelebration,
  bdayGoldenJubilee,
  bdaySweetSixteen,
  bdayCowgirlParty,
} from './birthday';

import {
  templateSakuraMemories,
  templateOurMemoryKorea,
  templateBeautifulTimeChina,
  templateSpecialMomentFusion,
  templateEternalMemoryFusion,
} from './asianFusionTemplates';

import {
  templateSakura2x3Grid,
  templateOurMemory2x3Grid,
  templateBeautifulTime2x3Grid,
  templateSpecialMoment2x3Grid,
  templateSlowMoments2x3Grid,
  templateMemoriesForever2x3Grid,
  templateDreamyDays2x3Grid,
  templateClassicNoir2x3Grid,
  templateSakura1x3Strip,
  templateOurMemory1x3Strip,
  templateBeautifulTime1x3Strip,
  templateSpecialMoment1x3Strip,
  templateSlowMoments1x3Strip,
  templateMemoriesForever1x3Strip,
  templateDreamyDays1x3Strip,
  templateClassicNoir1x3Strip,
  templateGoodTimes1x3Strip,
  templateLittleThings1x3Strip,
} from './gridAndStripVariants';

export const TEMPLATES: TemplateData[] = [
  // 🌸 0. Asian Fusion & Master Series (5 Photos)
  templateSakuraMemories,
  templateOurMemoryKorea,
  templateBeautifulTimeChina,
  templateSpecialMomentFusion,
  templateEternalMemoryFusion,

  // ⏹️ 1. 2x3 Grid Layout Series (6 Photos)
  templateSakura2x3Grid,
  templateOurMemory2x3Grid,
  templateBeautifulTime2x3Grid,
  templateSpecialMoment2x3Grid,
  templateSlowMoments2x3Grid,
  templateMemoriesForever2x3Grid,
  templateDreamyDays2x3Grid,
  templateClassicNoir2x3Grid,

  // 🎞️ 2. 1x3 Strip Layout Series (3 Photos)
  templateSakura1x3Strip,
  templateOurMemory1x3Strip,
  templateBeautifulTime1x3Strip,
  templateSpecialMoment1x3Strip,
  templateSlowMoments1x3Strip,
  templateMemoriesForever1x3Strip,
  templateDreamyDays1x3Strip,
  templateClassicNoir1x3Strip,
  templateGoodTimes1x3Strip,
  templateLittleThings1x3Strip,

  // 💖 3. Romantic (5)
  templateSweetMoment,
  cardFavoritePersonScrapbook,
  cardDarkRomanceCherries,
  cardILoveYouFloralGrid,
  templateMovieLove,

  // 👯 4. Friendship / Bestie (5)
  friendshipBestieForever,
  friendshipSquadGoals,
  templateCaramelClick,
  friendshipY2KGingham,
  cardBurgundyGinghamScrapbook,

  // 🎓 5. Graduation (4)
  gradNavyVictory,
  gradBurgundyHonors,
  gradEmeraldScholar,
  gradGazettePress,

  // 🎀 6. Cute (4)
  templateCatchYoursStrip,
  templatePinkScrapbookCollage,
  seoulLife4Cuts,
  tokyoPurikura,

  // 📷 7. Vintage (4)
  templateSpecialDay,
  templateFilmStory,
  templateDailyChronicle,
  jogjaHeritage,

  // 💎 8. Minimal (4)
  cardMinimalLuxury,
  cardSilverDigicamGingham,
  bandungDigicam,
  cardY2K,

  // 🎂 9. Birthday (4)
  bdayPartyCelebration,
  bdayGoldenJubilee,
  bdaySweetSixteen,
  bdayCowgirlParty,
];

export * from './masterTemplates';
export * from './catchYours';
export * from './caramelClick';
export * from './pinkScrapbookCollage';
export * from './twelveCards';
export * from './indonesiaTemplates';
export * from './globalCountry';
export * from './burgundyScrapbook';
export * from './fiveAssetTemplates';
export * from './graduation';
export * from './friendship';
export * from './birthday';
export * from './asianFusionTemplates';
export * from './gridAndStripVariants';
