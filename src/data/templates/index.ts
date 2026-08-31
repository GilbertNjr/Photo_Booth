import type { TemplateData } from '../../types/template';
import { templateCaramelClick } from './caramelClick';
import {
  templateSweetMoment,
  templateSpecialDay,
  templateFilmStory,
  templateMovieLove,
  templateDailyChronicle,
} from './masterTemplates';
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
  // 💖 1. Romantic
  templateSweetMoment,
  cardFavoritePersonScrapbook,
  cardDarkRomanceCherries,
  cardILoveYouFloralGrid,
  templateMovieLove,

  // 👯 2. Friendship / Bestie
  friendshipBestieForever,
  friendshipSquadGoals,
  templateCaramelClick,
  friendshipY2KGingham,

  // 🎀 3. Cute
  seoulLife4Cuts,
  tokyoPurikura,

  // 📷 4. Vintage
  templateSpecialDay,
  templateFilmStory,
  templateDailyChronicle,
  jogjaHeritage,

  // 💎 5. Minimal
  cardMinimalLuxury,
  cardSilverDigicamGingham,
  bandungDigicam,
  cardY2K,

  // 🎂 6. Birthday
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
