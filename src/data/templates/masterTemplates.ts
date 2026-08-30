import type { TemplateData } from '../../types/template';

/**
 * 🌟 01 — SWEET MOMENT
 * ART DIRECTION: Romantic Korean scrapbook + soft stationery + intimate diary.
 * MOOD: warm, soft, nostalgic, cute but mature, personal.
 * PALETTE: warm cream (#FAF5EE), dusty pink (#E8B4B8), soft brown (#6B4F4F), faded burgundy (#800020).
 * COMPOSITION: Asymmetric scrapbook layout with restrained visual anchors.
 */
export const templateSweetMoment: TemplateData = {
  id: 'master-01-sweet-moment',
  name: 'Sweet Moment',
  subtitle: 'Korean romantic scrapbook with soft paper, satin bow & handwritten diary notes',
  category: 'romantic',
  style: 'scrapbook',
  photoSlotsCount: 3,
  aspectRatio: '2:6',
  canvasWidth: 600,
  canvasHeight: 1800,
  backgroundColor: '#FAF5EE',
  backgroundTexture: 'paper',
  frameBorderColor: '#800020',
  frameBorderWidth: 4,
  frameBorderRadius: 14,
  accentColor: '#E8B4B8',
  textColor: '#6B4F4F',
  colorPalettes: ['#FAF5EE', '#800020', '#E8B4B8', '#6B4F4F', '#FFFFFF'],
  photoSlots: [
    { id: 'slot-1', x: 10, y: 12, width: 80, height: 23, rotation: -3.5, borderRadius: 8, frameStyle: 'polaroid' },
    { id: 'slot-2', x: 10, y: 39, width: 80, height: 23, rotation: 2.8, borderRadius: 8, frameStyle: 'polaroid' },
    { id: 'slot-3', x: 10, y: 66, width: 80, height: 23, rotation: -2.0, borderRadius: 8, frameStyle: 'polaroid' },
  ],
  decorativeElements: [
    { id: 'deco-ribbon', type: 'sticker', content: '🎀', x: 14, y: 9, rotation: -12, fontSize: 36 },
    { id: 'deco-flower', type: 'sticker', content: '🌷', x: 88, y: 63, rotation: 14, fontSize: 32 },
  ],
  textElements: [
    { id: 'text-head', defaultText: 'sweet moment — N° 01', placeholder: 'Header', x: 50, y: 5, fontFamily: 'Playfair Display', fontSize: 18, color: '#800020', align: 'center', isEditable: true },
    { id: 'text-sub', defaultText: 'our sweet memories ♡', placeholder: 'Subheader', x: 50, y: 93.5, fontFamily: 'Caveat', fontSize: 25, color: '#6B4F4F', align: 'center', isEditable: true },
  ],
  tags: ['sweet-moment', 'scrapbook', 'korean', 'romantic', 'polaroid'],
  isPopular: true,
  isNew: true,
};

/**
 * 🌟 02 — SPECIAL DAY
 * ART DIRECTION: Vintage event ticket + editorial scrapbook + nostalgic celebration.
 * MOOD: special, nostalgic, slightly luxurious, memorable.
 * PALETTE: cream (#FDFBF7), burgundy (#7A1C28), dark brown (#4A2E2B), faded red (#C94A4A).
 * COMPOSITION: Archival event ticket visual anchor with perforated lines & date stamp.
 */
