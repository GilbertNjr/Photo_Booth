import type { TemplateData } from '../../types/template';

export const seasonalSummer01: TemplateData = {
  id: 'seasonal-summer-01',
  name: 'Golden Hour Sunset',
  subtitle: 'Warm terracotta sunset palette with sun badge & ocean wave vibes',
  category: 'seasonal',
  style: 'minimal-modern',
  photoSlotsCount: 2,
  aspectRatio: '4:6',
  canvasWidth: 1200,
  canvasHeight: 1800,
  backgroundColor: '#fff7ed',
  backgroundTexture: 'paper',
  backgroundGradient: 'linear-gradient(180deg, #ffedd5 0%, #fed7aa 50%, #fdba74 100%)',
  frameBorderColor: '#ea580c',
  frameBorderWidth: 4,
  frameBorderRadius: 16,
  accentColor: '#c2410c',
  textColor: '#7c2d12',
  colorPalettes: ['#fff7ed', '#ffedd5', '#fed7aa', '#fef3c7', '#ecfdf5'],
  photoSlots: [
    { id: 'slot-1', x: 10, y: 15, width: 80, height: 35, rotation: 0, borderRadius: 12, aspectRatio: 16 / 9 },
    { id: 'slot-2', x: 10, y: 53, width: 80, height: 35, rotation: 0, borderRadius: 12, aspectRatio: 16 / 9 },
  ],
  decorativeElements: [
    { id: 'sun-icon', type: 'sticker', content: '☀️', x: 50, y: 7, fontSize: 40 },
    { id: 'wave-icon', type: 'sticker', content: '🌊', x: 10, y: 91, fontSize: 32 },
    { id: 'palm-icon', type: 'sticker', content: '🌴', x: 90, y: 91, fontSize: 32 },
    { id: 'line-art', type: 'badge', content: '〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰〰', x: 50, y: 11, fontSize: 16, color: '#ea580c' },
  ],
  textElements: [
    { id: 'text-1', defaultText: 'GOLDEN HOUR VIBES', placeholder: 'Title', x: 50, y: 91, fontFamily: 'Outfit', fontSize: 28, color: '#7c2d12', align: 'center', isEditable: true },
    { id: 'text-2', defaultText: 'SUMMER MEMORIES  •  AUGUST 2026', placeholder: 'Subtitle', x: 50, y: 96, fontFamily: 'Plus Jakarta Sans', fontSize: 14, color: '#c2410c', align: 'center', isEditable: true },
  ],
  tags: ['seasonal', 'summer', 'sunset', 'golden-hour', 'orange', 'warm', '2-photos'],
  isPopular: true,
};
