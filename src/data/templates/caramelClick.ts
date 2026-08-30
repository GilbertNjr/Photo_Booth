import type { TemplateData } from '../../types/template';

/**
 * 🌟 CARAMEL CLICK CINEMA TICKET (From Pinterest Reference Image 2)
 * ART DIRECTION: Vintage cinema ticket photocard with rich walnut wood grain border,
 * scalloped cream ticket container, 2x2 photo grid, cinema metadata & barcode, and movie reel stickers.
 */
export const templateCaramelClick: TemplateData = {
  id: 'template-caramel-click-ticket',
  name: 'Caramel Click Cinema Ticket',
  subtitle: 'Vintage wooden postcard with scalloped cinema ticket stub, 4-photo grid, barcode & movie stickers',
  category: 'vintage',
  style: 'ticket',
  photoSlotsCount: 4,
  aspectRatio: '4:6',
  canvasWidth: 1200,
  canvasHeight: 1800,
  backgroundColor: '#3D261C',
  backgroundTexture: 'wood',
  frameBorderColor: '#2C1B14',
  frameBorderWidth: 5,
  frameBorderRadius: 20,
  accentColor: '#8C684D',
  textColor: '#2B1D14',
  colorPalettes: ['#3D261C', '#EBE0CA', '#2B1D14', '#E63956', '#FFFFFF'],
  photoSlots: [
    // 2x2 Photo Grid inside ticket container
    { id: 'slot-1', x: 8, y: 28.5, width: 40.5, height: 32, borderRadius: 2 },
    { id: 'slot-2', x: 51.5, y: 28.5, width: 40.5, height: 32, borderRadius: 2 },
    { id: 'slot-3', x: 8, y: 62.5, width: 40.5, height: 32, borderRadius: 2 },
    { id: 'slot-4', x: 51.5, y: 62.5, width: 40.5, height: 32, borderRadius: 2 },
  ],
  decorativeElements: [
    // Top-Left Scalloped "the curious!" Badge with Bow Ribbon
    { id: 'deco-curious', type: 'sticker', content: 'tag-curious', x: 15, y: 28, rotation: -8, fontSize: 52 },

    // Top-Right Cinema Barcode & Stamp
    { id: 'deco-barcode', type: 'sticker', content: 'cinema-barcode', x: 77, y: 16.5, rotation: 0, fontSize: 48 },

    // Pink Exclamation Badge on right grid
    { id: 'deco-exclamation', type: 'sticker', content: 'exclamation-pink', x: 83, y: 34, rotation: 0, fontSize: 26 },

    // 3D Metallic Glossy Stars on Wood Border & Grid
    { id: 'deco-star-tl', type: 'sticker', content: '3d-star-gold', x: 10, y: 5.5, rotation: 12, fontSize: 18 },
    { id: 'deco-star-tc', type: 'sticker', content: '3d-star-gold', x: 63, y: 5.5, rotation: -6, fontSize: 18 },
    { id: 'deco-star-mr', type: 'sticker', content: '3d-star-gold', x: 88, y: 58, rotation: 15, fontSize: 28 },
    { id: 'deco-star-mr2', type: 'sticker', content: '3d-star-gold', x: 82, y: 64, rotation: -10, fontSize: 20 },
    { id: 'deco-star-bl', type: 'sticker', content: '3d-star-gold', x: 5.5, y: 52, rotation: 8, fontSize: 16 },

    // Bottom-Right Vintage Movie Reel & Film Strip
    { id: 'deco-film-reel', type: 'sticker', content: 'movie-film-reel', x: 78, y: 89.5, rotation: 0, fontSize: 52 },
  ],
  textElements: [
    // Main Cinema Header Title
    {
      id: 'text-title',
      defaultText: 'CARAMEL CLICK',
      placeholder: 'Title',
      x: 38,
      y: 11.2,
      fontFamily: 'Playfair Display',
      fontSize: 23,
      color: '#2B1D14',
      align: 'center',
      isEditable: true,
    },
    // Film Subtitle
    {
      id: 'text-sub',
      defaultText: 'FILM: LOVE IN A SNAPSHOT',
      placeholder: 'Film Title',
      x: 38,
      y: 14.8,
      fontFamily: 'Plus Jakarta Sans',
      fontSize: 9.5,
      color: '#4A3324',
      align: 'center',
      isEditable: true,
    },
    // Dashed Separator Rule
    {
      id: 'text-dash',
      defaultText: '----------------------------------------------',
      placeholder: 'Divider',
      x: 38,
      y: 17.5,
      fontFamily: 'monospace',
      fontSize: 8.5,
      color: '#A89279',
      align: 'center',
      isEditable: false,
    },
    // Cinema Ticket Metadata Left Column
    {
      id: 'text-meta1',
      defaultText: 'Location: Caramel cinema',
      placeholder: 'Location',
      x: 14,
      y: 20.8,
      fontFamily: 'Plus Jakarta Sans',
      fontSize: 8.5,
      color: '#3E271E',
      align: 'left',
      isEditable: true,
    },
    {
      id: 'text-meta2',
      defaultText: 'Room: 3',
      placeholder: 'Room',
      x: 14,
      y: 23.2,
      fontFamily: 'Plus Jakarta Sans',
      fontSize: 8.5,
      color: '#3E271E',
      align: 'left',
      isEditable: true,
    },
    // Cinema Ticket Metadata Right Column
    {
      id: 'text-meta3',
      defaultText: 'Seat: H7, H8',
      placeholder: 'Seat',
      x: 46,
      y: 20.8,
      fontFamily: 'Plus Jakarta Sans',
      fontSize: 8.5,
      color: '#3E271E',
      align: 'left',
      isEditable: true,
    },
    {
      id: 'text-meta4',
      defaultText: 'Adult Gold Class',
      placeholder: 'Class',
      x: 46,
      y: 23.2,
      fontFamily: 'Plus Jakarta Sans',
      fontSize: 8.5,
      color: '#3E271E',
      align: 'left',
      isEditable: true,
    },
    // Script Quote Under Metadata
    {
      id: 'text-quote',
      defaultText: '"Wish you have a nice time with Caramel Click!"',
      placeholder: 'Quote',
      x: 38,
      y: 26.2,
      fontFamily: 'Caveat',
      fontSize: 13,
      color: '#5C3E2D',
      align: 'center',
      isEditable: true,
    },
  ],
  tags: ['caramel-click', 'cinema-ticket', 'movie', 'vintage', 'postcard', 'wood', '4-cuts'],
  isPopular: true,
  isNew: true,
};