export const templateSpecialDay: TemplateData = {
  id: 'master-02-special-day',
  name: 'Special Day',
  subtitle: 'Vintage event ticket layout with archival stubs, date stamp & barcode',
  category: 'vintage',
  style: 'ticket',
  photoSlotsCount: 3,
  aspectRatio: '2:6',
  canvasWidth: 600,
  canvasHeight: 1800,
  backgroundColor: '#FDFBF7',
  backgroundTexture: 'vintage-paper',
  frameBorderColor: '#7A1C28',
  frameBorderWidth: 5,
  frameBorderRadius: 10,
  accentColor: '#7A1C28',
  textColor: '#4A2E2B',
  colorPalettes: ['#FDFBF7', '#7A1C28', '#4A2E2B', '#C94A4A'],
  photoSlots: [
    { id: 'slot-1', x: 10, y: 14, width: 80, height: 21.5, rotation: 0, borderRadius: 6 },
    { id: 'slot-2', x: 10, y: 39.5, width: 80, height: 21.5, rotation: 0, borderRadius: 6 },
    { id: 'slot-3', x: 10, y: 65, width: 80, height: 21.5, rotation: 0, borderRadius: 6 },
  ],
  decorativeElements: [
    { id: 'deco-camera', type: 'sticker', content: '📷', x: 14, y: 6, rotation: -5, fontSize: 28 },
    { id: 'deco-barcode', type: 'barcode', content: '║▌║█║▌│║▌║▌█', x: 50, y: 89.5, fontSize: 20, color: '#7A1C28' },
  ],
  textElements: [
    { id: 'text-head', defaultText: 'SPECIAL DAY • ADMIT ONE', placeholder: 'Header', x: 54, y: 6.5, fontFamily: 'Playfair Display', fontSize: 16, color: '#7A1C28', align: 'center', isEditable: true },
    { id: 'text-date', defaultText: 'ENTRY TICKET #04829 • 2026.08.29', placeholder: 'Metadata', x: 50, y: 94.5, fontFamily: 'Plus Jakarta Sans', fontSize: 11.5, color: '#4A2E2B', align: 'center', isEditable: true },
  ],
  tags: ['special-day', 'ticket', 'vintage', 'admit-one', 'editorial'],
  isPopular: true,
  isNew: true,
};

/**
 * 🌟 03 — FILM STORY
 * ART DIRECTION: 35mm analog film contact sheet + cinematic archive.
 * MOOD: cinematic, cool, nostalgic, minimal, artistic.
 * PALETTE: dark charcoal (#141416), warm white (#FAF9F6), charcoal (#27272A), muted gray (#A1A1AA), amber (#F59E0B).
 * COMPOSITION: Structured 35mm film contact sheet grid with side perforations & exposure marks.
 */
export const templateFilmStory: TemplateData = {
  id: 'master-03-film-story',
  name: 'Film Story',
  subtitle: '35mm analog film contact sheet with sprocket perforations & Kodak exposure marks',
  category: 'vintage',
  style: 'film-strip',
  photoSlotsCount: 4,
  aspectRatio: '2:6',
  canvasWidth: 600,
  canvasHeight: 1800,
  backgroundColor: '#141416',
  backgroundTexture: 'film-grain',
  frameBorderColor: '#27272A',
  frameBorderWidth: 4,
  frameBorderRadius: 4,
  accentColor: '#F59E0B',
  textColor: '#FAF9F6',
  colorPalettes: ['#141416', '#F59E0B', '#FAF9F6', '#27272A'],
  photoSlots: [
    { id: 'slot-1', x: 12, y: 7, width: 76, height: 18.5, rotation: 0, borderRadius: 2 },
    { id: 'slot-2', x: 12, y: 28.5, width: 76, height: 18.5, rotation: 0, borderRadius: 2 },
    { id: 'slot-3', x: 12, y: 50, width: 76, height: 18.5, rotation: 0, borderRadius: 2 },
    { id: 'slot-4', x: 12, y: 71.5, width: 76, height: 18.5, rotation: 0, borderRadius: 2 },
  ],
  decorativeElements: [],
  textElements: [
    { id: 'text-head', defaultText: 'FILM STORY • 35MM KODAK PORTRA', placeholder: 'Header', x: 50, y: 3.5, fontFamily: 'Plus Jakarta Sans', fontSize: 13, color: '#F59E0B', align: 'center', isEditable: true },
    { id: 'text-foot', defaultText: 'ISO 400 ✦ SAFETY FILM ✦ EXP 36', placeholder: 'Footer', x: 50, y: 94.5, fontFamily: 'Plus Jakarta Sans', fontSize: 11.5, color: '#A1A1AA', align: 'center', isEditable: true },
  ],
  tags: ['film-story', '35mm', 'contact-sheet', 'kodak', 'cinematic'],
  isPopular: true,
  isNew: true,
};

