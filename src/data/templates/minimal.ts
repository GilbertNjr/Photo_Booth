import type { TemplateData } from '../../types/template';

export const filmStrip01: TemplateData = {
  id: 'film-strip-01',
  name: 'Cinematic 35mm Strip',
  subtitle: 'Sleek matte black negative film strip with frame counter numbers',
  category: 'minimal',
  style: 'film-strip',
  photoSlotsCount: 4,
  aspectRatio: '2:6',
  canvasWidth: 600,
  canvasHeight: 1800,
  backgroundColor: '#121212',
  backgroundTexture: 'none',
  backgroundGradient: 'none',
  frameBorderColor: '#333333',
  frameBorderWidth: 0,
  frameBorderRadius: 0,
  accentColor: '#f59e0b',
  textColor: '#ffffff',
  colorPalettes: ['#121212', '#1a1a1a', '#0a0a0a', '#262626'],
  photoSlots: [
    { id: 'slot-1', x: 16, y: 5, width: 68, height: 20, rotation: 0, borderRadius: 2, aspectRatio: 4 / 3 },
    { id: 'slot-2', x: 16, y: 27, width: 68, height: 20, rotation: 0, borderRadius: 2, aspectRatio: 4 / 3 },
    { id: 'slot-3', x: 16, y: 49, width: 68, height: 20, rotation: 0, borderRadius: 2, aspectRatio: 4 / 3 },
    { id: 'slot-4', x: 16, y: 71, width: 68, height: 20, rotation: 0, borderRadius: 2, aspectRatio: 4 / 3 },
  ],
  decorativeElements: [
    // Left & right film sprocket perforations
    { id: 'sprocket-l', type: 'sprocket', content: '░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░', x: 5, y: 50, fontSize: 14, color: '#444444', rotation: 90 },
    { id: 'sprocket-r', type: 'sprocket', content: '░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░', x: 95, y: 50, fontSize: 14, color: '#444444', rotation: 90 },
    { id: 'num-1', type: 'badge', content: '12 ▶', x: 88, y: 15, fontSize: 12, color: '#f59e0b', fontFamily: 'monospace' },
    { id: 'num-2', type: 'badge', content: '12A ▶', x: 88, y: 37, fontSize: 12, color: '#f59e0b', fontFamily: 'monospace' },
    { id: 'num-3', type: 'badge', content: '13 ▶', x: 88, y: 59, fontSize: 12, color: '#f59e0b', fontFamily: 'monospace' },
    { id: 'num-4', type: 'badge', content: '13A ▶', x: 88, y: 81, fontSize: 12, color: '#f59e0b', fontFamily: 'monospace' },
  ],
  textElements: [
    { id: 'text-brand', defaultText: 'KODAK 400 PORTRA', placeholder: 'Film Brand', x: 50, y: 94, fontFamily: 'Outfit', fontSize: 16, color: '#f59e0b', align: 'center', isEditable: true },
    { id: 'text-sub', defaultText: '35MM FILM  •  SAFETY FILM', placeholder: 'Specs', x: 50, y: 97, fontFamily: 'Outfit', fontSize: 11, color: '#888888', align: 'center', isEditable: false },
  ],
  tags: ['minimal', 'film', '35mm', 'black', 'cinematic', '4-photos'],
  isPopular: true,
};
