import type { TemplateData } from '../../types/template';
import {
  templateCatchYoursStrip,
  templateCatchYoursDual,
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
  cardRetroVinylCassetteFilm,
} from './fiveAssetTemplates';
import {
  cardCuteSticker,
  cardMinimalLuxury,
  cardY2K,
  cardPostcard,
} from './twelveCards';
import {
  jakartaLife4cuts,
  baliPolaroid,
  bandungDigicam,
  jogjaHeritage,
} from './indonesiaTemplates';
import {
  seoulLife4Cuts,
  tokyoPurikura,
  parisRiviera,
  nusantaraBatik,
} from './globalCountry';

export const TEMPLATES: TemplateData[] = [
  // 🌟 1. Featured Pinterest Art Direction
  templateCatchYoursStrip,
  templateCatchYoursDual,
  templateCaramelClick,
  templatePinkScrapbookCollage,

  // 🎀 2. Curated Aesthetic Scrapbook & Romantic
  templateSweetMoment,
  cardFavoritePersonScrapbook,
  cardDarkRomanceCherries,
  cardILoveYouFloralGrid,
  cardBurgundyGinghamScrapbook,

  // 📷 3. Analog Film, Vintage Tickets & 90s Digicam
  templateSpecialDay,
  templateFilmStory,
  cardSilverDigicamGingham,
  cardRetroVinylCassetteFilm,
  templateDailyChronicle,

  // 👑 4. Minimalist Editorial, Airmail Postcard & Y2K
  cardMinimalLuxury,
  cardPostcard,
  cardY2K,
  cardCuteSticker,
  templateMovieLove,

  // 🌏 5. Global Cities & Nusantara Cultural Heritage
  seoulLife4Cuts,
  tokyoPurikura,
  parisRiviera,
  baliPolaroid,
  nusantaraBatik,
  jakartaLife4cuts,
  bandungDigicam,
  jogjaHeritage,
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
