import type { TemplateData } from '../../types/template';

/**
 * 🌟 PINK AESTHETIC NEWSPAPER SCRAPBOOK COLLAGE (From Pinterest Reference Image 4)
 * ART DIRECTION: Vintage pink French gazette & botanical scrapbook collage with
 * realistic tulip cutouts, sun tarot card, die-cut pink lily sticker, 3D pink butterfly,
 * and classical marble cherub statue.
 */
export const templatePinkScrapbookCollage: TemplateData = {
  id: 'template-pink-newspaper-scrapbook',
  name: 'Pink Newspaper Floral Scrapbook',
  subtitle: 'Vintage pink gazette collage with realistic tulip cutouts, sun tarot card, lily & cherub',
  category: 'romantic',
  style: 'scrapbook',
  photoSlotsCount: 3,
  aspectRatio: '2:6',
  canvasWidth: 600,
  canvasHeight: 1800,
  backgroundColor: '#E8B4C0',
  backgroundTexture: 'vintage-paper',
  frameBorderColor: '#A84B66',
  frameBorderWidth: 4,
  frameBorderRadius: 18,
  accentColor: '#D81B60',
  textColor: '#4A1525',
  colorPalettes: ['#E8B4C0', '#FFFFFF', '#F8BBD0', '#D81B60', '#4A1525'],
  photoSlots: [
    { id: 'slot-1', x: 8, y: 14, width: 84, height: 22, rotation: -2, borderRadius: 6, frameStyle: 'polaroid' },
    { id: 'slot-2', x: 8, y: 41, width: 84, height: 22, rotation: 2.5, borderRadius: 6, frameStyle: 'polaroid' },
    { id: 'slot-3', x: 8, y: 68, width: 84, height: 22, rotation: -1.5, borderRadius: 6, frameStyle: 'polaroid' },
  ],
  decorativeElements: [
    // Sun Tarot Card (Top Right / Center)
    { id: 'deco-tarot', type: 'sticker', content: 'sun-tarot', x: 84, y: 12, rotation: 10, fontSize: 44 },

    // 3D Pink Aesthetic Butterfly (Top Right of Slot 1)
    { id: 'deco-butterfly-top', type: 'sticker', content: 'butterfly-pink', x: 86, y: 38, rotation: 15, fontSize: 46 },

    // Die-cut Pink Lily Flower with White Border (Center Anchor)
    { id: 'deco-lily-center', type: 'sticker', content: 'pink-lily', x: 16, y: 40, rotation: -8, fontSize: 52 },

    // Classical Marble Cherub Angel Statue (Bottom Left)
    { id: 'deco-cherub-bot', type: 'sticker', content: 'cherub-angel', x: 18, y: 91, rotation: -5, fontSize: 50 },

    // Ribbon Bow & Kiss Marks
    { id: 'deco-bow', type: 'sticker', content: '🎀', x: 86, y: 65, rotation: 12, fontSize: 38 },
    { id: 'deco-kiss', type: 'sticker', content: '💋', x: 14, y: 66, rotation: -10, fontSize: 32 },

    // White Contour Sparkles (From Gambar 3)
    { id: 'deco-sparkle-1', type: 'sticker', content: 'doodle-sparkle-white', x: 85, y: 88, rotation: 0, fontSize: 28 },
    { id: 'deco-sparkle-2', type: 'sticker', content: 'doodle-sparkle-white', x: 50, y: 8, rotation: 15, fontSize: 24 },
  ],
  textElements: [
    {
      id: 'text-headline',
      defaultText: 'LA VIE EN ROSE • 2026',
      placeholder: 'Headline',
      x: 50,
      y: 5.5,
      fontFamily: 'Playfair Display',
      fontSize: 16,
      color: '#4A1525',
      align: 'center',
      isEditable: true,
    },
    {
      id: 'text-quote',
      defaultText: 'sweet botanical memories ♡',
      placeholder: 'Subtext',
      x: 50,
      y: 95.5,
      fontFamily: 'Caveat',
      fontSize: 22,
      color: '#4A1525',
      align: 'center',
      isEditable: true,
    },
  ],
  tags: ['pink-scrapbook', 'newspaper', 'botanical', 'tulip', 'tarot', 'cherub', 'aesthetic'],
  isPopular: true,
  isNew: true,
};
