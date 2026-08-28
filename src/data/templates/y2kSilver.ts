import type { TemplateData } from '../../types/template';

export const y2kSilver01: TemplateData = {
  id: 'y2k-silver-01',
  name: 'Y2K Cyber Holographic Metallic',
  subtitle: 'Futuristic Y2K silver chrome frame strip with chrome starbursts & metallic sheen ⭐🩶',
  category: 'vintage',
  style: 'scrapbook',
  photoSlotsCount: 3,
  aspectRatio: '2:6',
  canvasWidth: 600,
  canvasHeight: 1800,
  backgroundColor: '#cbd5e1',
  backgroundTexture: 'paper',
  frameBorderColor: '#475569',
  frameBorderWidth: 4,
  frameBorderRadius: 18,
  accentColor: '#334155',
  textColor: '#0f172a',
  colorPalettes: ['#f1f5f9', '#cbd5e1', '#94a3b8', '#475569', '#0f172a'],
  photoSlots: [
    { id: 'slot-1', x: 10, y: 10, width: 80, height: 24, borderRadius: 12, aspectRatio: 4 / 3 },
    { id: 'slot-2', x: 10, y: 38, width: 80, height: 24, borderRadius: 12, aspectRatio: 4 / 3 },
    { id: 'slot-3', x: 10, y: 66, width: 80, height: 24, borderRadius: 12, aspectRatio: 4 / 3 },
  ],
  decorativeElements: [
    { id: 'starburst-1', type: 'sticker', content: '⭐', x: 86, y: 8, rotation: 15, fontSize: 42 },
    { id: 'starburst-2', type: 'sticker', content: '💫', x: 12, y: 36, rotation: -20, fontSize: 38 },
    { id: 'heart-silver', type: 'sticker', content: '🩶', x: 88, y: 64, rotation: 12, fontSize: 40 },
    { id: 'sparkle-y2k', type: 'sticker', content: '✨', x: 12, y: 92, rotation: 10, fontSize: 36 },
  ],
  textElements: [
    { id: 'title-y2k', defaultText: 'CYBER MEMORIES // 2026', placeholder: 'Title', x: 50, y: 94, fontFamily: 'Outfit', fontSize: 22, color: '#0f172a', align: 'center', isEditable: true },
  ],
  tags: ['y2k', 'silver', 'holographic', 'cyber', '3-photos', 'futuristic'],
  samplePhotos: [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
  ],
  isPopular: true,
  isNew: true,
};
