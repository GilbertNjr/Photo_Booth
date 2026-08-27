import type { TemplateData } from '../../types/template';

export const vintageCamera01: TemplateData = {
  id: 'vintage-camera-01',
  name: 'Special Day Cinema Ticket',
  subtitle: 'Movie ticket coupon aesthetic with barcode, dashed cutlines & handwritten script',
  category: 'vintage',
  style: 'ticket',
  photoSlotsCount: 3,
  aspectRatio: '2:6',
  canvasWidth: 600,
  canvasHeight: 1800,
  backgroundColor: '#fbf8f3',
  backgroundTexture: 'paper',
  frameBorderColor: '#6b0512',
  frameBorderWidth: 8,
  frameBorderRadius: 16,
  accentColor: '#8d0817',
  textColor: '#6b0512',
  colorPalettes: ['#fbf8f3', '#6b0512', '#2b2623', '#e0a96d', '#4a040d'],
  photoSlots: [
    { id: 'slot-1', x: 10, y: 22, width: 80, height: 20, borderRadius: 6, aspectRatio: 4 / 3 },
    { id: 'slot-2', x: 10, y: 44, width: 80, height: 20, borderRadius: 6, aspectRatio: 4 / 3 },
    { id: 'slot-3', x: 10, y: 66, width: 80, height: 20, borderRadius: 6, aspectRatio: 4 / 3 },
  ],
  decorativeElements: [
    { id: 'barcode-top', type: 'barcode', content: '║▌│█║▌│ █║▌│█│║▌║', x: 50, y: 7, fontSize: 36, color: '#2b2623', fontFamily: 'monospace' },
    { id: 'dash-line-1', type: 'doodle', content: '- - - - - - - - - - - - - - - - - - -', x: 50, y: 13, fontSize: 16, color: '#8d0817' },
    { id: 'camera-icon', type: 'sticker', content: '📸', x: 80, y: 17, fontSize: 36 },
    { id: 'dash-line-2', type: 'doodle', content: '- - - - - - - - - - - - - - - - - - -', x: 50, y: 88, fontSize: 16, color: '#8d0817' },
    { id: 'barcode-bottom', type: 'barcode', content: '║▌│█║▌│ █║▌│█│║▌║', x: 50, y: 93, fontSize: 32, color: '#2b2623', fontFamily: 'monospace' },
  ],
  textElements: [
    { id: 'text-1', defaultText: 'Special Day ♡', placeholder: 'Title', x: 42, y: 17, fontFamily: 'Caveat', fontSize: 38, color: '#6b0512', align: 'center', isEditable: true },
  ],
  tags: ['ticket', 'cinema', 'coupon', 'barcode', 'special-day', '3-photos'],
  isPopular: true,
};
