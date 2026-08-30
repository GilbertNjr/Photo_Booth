import type { TemplateData } from '../../types/template';

/**
 * 🌟 CATCH YOURS VINTAGE POLAROID STRIP (From Pinterest Reference Image 1)
 * ART DIRECTION: Korean vintage romantic photo strip with warm cream paper, burgundy accents,
 * tilted polaroids, handwritten captions, watercolor hearts, and vintage pink photo ticket pass.
 */
export const templateCatchYoursStrip: TemplateData = {
  id: 'template-catch-yours-strip',
  name: 'Catch Yours Vintage Strip',
  subtitle: 'Burgundy & cream photostrip with tilted polaroids, watercolor hearts & pink photo ticket',
  category: 'romantic',
  style: 'polaroid',
  photoSlotsCount: 3,
  aspectRatio: '2:6',
  canvasWidth: 600,
  canvasHeight: 1800,
  backgroundColor: '#EFE9DF',
  backgroundTexture: 'paper',
  frameBorderColor: '#8B2635',
  frameBorderWidth: 6,
  frameBorderRadius: 18,
  accentColor: '#8B2635',
  textColor: '#7A1C28',
  colorPalettes: ['#EFE9DF', '#8B2635', '#F7C8D4', '#7A1C28', '#FFFFFF'],
  photoSlots: [
    {
      id: 'slot-1',
      x: 10,
      y: 13,
      width: 80,
      height: 23,
      rotation: -2.5,
      borderRadius: 4,
      frameStyle: 'polaroid',
    },
    {
      id: 'slot-2',
      x: 10,
      y: 38,
      width: 80,
      height: 23,
      rotation: 2.2,
      borderRadius: 4,
      frameStyle: 'polaroid',
    },
    {
      id: 'slot-3',
      x: 10,
      y: 63,
      width: 80,
      height: 23,
      rotation: -1.0,
      borderRadius: 4,
      frameStyle: 'polaroid',
    },
  ],
  decorativeElements: [
    // Header Watercolor Hearts
    { id: 'deco-heart-tl', type: 'sticker', content: '♥-maroon', x: 12, y: 7.5, rotation: -15, fontSize: 26 },
    { id: 'deco-heart-tr', type: 'sticker', content: '♥-maroon', x: 88, y: 4.5, rotation: 12, fontSize: 32 },
    { id: 'deco-heart-mid', type: 'sticker', content: '♥-maroon', x: 76, y: 11, rotation: 6, fontSize: 20 },

    // Middle Watercolor Hearts (Right of Slot 1 & Slot 2)
    { id: 'deco-heart-p1a', type: 'sticker', content: '♥-maroon', x: 86, y: 35.5, rotation: 10, fontSize: 28 },
    { id: 'deco-heart-p1b', type: 'sticker', content: '♥-maroon', x: 76, y: 34.5, rotation: -8, fontSize: 18 },

    // Bottom Pink Photo Ticket & Day Pass (From Pinterest Image 1)
    { id: 'deco-pink-ticket', type: 'sticker', content: '🎟️-pink-ticket', x: 48, y: 91.5, rotation: -2.0, fontSize: 72 },

    // Bottom Hearts around ticket
    { id: 'deco-heart-t1', type: 'sticker', content: '♥-maroon', x: 89, y: 87.5, rotation: 14, fontSize: 26 },
    { id: 'deco-heart-t2', type: 'sticker', content: '♥-maroon', x: 90, y: 94.0, rotation: -10, fontSize: 20 },
  ],
  textElements: [
    // Header Cursive Script
    {
      id: 'text-head',
      defaultText: 'Catch Yours',
      placeholder: 'Header',
      x: 50,
      y: 6.5,
      fontFamily: 'Caveat',
      fontSize: 34,
      color: '#7A1C28',
      align: 'center',
      isEditable: true,
    },
    // Slot 2 Polaroid Chin Caption
    {
      id: 'text-caption-1',
      defaultText: 'Chilling out',
      placeholder: 'Caption',
      x: 18,
      y: 57,
      rotation: 2.2,
      fontFamily: 'Caveat',
      fontSize: 20,
      color: '#4A3324',
      align: 'left',
      isEditable: true,
    },
    // Slot 3 Polaroid Chin Tag
    {
      id: 'text-caption-2',
      defaultText: 'PHOTO PLACE',
      placeholder: 'Tag',
      x: 74,
      y: 82,
      rotation: -1.0,
      fontFamily: 'Plus Jakarta Sans',
      fontSize: 10.5,
      color: '#2B1D12',
      align: 'right',
      isEditable: true,
    },
  ],
  tags: ['catch-yours', 'polaroid', 'pink-ticket', 'romantic', 'korean', 'vintage', 'aesthetic'],
  isPopular: true,
  isNew: true,
};

/**
 * 🌟 CATCH YOURS DUAL STRIP (Side-by-side 4:6 Print Format as in Gambar 1)
 */
