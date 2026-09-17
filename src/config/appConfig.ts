export const APP_CONFIG = {
  name: 'PixBooth Studio',
  version: 'v1.6.0',
  buildDate: '17 September 2026',
  codename: 'Digital Ring Light, 3D Hologram Tilt, Multi-Face AR & Photo Tray',
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
    studioBackdrops: true,
    slotBySlotRetake: true,
    digitalRingLight: true,
    hologramFoilTilt: true,
    multiFaceAR: true,
    sessionPhotoTray: true,
  },

  changelogHighlights: [
    '💡 Digital Ring Light Layar (Penerang Wajah Virtual: Studio White, Warm, Soft Pink)',
    '🌈 Efek 3D Hologram K-Pop Photocard Foil (Refleksi Gerak Gyroscope & Mouse)',
    '👥 Multi-Face AR Detection (Filter Wajah Otomatis Berdua & Bertiga Bersamaan)',
    '🗂️ Photo Tray Sesi Ini (Baki Hasil Foto & Coba Bingkai Lain Tanpa Foto Ulang)',
    '🔍 Modal Bandingkan Berdampingan (Side-by-Side Comparison) Antar Strip',
  ],
} as const;

export type AppConfig = typeof APP_CONFIG;
