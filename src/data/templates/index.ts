import type { TemplateData } from '../../types/template';
import {
  templateSweetMoment,
  templateSpecialDay,
  templateFilmStory,
  templateMovieLove,
  templateBetterTogether,
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
  // 🌟 5 Master Curated Graphic Art Photobooth Templates
  templateSweetMoment,
  templateSpecialDay,
  templateFilmStory,
  templateMovieLove,
  templateBetterTogether,

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
export * from './twelveCards';
export * from './indonesiaTemplates';
export * from './globalCountry';
export * from './burgundyScrapbook';
export * from './fiveAssetTemplates';
