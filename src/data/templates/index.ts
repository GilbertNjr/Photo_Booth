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

export const TEMPLATES: TemplateData[] = [
  // 💖 1. Romantic (5)
  templateSweetMoment,
  cardFavoritePersonScrapbook,
  cardDarkRomanceCherries,
  cardILoveYouFloralGrid,
  templateMovieLove,

  // 👯 2. Friendship / Bestie (5)
  friendshipBestieForever,
  friendshipSquadGoals,
  templateCaramelClick,
  friendshipY2KGingham,
  cardBurgundyGinghamScrapbook,

  // 🎓 3. Graduation (4)
  gradNavyVictory,
  gradBurgundyHonors,
  gradEmeraldScholar,
  gradGazettePress,

  // 🎀 4. Cute (4)
  templateCatchYoursStrip,
  templatePinkScrapbookCollage,
  seoulLife4Cuts,
  tokyoPurikura,

  // 📷 5. Vintage (4)
  templateSpecialDay,
  templateFilmStory,
  templateDailyChronicle,
  jogjaHeritage,

  // 💎 6. Minimal (4)
  cardMinimalLuxury,
  cardSilverDigicamGingham,
  bandungDigicam,
  cardY2K,

  // 🎂 7. Birthday (4)
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
