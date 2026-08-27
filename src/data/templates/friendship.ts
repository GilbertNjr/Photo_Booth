import type { TemplateData } from '../../types/template';

export const ticket01: TemplateData = {
  id: 'ticket-01',
  name: 'VIP Concert Pass 2026',
  subtitle: 'Concert festival ticket style with perforated edges & barcode',
  category: 'friendship',
  style: 'ticket',
  photoSlotsCount: 2,
  aspectRatio: '2:6',
  canvasWidth: 600,
  canvasHeight: 1800,
  backgroundColor: '#181028',
  backgroundTexture: 'none',
  backgroundGradient: 'linear-gradient(180deg, #181028 0%, #2a1b4e 50%, #181028 100%)',
  frameBorderColor: '#7b61ff',
  frameBorderWidth: 3,
  frameBorderRadius: 20,
  accentColor: '#00f2fe',
  textColor: '#ffffff',
  colorPalettes: ['#181028', '#2d006b', '#03254c', '#3a0007', '#1a1a24'],
  photoSlots: [
    { id: 'slot-1', x: 10, y: 16, width: 80, height: 32, rotation: 0, borderRadius: 12, aspectRatio: 4 / 3 },
    { id: 'slot-2', x: 10, y: 52, width: 80, height: 32, rotation: 0, borderRadius: 12, aspectRatio: 4 / 3 },
  ],
  decorativeElements: [
    { id: 'perforation-1', type: 'sprocket', content: '• • • • • • • • • • • • • • • •', x: 50, y: 12, fontSize: 16, color: '#7b61ff' },
    { id: 'badge-vip', type: 'badge', content: '★ VIP ACCESS ★', x: 50, y: 6, fontSize: 16, color: '#00f2fe', fontFamily: 'Fredoka' },
    { id: 'barcode-1', type: 'barcode', content: '|||||||| |||| |||||| ||||| |||||||', x: 50, y: 92, fontSize: 20, color: '#a78bfa', fontFamily: 'monospace' },
    { id: 'star-1', type: 'sticker', content: '⚡', x: 8, y: 88, fontSize: 26 },
    { id: 'star-2', type: 'sticker', content: '🎵', x: 82, y: 88, fontSize: 26 },
  ],
  textElements: [
    { id: 'text-tour', defaultText: 'BESTIES WORLD TOUR', placeholder: 'Event Name', x: 50, y: 9, fontFamily: 'Fredoka', fontSize: 24, color: '#ffffff', align: 'center', isEditable: true },
    { id: 'text-info', defaultText: 'GATE 07  •  ROW A  •  SEAT 27-28', placeholder: 'Details', x: 50, y: 86, fontFamily: 'Outfit', fontSize: 14, color: '#7b61ff', align: 'center', isEditable: true },
  ],
  tags: ['ticket', 'concert', 'vip', 'friendship', 'besties', 'purple', '2-photos'],
  isNew: true,
};
