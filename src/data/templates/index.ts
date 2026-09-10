import type { TemplateData } from '../../types/template';
import { templateCaramelClick } from './caramelClick';
import {
  templateSweetMoment,
  templateSpecialDay,
  templateFilmStory,
  templateMovieLove,
  templateBetterTogether,
  templateDailyChronicle,
} from './masterTemplates';
import {
  templateCatchYoursStrip,
  templateCatchYoursDual,
} from './catchYours';
import { templatePinkScrapbookCollage } from './pinkScrapbookCollage';
import { cardBurgundyGinghamScrapbook } from './burgundyScrapbook';
import { haruSky01 } from './haruSky';
import {
  cardFavoritePersonScrapbook,
  cardDarkRomanceCherries,
  cardSilverDigicamGingham,
  cardILoveYouFloralGrid,
  cardRetroVinylCassetteFilm,
} from './fiveAssetTemplates';
import {
  cardScrapbook,
  cardPolaroid,
  cardFilmStrip,
  cardTicket,
  cardNewspaper,
  cardCuteSticker,
  cardRetroCamera,
  cardMinimalLuxury,
  cardY2K,
  cardPostcard,
  cardRomanticFlower,
  cardPhotoboothClassic,
} from './twelveCards';
import {
  nusantaraPostcard,
  jakartaLife4cuts,
  baliPolaroid,
  bandungDigicam,
  jogjaHeritage,
} from './indonesiaTemplates';
import {
  seoulLife4Cuts,
  tokyoPurikura,
  parisRiviera,
  romaCinema,
  nycDigicam,
  nusantaraBatik,
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
import {
  gradNavyVictory,
  gradBurgundyHonors,
  gradEmeraldScholar,
  gradGazettePress,
} from './graduation';
import { seasonalSummer01 } from './seasonal';

export const TEMPLATES: TemplateData[] = [
  // 💖 1. Romantic
  templateCatchYoursStrip,
  templateCatchYoursDual,
  templateSweetMoment,
  cardFavoritePersonScrapbook,
  cardDarkRomanceCherries,
  cardILoveYouFloralGrid,
  templateMovieLove,
  cardRomanticFlower,

  // 👯 2. Friendship / Bestie
  friendshipBestieForever,
  friendshipSquadGoals,
  templateCaramelClick,
  templateBetterTogether,
  friendshipY2KGingham,
  baliPolaroid,

  // 🎀 3. Cute & Scrapbook
  seoulLife4Cuts,
  tokyoPurikura,
  haruSky01,
  templatePinkScrapbookCollage,
  cardBurgundyGinghamScrapbook,
  cardScrapbook,
  cardCuteSticker,

  // 📷 4. Vintage & Film Strip
  templateSpecialDay,
  templateFilmStory,
  templateDailyChronicle,
  jogjaHeritage,
  cardFilmStrip,
  cardTicket,
  cardNewspaper,
  cardRetroCamera,
  cardRetroVinylCassetteFilm,
  parisRiviera,
  romaCinema,

  // 💎 5. Minimal & Y2K
  cardMinimalLuxury,
  cardSilverDigicamGingham,
  bandungDigicam,
  nycDigicam,
  cardY2K,
  cardPolaroid,
  cardPostcard,
  cardPhotoboothClassic,
  jakartaLife4cuts,
  nusantaraPostcard,
  nusantaraBatik,

  // 🎂 6. Birthday
  bdayPartyCelebration,
  bdayGoldenJubilee,
  bdaySweetSixteen,
  bdayCowgirlParty,

  // 🎓 7. Graduation
  gradNavyVictory,
  gradBurgundyHonors,
  gradEmeraldScholar,
  gradGazettePress,

  // 🌴 8. Seasonal
  seasonalSummer01,
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
export * from './seasonal';
export * from './haruSky';

