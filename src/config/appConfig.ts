export const APP_CONFIG = {
  name: 'PixBooth Studio',
  version: 'v1.5.0',
  buildDate: '17 September 2026',
  codename: 'Studio Backdrops, Camera Mirror Flow & Tactile Canvas Textures',
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
  },

  changelogHighlights: [
    'Standby Mirror Mode "Bercermin" & Tombol Mulai Ambil Foto 📸',
    'Transisi Jeda 3 Detik "Ganti Gaya Berikutnya! ✨" Antar Pose',
    'Foto Ulang Fleksibel Per-Slot (Slot 1, 2, 3, atau 4) Tanpa Reset Semua',
    'Studio Backdrop Presets & Upload Background Foto Sendiri (JPG/PNG)',
    'Tekstur Fisik Kertas Nyata (Linen, Matte, Kertas Antik, Rajutan Wol, Ombak Laut)',
    'GIF Boomerang HD Jernih + Penyesuaian Filter Warna Real-Time',
    'Relay Email Saran & Bug Terverifikasi Web3Forms ke pixbooth.support@gmail.com',
  ],
} as const;

export type AppConfig = typeof APP_CONFIG;
