import type { TemplateData } from '../../types/template';
import { templateRoyalGalaTicket } from './royalGalaTicket';
import {
  templateNakatamaMarine,
  templateNakatamaCozyKnit,
} from './nakatamaScrapbook';
import { templatePinkScrapbookCollage } from './pinkScrapbookCollage';
import { cardBurgundyGinghamScrapbook } from './burgundyScrapbook';
import {
  cardFavoritePersonScrapbook,
  cardDarkRomanceCherries,
  cardSilverDigicamGingham,
  cardILoveYouFloralGrid,
  cardRetroVinylCassetteFilm,
} from './fiveAssetTemplates';
import { templateCatchYoursStrip, templateCatchYoursDual } from './catchYours';
import { templateCaramelClick } from './caramelClick';
import {
  templateSweetMoment,
  templateBetterTogether,
} from './masterTemplates';
import { haruSky01 } from './haruSky';
import { cardScrapbook, cardCuteSticker, cardRomanticFlower, cardPolaroid } from './twelveCards';
import { seoulLife4Cuts, tokyoPurikura } from './globalCountry';
import { jakartaLife4cuts, baliPolaroid } from './indonesiaTemplates';
import { friendshipBestieForever, friendshipSquadGoals, friendshipY2KGingham } from './friendship';
import { bdayPartyCelebration, bdaySweetSixteen, bdayCowgirlParty } from './birthday';
import { gradNavyVictory, gradBurgundyHonors } from './graduation';
import { seasonalSummer01 } from './seasonal';

/**
 * Curated High-Aesthetic Photobooth Catalog (Gen Z Scrapbook, Nakatama, Digicam & Y2K)
 * Obsolete plain/flat templates have been pruned per user instruction.
 */
export const TEMPLATES: TemplateData[] = [
  // 🎟️ TOP FEATURED VIP: Royal Gala VIP Ticket 3-Cuts Photostrip
  templateRoyalGalaTicket,

  // 🌟 TOP MARQUEE: Viral TikTok Scrapbook & Nakatama Themes
  templateNakatamaCozyKnit,
  templateNakatamaMarine,
  templatePinkScrapbookCollage,
  cardBurgundyGinghamScrapbook,
  cardFavoritePersonScrapbook,
  cardSilverDigicamGingham,
  cardDarkRomanceCherries,

  // 💖 1. Romantic & Best Sellers
  templateCatchYoursStrip,
  templateCatchYoursDual,
  cardILoveYouFloralGrid,
  templateSweetMoment,
  cardRomanticFlower,

  // 🎀 2. Cute, Kawaii & Korean Life 4 Cuts
  seoulLife4Cuts,
  tokyoPurikura,
  haruSky01,
  cardCuteSticker,
  cardScrapbook,

  // 👯 3. Friendship & Bestie Squad
  friendshipBestieForever,
  friendshipSquadGoals,
  templateBetterTogether,
  templateCaramelClick,
  friendshipY2KGingham,
  baliPolaroid,

  // 📷 4. Aesthetic Vintage & Digicam
  cardRetroVinylCassetteFilm,
  cardPolaroid,
  jakartaLife4cuts,

  // 🎂 5. Birthday Celebration
  bdayPartyCelebration,
  bdaySweetSixteen,
  bdayCowgirlParty,

  // 🎓 6. Graduation Honors
  gradNavyVictory,
  gradBurgundyHonors,

  // 🌴 7. Seasonal
  seasonalSummer01,
];

export * from './nakatamaScrapbook';
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
