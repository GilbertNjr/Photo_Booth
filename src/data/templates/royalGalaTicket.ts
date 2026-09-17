import type { TemplateData } from '../../types/template';

/**
 * 🎟️ Royal Gala VIP Ticket Photostrip Template (3-Cuts Studio Reference)
 * Deep Burgundy Velvet, Triple Gold Border, Metallic Filigree Dividers, Barcode & Ribbon Seal
 */
export const templateRoyalGalaTicket: TemplateData = {
  id: 'royal-gala-vip-ticket',
  name: 'Royal Gala VIP Ticket 🎟️',
  subtitle: 'Burgundy Velvet & Golden Filigree 3-Cuts',
  category: 'vintage',
  style: 'ticket',
  photoSlotsCount: 3,
  aspectRatio: '2:6',
  canvasWidth: 1142,
  canvasHeight: 2048,

  backgroundColor: '#380614',
  backgroundTexture: 'matte',
  frameBorderColor: '#D4AF37',
  frameBorderWidth: 0,
  frameBorderRadius: 28,
  accentColor: '#D4AF37',
  textColor: '#F5E6C8',

  isNew: true,
  isBestSeller: true,
  isPopular: true,
  rating: 5.0,
  usageCount: 5240,
  badgeText: '⭐ VIP TICKET',

  showWashiTape: false,
  showLiveStamp: false,
  showBarcode: false,

  colorPalettes: ['#380614', '#1A1024', '#0F241C', '#1E1E24'],

  photoSlots: [
    {
      id: 'gala-slot-1',
      x: 27.14,
      y: 19.53,
      width: 45.53,
      height: 16.41,
      borderRadius: 14,
      borderStyle: 'none',
      aspectRatio: 1.57,
      borderColor: '#D4AF37',
    },
    {
      id: 'gala-slot-2',
      x: 27.14,
      y: 42.38,
      width: 45.53,
      height: 16.41,
      borderRadius: 14,
      borderStyle: 'none',
      aspectRatio: 1.57,
      borderColor: '#D4AF37',
    },
    {
      id: 'gala-slot-3',
      x: 27.14,
      y: 64.84,
      width: 45.53,
      height: 16.41,
      borderRadius: 14,
      borderStyle: 'none',
      aspectRatio: 1.57,
      borderColor: '#D4AF37',
    },
  ],

  decorativeElements: [
    {
      id: 'gala-badge-seal',
      type: 'badge',
      content: 'RG-2025-001',
      x: 50,
      y: 93,
      color: '#D4AF37',
    },
  ],

  textElements: [
    {
      id: 'gala-title',
      defaultText: 'ROYAL GALA',
      placeholder: 'ROYAL GALA',
      x: 50,
      y: 11,
      fontFamily: 'Playfair Display, serif',
      fontSize: 28,
      color: '#D4AF37',
      align: 'center',
      isEditable: false,
    },
  ],

  tags: ['royal gala', 'ticket', 'vip', 'vintage', 'gold', 'burgundy', '3-cuts', 'filigree', 'admission', 'best-seller'],

  samplePhotos: [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80',
  ],
};
