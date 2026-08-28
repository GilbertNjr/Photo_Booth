import type { TemplateData } from '../../types/template';

export const cutePink01: TemplateData = {
  id: 'cute-pink-01',
  name: '3D Tilted Polaroid Scrapbook',
  subtitle: 'Tilted polaroid frames with drop shadows, mushroom 🍄, starfish 🐚 & hibiscus 🌺 (Image 2)',
  category: 'cute',
  style: 'polaroid',
  photoSlotsCount: 3,
  aspectRatio: '2:6',
  canvasWidth: 600,
  canvasHeight: 1800,
  backgroundColor: '#26201c',
  backgroundTexture: 'paper',
  frameBorderColor: '#3a302a',
  frameBorderWidth: 4,
  frameBorderRadius: 16,
  accentColor: '#e07a5f',
  textColor: '#f4f1de',
  colorPalettes: ['#26201c', '#2d2621', '#e07a5f', '#f4f1de', '#3d405b'],
  photoSlots: [
    { id: 'slot-1', x: 10, y: 6, width: 80, height: 42, rotation: -3, frameStyle: 'polaroid', aspectRatio: 3 / 4 },
    { id: 'slot-2', x: 8, y: 52, width: 40, height: 26, rotation: 4, frameStyle: 'polaroid', aspectRatio: 1 / 1 },
    { id: 'slot-3', x: 52, y: 52, width: 40, height: 26, rotation: -2, frameStyle: 'polaroid', aspectRatio: 1 / 1 },
  ],
  decorativeElements: [
    { id: 'mushroom-top', type: 'sticker', content: '🍄', x: 10, y: 6, rotation: -15, fontSize: 52 },
    { id: 'camera-right', type: 'sticker', content: '📷', x: 86, y: 34, rotation: 12, fontSize: 48 },
    { id: 'starfish-left', type: 'sticker', content: '🐚', x: 8, y: 64, rotation: -20, fontSize: 48 },
    { id: 'hibiscus-right', type: 'sticker', content: '🌺', x: 88, y: 90, rotation: 15, fontSize: 56 },
  ],
  textElements: [
    { id: 'text-1', defaultText: 'good things are coming ♡', placeholder: 'Caption', x: 50, y: 95, fontFamily: 'Caveat', fontSize: 26, color: '#f4f1de', align: 'center', isEditable: true },
  ],
  tags: ['3d-polaroid', 'tilted', 'scrapbook', 'mushroom', 'starfish', 'hibiscus', '3-photos'],
  isPopular: true,
  isNew: true,
};
