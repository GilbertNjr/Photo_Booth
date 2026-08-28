export type FilmGradeType =
  | 'original'
  | 'kodak_portra'
  | 'fuji_velvia'
  | 'vintage_vhs'
  | 'nordic_monochrome'
  | 'seoul_sunset'
  | 'cyber_neon';

export interface FilmPreset {
  id: FilmGradeType;
  name: string;
  subtitle: string;
  filterCss: string;
  badge: string;
}

export const FILM_PRESETS: FilmPreset[] = [
  {
    id: 'original',
    name: 'Natural Studio',
    subtitle: 'Warna Alami Studio 4K',
    filterCss: 'brightness(1.06) contrast(1.05) saturate(1.05)',
    badge: 'CLEAR',
  },
  {
    id: 'kodak_portra',
    name: 'Kodak Portra 400',
    subtitle: 'Warm Skin Tone & Soft Pastel',
    filterCss: 'brightness(1.08) contrast(1.02) saturate(1.15) sepia(0.12) hue-rotate(-5deg)',
    badge: 'KODAK',
  },
  {
    id: 'fuji_velvia',
    name: 'Fuji Velvia 50',
    subtitle: 'Warna Tajam, Hijau & Biru Vivid',
    filterCss: 'brightness(1.04) contrast(1.18) saturate(1.35) hue-rotate(2deg)',
    badge: 'FUJI',
  },
  {
    id: 'vintage_vhs',
    name: 'Retro VHS 1990s',
    subtitle: 'Gaya Camcorder Klasik & Grain',
    filterCss: 'contrast(1.12) saturate(1.25) sepia(0.2) hue-rotate(-15deg)',
    badge: 'VHS 90s',
  },
  {
    id: 'nordic_monochrome',
    name: 'Noir Monochrome',
    subtitle: 'Hitam Putih Klasik Kontras Tinggi',
    filterCss: 'grayscale(1) contrast(1.25) brightness(1.05)',
    badge: 'B&W',
  },
  {
    id: 'seoul_sunset',
    name: 'Seoul Sunset',
    subtitle: 'Kilau Senja Warm Golden Hour',
    filterCss: 'brightness(1.1) contrast(1.08) saturate(1.2) sepia(0.18)',
    badge: 'GOLDEN',
  },
  {
    id: 'cyber_neon',
    name: 'Cyberpunk Neon',
    subtitle: 'Nuansa Biru Cyan & Violet Futuristic',
    filterCss: 'brightness(1.05) contrast(1.2) saturate(1.4) hue-rotate(180deg)',
    badge: 'CYBER',
  },
];

export class ColorShaderService {
  /**
   * Apply selected cinematic film grade preset to canvas rendering context
   */
  static applyFilmPreset(ctx: CanvasRenderingContext2D, presetId: FilmGradeType): void {
    const preset = FILM_PRESETS.find((p) => p.id === presetId) || FILM_PRESETS[0];
    ctx.filter = preset.filterCss;
  }
}