/**
 * 🌟 04 — MOVIE LOVE
 * ART DIRECTION: Vintage cinema ticket + romantic film archive.
 * MOOD: romantic, cinematic, vintage, elegant.
 * PALETTE: vintage navy blue (#2B4162), cream (#FAF6EF), dark navy (#121E31), muted crimson (#BE123C).
 * COMPOSITION: Cinema ticket metadata as secondary visual system with elegant serif typography.
 */
export const templateMovieLove: TemplateData = {
  id: 'master-04-movie-love',
  name: 'Movie Love',
  subtitle: 'Vintage cinema ticket stub with seat reservation, serif typography & navy paper',
  category: 'romantic',
  style: 'ticket',
  photoSlotsCount: 3,
  aspectRatio: '2:6',
  canvasWidth: 600,
  canvasHeight: 1800,
  backgroundColor: '#2B4162',
  backgroundTexture: 'vintage-paper',
  frameBorderColor: '#FAF6EF',
  frameBorderWidth: 4,
  frameBorderRadius: 12,
  accentColor: '#BE123C',
  textColor: '#FAF6EF',
  colorPalettes: ['#2B4162', '#FAF6EF', '#BE123C', '#121E31'],
  photoSlots: [
    { id: 'slot-1', x: 10, y: 14, width: 80, height: 22, rotation: 0, borderRadius: 8 },
    { id: 'slot-2', x: 10, y: 39.5, width: 80, height: 22, rotation: 0, borderRadius: 8 },
    { id: 'slot-3', x: 10, y: 65, width: 80, height: 22, rotation: 0, borderRadius: 8 },
  ],
  decorativeElements: [
    { id: 'deco-wine', type: 'sticker', content: '🍷', x: 86, y: 6.5, rotation: 8, fontSize: 26 },
    { id: 'deco-barcode', type: 'barcode', content: '║▌║█║▌│║▌║▌█', x: 50, y: 89.5, fontSize: 19, color: '#FAF6EF' },
  ],
  textElements: [
    { id: 'text-head', defaultText: 'MOVIE LOVE ✦ CINEMA HALL 04', placeholder: 'Header', x: 48, y: 6.5, fontFamily: 'Playfair Display', fontSize: 16, color: '#FAF6EF', align: 'center', isEditable: true },
    { id: 'text-seat', defaultText: 'ROW A • SEAT 14 • ADMIT TWO', placeholder: 'Seat Metadata', x: 50, y: 94.5, fontFamily: 'Plus Jakarta Sans', fontSize: 11.5, color: '#FAF6EF', align: 'center', isEditable: true },
  ],
  tags: ['movie-love', 'cinema', 'vintage-blue', 'ticket', 'romantic'],
  isPopular: true,
  isNew: true,
};

/**
 * 🌟 05 — BETTER TOGETHER
 * ART DIRECTION: Minimal Japanese/Korean lifestyle scrapbook + polaroid memory.
 * MOOD: quiet, intimate, minimal, elegant, warm.
 * PALETTE: off-white cream (#FAFAF7), charcoal black (#18181B), warm gray (#71717A), subtle silver (#D4D4D8).
 * COMPOSITION: Large negative space, restrained decoration with single black ribbon anchor.
 */
export const templateBetterTogether: TemplateData = {
  id: 'master-05-better-together',
  name: 'Better Together',
  subtitle: 'Minimal Japanese/Korean lifestyle polaroid with large negative space & black satin bow',
  category: 'minimal',
  style: 'polaroid',
  photoSlotsCount: 2,
  aspectRatio: '2:6',
  canvasWidth: 600,
  canvasHeight: 1800,
  backgroundColor: '#FAFAF7',
  backgroundTexture: 'paper',
  frameBorderColor: '#18181B',
  frameBorderWidth: 2,
  frameBorderRadius: 8,
  accentColor: '#18181B',
  textColor: '#18181B',
  colorPalettes: ['#FAFAF7', '#18181B', '#71717A', '#FFFFFF'],
  photoSlots: [
    { id: 'slot-1', x: 10, y: 14, width: 80, height: 32, rotation: 0, borderRadius: 4, frameStyle: 'polaroid' },
    { id: 'slot-2', x: 10, y: 52, width: 80, height: 32, rotation: 0, borderRadius: 4, frameStyle: 'polaroid' },
  ],
  decorativeElements: [
    { id: 'deco-bow', type: 'sticker', content: '🎀', x: 16, y: 9.5, rotation: -8, fontSize: 32, color: '#18181B' },
  ],
  textElements: [
    { id: 'text-head', defaultText: 'better together.', placeholder: 'Header', x: 50, y: 6, fontFamily: 'Playfair Display', fontSize: 20, color: '#18181B', align: 'center', isEditable: true },
    { id: 'text-sub', defaultText: 'quiet moments with you ♡', placeholder: 'Subheader', x: 50, y: 90, fontFamily: 'Caveat', fontSize: 24, color: '#71717A', align: 'center', isEditable: true },
  ],
  tags: ['better-together', 'minimal', 'japanese', 'polaroid', 'quiet-luxury'],
  isPopular: true,
  isNew: true,
};

