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
  templateBetterTogether,
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

export const TEMPLATES: TemplateData[] = [
  // 🌟 Featured Pinterest Reference Frames
  templateCatchYoursStrip,
  templateCatchYoursDual,
  templateCaramelClick,
  templatePinkScrapbookCollage,

  // 🌟 6 Master Curated Graphic Art Photobooth Templates
  templateSweetMoment,
  templateSpecialDay,
  templateFilmStory,
  templateMovieLove,
  templateBetterTogether,
  templateDailyChronicle,

  // 🎨 Featured Asset Frame Cards
  cardFavoritePersonScrapbook,
  cardDarkRomanceCherries,
  cardSilverDigicamGingham,
  cardILoveYouFloralGrid,
  cardRetroVinylCassetteFilm,
  cardBurgundyGinghamScrapbook,

  // 🎨 Distinct Pinterest Aesthetic Personality Cards
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

  // 🇮🇩 Nusantara & Global Collection
  nusantaraPostcard,
  jakartaLife4cuts,
  baliPolaroid,
  bandungDigicam,
  jogjaHeritage,
  seoulLife4Cuts,
  tokyoPurikura,
  parisRiviera,
  romaCinema,
  nycDigicam,
  nusantaraBatik,
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
