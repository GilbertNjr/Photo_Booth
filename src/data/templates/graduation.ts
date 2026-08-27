import type { TemplateData } from '../../types/template';

export const polaroid01: TemplateData = {
  id: 'polaroid-01',
  name: 'Scrapbook Memory Polaroid',
  subtitle: 'Stacked polaroid frames with tape, graduation cap & handwritten notes',
  category: 'graduation',
  style: 'polaroid',
  photoSlotsCount: 4,
  aspectRatio: '4:6',
  canvasWidth: 1200,
  canvasHeight: 1800,
  backgroundColor: '#f8fafc',
  backgroundTexture: 'paper',
  backgroundGradient: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
  frameBorderColor: '#ffffff',
  frameBorderWidth: 8,
  frameBorderRadius: 4,
  accentColor: '#0284c7',
  textColor: '#0f172a',
  colorPalettes: ['#f8fafc', '#e0f2fe', '#fef3c7', '#fce7f3'],
  photoSlots: [
    { id: 'slot-1', x: 8, y: 8, width: 40, height: 38, rotation: -3, borderRadius: 2, aspectRatio: 1 },
    { id: 'slot-2', x: 52, y: 8, width: 40, height: 38, rotation: 3, borderRadius: 2, aspectRatio: 1 },
    { id: 'slot-3', x: 8, y: 50, width: 40, height: 38, rotation: 2, borderRadius: 2, aspectRatio: 1 },
    { id: 'slot-4', x: 52, y: 50, width: 40, height: 38, rotation: -2, borderRadius: 2, aspectRatio: 1 },
  ],
  decorativeElements: [
    { id: 'tape-1', type: 'tape', content: '🎓', x: 28, y: 4, width: 30, rotation: -6, color: '#e0f2fe' },
    { id: 'tape-2', type: 'tape', content: '✨', x: 72, y: 4, width: 30, rotation: 5, color: '#fef3c7' },
    { id: 'sticker-cap', type: 'sticker', content: '🎓', x: 50, y: 46, fontSize: 44, rotation: -10 },
    { id: 'badge-grad', type: 'badge', content: 'OFFICIALLY GRADUATED!', x: 50, y: 92, fontSize: 18, color: '#0369a1', fontFamily: 'Fredoka' },
  ],
  textElements: [
    { id: 'text-1', defaultText: 'Class of 2026 - Unforgettable!', placeholder: 'Title', x: 50, y: 95, fontFamily: 'Caveat', fontSize: 32, color: '#0f172a', align: 'center', isEditable: true },
  ],
  tags: ['graduation', 'polaroid', 'memories', 'class-of-2026', 'scrapbook', '4-photos'],
  isNew: true,
};