export const templateCatchYoursDual: TemplateData = {
  id: 'template-catch-yours-dual',
  name: 'Catch Yours Dual Strip (4x6)',
  subtitle: 'Classic 2x6 pair side-by-side on burgundy card with 6 polaroid photo slots & pink tickets',
  category: 'romantic',
  style: 'polaroid',
  photoSlotsCount: 6,
  aspectRatio: '4:6',
  canvasWidth: 1200,
  canvasHeight: 1800,
  backgroundColor: '#8B2635',
  backgroundTexture: 'paper',
  frameBorderColor: '#6B1D28',
  frameBorderWidth: 4,
  frameBorderRadius: 20,
  accentColor: '#8B2635',
  textColor: '#7A1C28',
  colorPalettes: ['#8B2635', '#EFE9DF', '#F7C8D4', '#7A1C28', '#FFFFFF'],
  photoSlots: [
    // Left Strip Slots
    { id: 'slot-1', x: 7, y: 13, width: 40, height: 23, rotation: -2.5, borderRadius: 4, frameStyle: 'polaroid' },
    { id: 'slot-2', x: 7, y: 38, width: 40, height: 23, rotation: 2.2, borderRadius: 4, frameStyle: 'polaroid' },
    { id: 'slot-3', x: 7, y: 63, width: 40, height: 23, rotation: -1.0, borderRadius: 4, frameStyle: 'polaroid' },
    // Right Strip Slots
    { id: 'slot-4', x: 53, y: 13, width: 40, height: 23, rotation: -2.5, borderRadius: 4, frameStyle: 'polaroid' },
    { id: 'slot-5', x: 53, y: 38, width: 40, height: 23, rotation: 2.2, borderRadius: 4, frameStyle: 'polaroid' },
    { id: 'slot-6', x: 53, y: 63, width: 40, height: 23, rotation: -1.0, borderRadius: 4, frameStyle: 'polaroid' },
  ],
  decorativeElements: [
    // Left Strip Decorations
    { id: 'deco-l-heart-tl', type: 'sticker', content: '♥-maroon', x: 8, y: 7.5, rotation: -15, fontSize: 24 },
    { id: 'deco-l-heart-tr', type: 'sticker', content: '♥-maroon', x: 44, y: 4.5, rotation: 12, fontSize: 28 },
    { id: 'deco-l-heart-mid', type: 'sticker', content: '♥-maroon', x: 38, y: 11, rotation: 6, fontSize: 18 },
    { id: 'deco-l-heart-p1', type: 'sticker', content: '♥-maroon', x: 44, y: 35.5, rotation: 10, fontSize: 24 },
    { id: 'deco-l-ticket', type: 'sticker', content: '🎟️-pink-ticket', x: 26, y: 91.5, rotation: -2.0, fontSize: 44 },
    { id: 'deco-l-heart-bot', type: 'sticker', content: '♥-maroon', x: 46, y: 88, rotation: 12, fontSize: 22 },

    // Right Strip Decorations
    { id: 'deco-r-heart-tl', type: 'sticker', content: '♥-maroon', x: 54, y: 7.5, rotation: -15, fontSize: 24 },
    { id: 'deco-r-heart-tr', type: 'sticker', content: '♥-maroon', x: 92, y: 4.5, rotation: 12, fontSize: 28 },
    { id: 'deco-r-heart-mid', type: 'sticker', content: '♥-maroon', x: 84, y: 11, rotation: 6, fontSize: 18 },
    { id: 'deco-r-heart-p1', type: 'sticker', content: '♥-maroon', x: 90, y: 35.5, rotation: 10, fontSize: 24 },
    { id: 'deco-r-ticket', type: 'sticker', content: '🎟️-pink-ticket', x: 72, y: 91.5, rotation: -2.0, fontSize: 44 },
    { id: 'deco-r-heart-bot', type: 'sticker', content: '♥-maroon', x: 92, y: 88, rotation: 12, fontSize: 22 },
  ],
  textElements: [
    // Left Strip Header & Captions
    { id: 'text-l-head', defaultText: 'Catch Yours', placeholder: 'Header', x: 26, y: 6.5, fontFamily: 'Caveat', fontSize: 30, color: '#7A1C28', align: 'center', isEditable: true },
    { id: 'text-l-cap1', defaultText: 'Chilling out', placeholder: 'Caption', x: 12, y: 57, rotation: 2.2, fontFamily: 'Caveat', fontSize: 16, color: '#4A3324', align: 'left', isEditable: true },
    { id: 'text-l-cap2', defaultText: 'PHOTO PLACE', placeholder: 'Tag', x: 38, y: 82, rotation: -1.0, fontFamily: 'Plus Jakarta Sans', fontSize: 8.5, color: '#2B1D12', align: 'right', isEditable: true },

    // Right Strip Header & Captions
    { id: 'text-r-head', defaultText: 'Catch Yours', placeholder: 'Header', x: 72, y: 6.5, fontFamily: 'Caveat', fontSize: 30, color: '#7A1C28', align: 'center', isEditable: true },
    { id: 'text-r-cap1', defaultText: 'Chilling out', placeholder: 'Caption', x: 58, y: 57, rotation: 2.2, fontFamily: 'Caveat', fontSize: 16, color: '#4A3324', align: 'left', isEditable: true },
    { id: 'text-r-cap2', defaultText: 'PHOTO PLACE', placeholder: 'Tag', x: 84, y: 82, rotation: -1.0, fontFamily: 'Plus Jakarta Sans', fontSize: 8.5, color: '#2B1D12', align: 'right', isEditable: true },
  ],
  tags: ['catch-yours-dual', 'polaroid', 'pink-ticket', 'romantic', 'dual-strip', '4x6'],
  isPopular: true,
  isNew: true,
};
