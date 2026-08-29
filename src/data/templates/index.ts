import type { TemplateData } from '../../types/template';
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
  // 🌟 Featured Asset Frame Cards from User Images
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

export * from './twelveCards';
export * from './indonesiaTemplates';
export * from './globalCountry';
export * from './burgundyScrapbook';
export * from './fiveAssetTemplates';
