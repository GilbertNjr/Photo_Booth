export const APP_CONFIG = {
  name: 'PixBooth Studio',
  version: 'v1.4.0',
  buildDate: '16 September 2026',
  codename: 'Nakatama Scrapbook & Freeform Transformer',
  supportEmail: 'pixbooth.support@gmail.com',
  author: 'GilbertNjr',
  copyrightYear: 2026,
  
  features: {
    freeformStickers: true,
    nakatamaFrames: true,
    arFaceFilters: true,
    boomerangGif: true,
    onDevicePrivacy: true,
    liveSessionMetrics: true,
  },

  changelogHighlights: [
    'Rotasi 360° Bebas & Continuous Zoom In/Out pada Stiker',
    'Bingkai Scrapbook Korea & Jepang: Nakatama Marine & Cozy Knit Dump',
    'Kurasi Template Cerdas dengan Badge ⭐ Best Seller & ✨ New',
    'Pusat Masukan & Kritik Pengguna Real-Time terhubung ke pixbooth.support@gmail.com',
    'Jaminan Keamanan Privasi 100% On-Device (Tanpa Database)',
  ],
} as const;

export type AppConfig = typeof APP_CONFIG;