/**
 * 🌟 06 — THE DAILY CHRONICLE
 * ART DIRECTION: Vintage 1920s Editorial Gazette / Newspaper Press.
 * MOOD: nostalgic, archival, editorial, classic, authentic newsprint.
 * PALETTE: aged newsprint cream (#F4F0EA), deep charcoal ink (#1C1917), muted sepia (#78350F), washed gray (#52525B).
 * COMPOSITION: Classic newspaper masthead with double rule borders, volume numbers, 3 photo slots formatted as news press photos with captions & barcode stub.
 */
export const templateDailyChronicle: TemplateData = {
  id: 'master-06-daily-chronicle',
  name: 'The Daily Chronicle',
  subtitle: 'Vintage editorial newspaper masthead with newsprint grain, press photos & archival date stamp',
  category: 'vintage',
  style: 'newspaper',
  photoSlotsCount: 3,
  aspectRatio: '2:6',
  canvasWidth: 600,
  canvasHeight: 1800,
  backgroundColor: '#F4F0EA',
  backgroundTexture: 'vintage-paper',
  frameBorderColor: '#1C1917',
  frameBorderWidth: 4,
  frameBorderRadius: 4,
  accentColor: '#1C1917',
  textColor: '#1C1917',
  colorPalettes: ['#F4F0EA', '#1C1917', '#78350F', '#52525B'],
  photoSlots: [
    { id: 'slot-1', x: 10, y: 13, width: 80, height: 22, rotation: 0, borderRadius: 2 },
    { id: 'slot-2', x: 10, y: 39, width: 80, height: 22, rotation: 0, borderRadius: 2 },
    { id: 'slot-3', x: 10, y: 65, width: 80, height: 22, rotation: 0, borderRadius: 2 },
  ],
  decorativeElements: [
    { id: 'deco-stamp', type: 'stamp', content: '📰', x: 86, y: 5.5, rotation: 6, fontSize: 32 },
    { id: 'deco-barcode', type: 'barcode', content: '║▌║█║▌│║▌║▌█', x: 50, y: 90, fontSize: 20, color: '#1C1917' },
  ],
  textElements: [
    { id: 'text-head', defaultText: 'THE DAILY CHRONICLE', placeholder: 'Masthead Header', x: 50, y: 4, fontFamily: 'Playfair Display', fontSize: 22, color: '#1C1917', align: 'center', isEditable: true },
    { id: 'text-meta', defaultText: 'VOL. LXIV NO. 104 ✦ SPECIAL PHOTO BOOTH EDITION ✦ PRICE TWO CENTS', placeholder: 'Subheader', x: 50, y: 8, fontFamily: 'Plus Jakarta Sans', fontSize: 9.5, color: '#52525B', align: 'center', isEditable: true },
    { id: 'text-foot', defaultText: 'ALL THE MEMORIES THAT ARE FIT TO PRINT', placeholder: 'Footer Caption', x: 50, y: 94.5, fontFamily: 'Playfair Display', fontSize: 13, color: '#1C1917', align: 'center', isEditable: true },
  ],
  tags: ['newspaper', 'daily-chronicle', 'gazette', 'editorial', 'vintage-press'],
  isPopular: true,
  isNew: true,
};

