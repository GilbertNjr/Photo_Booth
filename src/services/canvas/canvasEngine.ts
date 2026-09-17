import type { TemplateData, PaperTextureType } from '../../types/template';
import type { PhotoFilterType, PlacedSticker } from '../../types/editor';

export interface RenderCanvasOptions {
  filter?: PhotoFilterType;
  backgroundColor?: string;
  backgroundTexture?: PaperTextureType;
  customBackdropUrl?: string;
  customTexts?: Record<string, string>;
  customBottomText?: string;
  placedStickers?: PlacedSticker[];
  showWashiTape?: boolean;
  showLiveStamp?: boolean;
  showBarcode?: boolean;
  washiTapeColor?: string;
}

export class CanvasEngine {
  /**
   * Get CSS canvas filter string based on selected photo filter type
   */
  public static getFilterCss(filter: PhotoFilterType): string {
    switch (filter) {
      case 'bright':
        return 'brightness(1.15) contrast(1.05) saturate(1.1)';
      case 'warm':
        return 'sepia(0.25) contrast(1.05) saturate(1.2) hue-rotate(-10deg)';
      case 'vintage':
        return 'sepia(0.4) contrast(1.1) brightness(0.95) saturate(0.85)';
      case 'film':
        return 'contrast(1.2) saturate(0.85) brightness(1.05) sepia(0.15)';
      case 'soft':
        return 'brightness(1.08) contrast(0.92) saturate(1.15)';
      case 'bw':
        return 'grayscale(1) contrast(1.2) brightness(1.05)';
      case 'retro':
        return 'contrast(1.25) saturate(1.3) hue-rotate(15deg)';
      case 'original':
      default:
        return 'none';
    }
  }

  /**
   * Apply CSS canvas filters to 2D Context based on selected photo filter type
   */
  private static applyContextFilter(ctx: CanvasRenderingContext2D, filter: PhotoFilterType): void {
    ctx.filter = this.getFilterCss(filter);
  }

  /**
   * Helper to load HTMLImageElement asynchronously
   */
  private static loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = (e) => reject(e);
      img.src = src;
    });
  }

  /**
   * Helper to draw realistic semi-transparent washi tape with paper edges
   */
  private static drawWashiTape(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    angleDeg: number,
    tapeColor: string = 'rgba(255, 235, 210, 0.8)'
  ): void {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((angleDeg * Math.PI) / 180);
    ctx.shadowColor = 'rgba(0, 0, 0, 0.18)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetY = 2;

    ctx.fillStyle = tapeColor;
    ctx.fillRect(-w / 2, -h / 2, w, h);

    // Jagged cut tape edges on top & bottom
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.fillRect(-w / 2, -h / 2, w, 2.5);
    ctx.fillRect(-w / 2, h / 2 - 2.5, w, 2.5);

    // Delicate tape fiber lines
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.04)';
    ctx.lineWidth = 1;
    for (let lx = -w / 2 + 5; lx < w / 2; lx += 6) {
      ctx.beginPath();
      ctx.moveTo(lx, -h / 2);
      ctx.lineTo(lx, h / 2);
      ctx.stroke();
    }
    ctx.restore();
  }

  /**
   * Helper to draw dynamic live circular rubber postal stamp with current date
   */
  private static drawLiveStamp(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    r: number,
    color: string = '#8C2635'
  ): void {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((-12 * Math.PI) / 180);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.88;

    // Outer border
    ctx.lineWidth = Math.max(2, r * 0.05);
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.stroke();

    // Inner dashed circle
    ctx.lineWidth = Math.max(1, r * 0.025);
    ctx.setLineDash([Math.max(3, r * 0.08), Math.max(2, r * 0.05)]);
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.84, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Live formatted date
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const dateStr = `${year}.${month}.${day}`;

    ctx.font = `700 ${Math.round(r * 0.22)}px monospace, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('PHOTO STUDIO', 0, -r * 0.42);

    ctx.font = `900 ${Math.round(r * 0.26)}px monospace, sans-serif`;
    ctx.fillText(dateStr, 0, 0);

    ctx.font = `700 ${Math.round(r * 0.17)}px sans-serif`;
    ctx.fillText('★ ORIGINAL SHOT ★', 0, r * 0.42);

    ctx.restore();
  }

  /**
   * Helper to draw clean modern barcode accent
   */
  private static drawBarcode(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    color: string = '#1E293B'
  ): void {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = color;

    const pattern = [2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 3, 1, 2, 1, 4, 1, 2];
    const totalUnits = pattern.reduce((acc, val) => acc + val, 0) + 10;
    const unitWidth = w / totalUnits;
    let curX = -w / 2;

    for (let i = 0; i < pattern.length; i++) {
      const barW = pattern[i] * unitWidth;
      if (i % 2 === 0) {
        ctx.fillRect(curX, -h / 2, barW, h * 0.72);
      }
      curX += barW + (unitWidth * 0.5);
    }

    ctx.font = `bold ${Math.round(h * 0.24)}px monospace, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText('№ PB-2026-KR', 0, h / 2);
    ctx.restore();
  }

  /**
   * Return SVG Data URL string for decorative stickers (High Definition 3D SVGs)
   */
  private static getStickerSvg(content: string): string | null {
    switch (content) {
      case '💖':
      case '🤎':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#FF5E8E"/><stop offset="100%" stop-color="#D90429"/></linearGradient><linearGradient id="g2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.6"/><stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/></linearGradient></defs><path d="M32 56S10 38 10 22a12 12 0 0 1 20-9 12 12 0 0 1 20 9c0 16-22 34-22 34z" fill="url(#g1)" stroke="#800020" stroke-width="2.5"/><path d="M32 54S12 37 12 22a10 10 0 0 1 17-7.5" fill="none" stroke="url(#g2)" stroke-width="3"/><path d="M46 16l2 4 4 2-4 2-2 4-2-4-4-2 4-2z" fill="#FFF"/><path d="M18 30l1.5 3 3 1.5-3 1.5-1.5 3-1.5-3-3-1.5 3-1.5z" fill="#FFD166"/></svg>`;
      case '💋':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M12 28c6-6 14-8 20-2c6-6 14-4 20 2c-4 6-12 10-20 8c-8 2-16-2-20-8z" fill="#D90429" stroke="#800020" stroke-width="2"/><path d="M14 34c8 8 28 10 36 0c-8 12-28 14-36 0z" fill="#EF233C" stroke="#800020" stroke-width="2"/></svg>`;
      case '🎀':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="rb" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#FF4D6D"/><stop offset="100%" stop-color="#A4133C"/></linearGradient></defs><path d="M32 28C20 16 6 22 14 36c8 14 18-4 18-4z" fill="url(#rb)" stroke="#590d22" stroke-width="2"/><path d="M32 28c12-12 26-6 18 8-8 14-18-4-18-4z" fill="url(#rb)" stroke="#590d22" stroke-width="2"/><path d="M28 32l-14 24s6 2 12-2l8-20z" fill="#C9184A" stroke="#590d22" stroke-width="2"/><path d="M36 32l14 24s-6 2-12-2l-8-20z" fill="#A4133C" stroke="#590d22" stroke-width="2"/><rect x="26" y="25" width="12" height="12" rx="4" fill="#FF758F" stroke="#590d22" stroke-width="2"/><circle cx="32" cy="31" r="3" fill="#FFF" opacity="0.6"/></svg>`;
      case '⭐':
      case '🐚':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="st" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#FFD166"/><stop offset="50%" stop-color="#FFB703"/><stop offset="100%" stop-color="#FB8500"/></linearGradient></defs><path d="M32 4l8.5 17 18.5 2.5-13.5 13 3 18.5L32 46.5 15 55l3-18.5L4.5 23.5 23 21z" fill="url(#st)" stroke="#D48806" stroke-width="2.5"/><path d="M32 8l6.5 13L51 23l-10 9.5 2.5 13.5L32 39.5" fill="none" stroke="#FFF" stroke-width="2" opacity="0.7"/></svg>`;
      case '🌸':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M32 32C24 16 12 24 18 36C24 48 32 32 32 32Z" fill="#FFB3C6" stroke="#C9184A" stroke-width="2"/><path d="M32 32C48 24 52 38 40 44C28 50 32 32 32 32Z" fill="#FF85A1" stroke="#C9184A" stroke-width="2"/><path d="M32 32C38 48 24 54 20 42C16 30 32 32 32 32Z" fill="#FFB3C6" stroke="#C9184A" stroke-width="2"/><path d="M32 32C16 38 18 52 30 50C42 48 32 32 32 32Z" fill="#FF85A1" stroke="#C9184A" stroke-width="2"/><circle cx="32" cy="32" r="6" fill="#FFD166" stroke="#FB8500" stroke-width="2"/></svg>`;
      case '✨':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M32 4c2 14 14 26 28 28-14 2-26 14-28 28-2-14-14-26-28-28 14-2 26-14 28-28z" fill="#FFD166" stroke="#FB8500" stroke-width="2"/><path d="M52 8c1 5 5 9 10 10-5 1-9 5-10 10-1-5-5-9-10-10 5-1 9-5 10-10z" fill="#FFB703"/></svg>`;
      case '🧸':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="16" cy="16" r="10" fill="#9C6644" stroke="#4A2E1B" stroke-width="2.5"/><circle cx="48" cy="16" r="10" fill="#9C6644" stroke="#4A2E1B" stroke-width="2.5"/><circle cx="16" cy="16" r="5" fill="#E6CCB2"/><circle cx="48" cy="16" r="5" fill="#E6CCB2"/><circle cx="32" cy="34" r="20" fill="#9C6644" stroke="#4A2E1B" stroke-width="2.5"/><ellipse cx="32" cy="38" rx="9" ry="7" fill="#E6CCB2"/><circle cx="32" cy="35" r="3.5" fill="#4A2E1B"/><circle cx="24" cy="28" r="3" fill="#2B1D12"/><circle cx="40" cy="28" r="3" fill="#2B1D12"/><circle cx="23" cy="27" r="1" fill="#FFF"/><circle cx="39" cy="27" r="1" fill="#FFF"/></svg>`;
      case '🐰':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><ellipse cx="20" cy="18" rx="6" ry="16" fill="#FFF" stroke="#E2E8F0" stroke-width="2"/><ellipse cx="44" cy="18" rx="6" ry="16" fill="#FFF" stroke="#E2E8F0" stroke-width="2"/><ellipse cx="20" cy="18" rx="3.5" ry="11" fill="#FFB3C6"/><ellipse cx="44" cy="18" rx="3.5" ry="11" fill="#FFB3C6"/><circle cx="32" cy="38" r="18" fill="#FFF" stroke="#E2E8F0" stroke-width="2"/><circle cx="24" cy="34" r="2.5" fill="#2D3748"/><circle cx="40" cy="34" r="2.5" fill="#2D3748"/><polygon points="32,38 30,41 34,41" fill="#FF85A1"/><ellipse cx="20" cy="40" rx="3" ry="2" fill="#FFB3C6" opacity="0.7"/><ellipse cx="44" cy="40" rx="3" ry="2" fill="#FFB3C6" opacity="0.7"/></svg>`;
      case '🍰':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><polygon points="8,40 56,24 56,48 8,56" fill="#FFF3BF" stroke="#D9480F" stroke-width="2"/><polygon points="8,40 56,24 32,16 8,40" fill="#FFE066" stroke="#D9480F" stroke-width="2"/><path d="M8 48s12-4 24 2 24-2 24-2v6s-12 4-24-2-24 2-24 2z" fill="#FF6B6B"/><circle cx="32" cy="16" r="6" fill="#E63946"/><path d="M32 10c-2-3 0-5 2-5" stroke="#2F9E44" stroke-width="2" fill="none"/></svg>`;
      case '📸':
      case '📷':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect x="6" y="18" width="52" height="38" rx="8" fill="#343A40" stroke="#212529" stroke-width="3"/><path d="M20 18l3-8h18l3 8z" fill="#495057" stroke="#212529" stroke-width="2"/><circle cx="32" cy="37" r="13" fill="#212529" stroke="#FFD166" stroke-width="3"/><circle cx="32" cy="37" r="8" fill="#4D908E"/><circle cx="29" cy="34" r="3" fill="#FFF" opacity="0.8"/><rect x="12" y="24" width="8" height="5" rx="2" fill="#FF6B6B"/></svg>`;
      case '👑':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M8 48l4-32 12 16 8-20 8 20 12-16 4 32z" fill="#FFD166" stroke="#D48806" stroke-width="2.5"/><rect x="8" y="48" width="48" height="8" rx="2" fill="#FB8500" stroke="#D48806" stroke-width="2"/><circle cx="12" cy="16" r="3" fill="#E63946"/><circle cx="32" cy="12" r="3.5" fill="#4EA8DE"/><circle cx="52" cy="16" r="3" fill="#E63946"/><circle cx="20" cy="52" r="2" fill="#FFF"/><circle cx="32" cy="52" r="2" fill="#FFF"/><circle cx="44" cy="52" r="2" fill="#FFF"/></svg>`;
      case '☕':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M12 24h32v20c0 8-6 14-16 14S12 52 12 44V24z" fill="#FFF" stroke="#6C5CE7" stroke-width="3"/><path d="M44 28h6c4 0 6 3 6 6s-2 6-6 6h-6" fill="none" stroke="#6C5CE7" stroke-width="3"/><ellipse cx="28" cy="24" rx="16" ry="4" fill="#6F4E37"/><path d="M22 16c0-3 3-3 3-6M28 16c0-3 3-3 3-6M34 16c0-3 3-3 3-6" stroke="#A0AEC0" stroke-width="2" fill="none"/></svg>`;
      case '🎈':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><ellipse cx="32" cy="26" rx="20" ry="24" fill="#FF4D6D" stroke="#C9184A" stroke-width="2.5"/><polygon points="32,50 28,55 36,55" fill="#C9184A"/><path d="M32 55c-4 4 4 8 0 12" stroke="#A4133C" stroke-width="2" fill="none"/><ellipse cx="24" cy="18" rx="4" ry="8" fill="#FFF" opacity="0.6" transform="rotate(-20 24 18)"/></svg>`;
      case '🎂':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect x="10" y="34" width="44" height="22" rx="4" fill="#FF85A1" stroke="#C9184A" stroke-width="2"/><rect x="14" y="22" width="36" height="14" rx="3" fill="#FFF3BF" stroke="#F59E0B" stroke-width="2"/><path d="M14 26s6 4 12 0 12 4 12 0 12 4 12 0" stroke="#FF4D6D" stroke-width="3" fill="none"/><rect x="22" y="12" width="4" height="10" fill="#38BDF8"/><rect x="38" y="12" width="4" height="10" fill="#38BDF8"/><circle cx="24" cy="8" r="3" fill="#FFB703"/><circle cx="40" cy="8" r="3" fill="#FFB703"/></svg>`;
      case '🎓':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><polygon points="32,8 60,22 32,36 4,22" fill="#1E293B" stroke="#0F172A" stroke-width="2"/><path d="M16 28v16c0 6 8 10 16 10s16-4 16-10V28" fill="none" stroke="#1E293B" stroke-width="3"/><line x1="52" y1="24" x2="52" y2="44" stroke="#F59E0B" stroke-width="3.5"/><circle cx="52" cy="46" r="3" fill="#F59E0B"/></svg>`;
      case '🌊':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M4 42c8-8 16 4 24-4s16 4 24-4v18H4z" fill="#38BDF8" stroke="#0284C7" stroke-width="2"/><path d="M4 30c8-8 16 4 24-4s16 4 24-4" fill="none" stroke="#0EA5E9" stroke-width="3"/></svg>`;
      case '☀️':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="14" fill="#FFB703" stroke="#FB8500" stroke-width="2.5"/><path d="M32 4v8M32 52v8M4 32h8M52 32h8M12 12l6 6M46 46l6 6M12 52l6-6M46 18l6-6" stroke="#FB8500" stroke-width="3.5" stroke-linecap="round"/></svg>`;
      case '🍓':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M32 16C18 16 12 28 16 46C20 60 32 62 32 62C32 62 44 60 48 46C52 28 46 16 32 16Z" fill="#D90429" stroke="#800020" stroke-width="3"/><path d="M32 16C26 8 20 12 18 14M32 16C38 8 44 12 46 14M32 16V8" stroke="#2D6A4F" stroke-width="4"/><circle cx="24" cy="28" r="1.5" fill="#FFB703"/><circle cx="36" cy="26" r="1.5" fill="#FFB703"/><circle cx="28" cy="38" r="1.5" fill="#FFB703"/><circle cx="40" cy="36" r="1.5" fill="#FFB703"/></svg>`;
      case '🎵':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 70"><rect width="110" height="70" rx="10" fill="#2C2219" opacity="0.9" stroke="#D2B48C" stroke-width="2.5"/><rect x="10" y="10" width="22" height="22" rx="4" fill="#8C6239"/><circle cx="21" cy="21" r="6" fill="#F5EFE6"/><text x="38" y="20" fill="#F5EFE6" font-size="9" font-family="sans-serif" font-weight="bold">Lover</text><text x="38" y="29" fill="#D2B48C" font-size="7" font-family="sans-serif">Taylor Swift ♡</text><text x="10" y="44" fill="#FFF" font-size="8" font-family="sans-serif">Can we always be this close? ✨</text><line x1="10" y1="56" x2="100" y2="56" stroke="#6C4A35" stroke-width="2"/><circle cx="40" cy="56" r="3" fill="#D2B48C"/></svg>`;
      case '⚡':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><polygon points="36,4 12,34 32,34 26,60 52,26 32,26" fill="#FACC15" stroke="#CA8A04" stroke-width="2.5"/></svg>`;
      case '💌':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect x="6" y="16" width="52" height="36" rx="4" fill="#FFF" stroke="#E2E8F0" stroke-width="2.5"/><polygon points="6,16 32,36 58,16" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2"/><circle cx="32" cy="34" r="6" fill="#E63946"/><path d="M32 36s-3-2-3-3.5a1.5 1.5 0 0 1 3-1 1.5 1.5 0 0 1 3 1c0 1.5-3 3.5-3 3.5z" fill="#FFF"/></svg>`;
      case '🍀':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="24" cy="24" r="10" fill="#4ADE80" stroke="#16A34A" stroke-width="2"/><circle cx="40" cy="24" r="10" fill="#4ADE80" stroke="#16A34A" stroke-width="2"/><circle cx="24" cy="40" r="10" fill="#4ADE80" stroke="#16A34A" stroke-width="2"/><circle cx="40" cy="40" r="10" fill="#4ADE80" stroke="#16A34A" stroke-width="2"/><path d="M32 32c4 8-2 16 2 24" stroke="#166534" stroke-width="3.5" fill="none"/></svg>`;
      case '🦋':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M32 30C22 14 6 22 14 36C22 48 32 34 32 34Z" fill="#C9184A" stroke="#500A14" stroke-width="2"/><path d="M32 30C42 14 58 22 50 36C42 48 32 34 32 34Z" fill="#D90429" stroke="#500A14" stroke-width="2"/><path d="M32 34C24 38 12 50 20 56C28 60 32 40 32 40Z" fill="#800020"/><line x1="32" y1="20" x2="32" y2="44" stroke="#1A1817" stroke-width="4"/></svg>`;
      case '🌙':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M44 8A24 24 0 1 0 56 44 20 20 0 1 1 44 8z" fill="#FACC15" stroke="#CA8A04" stroke-width="2.5"/><polygon points="46,14 48,18 52,18 49,21 50,25 46,22 42,25 43,21 40,18 44,18" fill="#FFF"/></svg>`;
      case '🍒':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="20" cy="44" r="12" fill="#DC2626" stroke="#991B1B" stroke-width="2.5"/><circle cx="44" cy="42" r="12" fill="#DC2626" stroke="#991B1B" stroke-width="2.5"/><path d="M20 32C24 16 32 10 32 10M44 30C40 16 32 10 32 10" stroke="#166534" stroke-width="3" fill="none"/><path d="M32 10c-4-4-10-2-12 0" fill="#4ADE80" stroke="#166534" stroke-width="2"/><circle cx="16" cy="40" r="3" fill="#FFF" opacity="0.6"/><circle cx="40" cy="38" r="3" fill="#FFF" opacity="0.6"/></svg>`;
      case '🍄':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M12 36C12 21.6 20.9 10 32 10C43 10 52 21.6 52 36H12Z" fill="#E63946" stroke="#900C3F" stroke-width="3"/><circle cx="24" cy="22" r="4.5" fill="#FFF"/><circle cx="40" cy="24" r="3.5" fill="#FFF"/><circle cx="31" cy="16" r="3" fill="#FFF"/><path d="M22 36V48C22 52 26 55 32 55C38 55 42 52 42 48V36H22Z" fill="#FDF0ED" stroke="#B8978A" stroke-width="3"/></svg>`;
      case '🌺':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M32 32C24 16 12 24 18 36C24 48 32 32 32 32Z" fill="#FF477E"/><path d="M32 32C48 24 52 38 40 44C28 50 32 32 32 32Z" fill="#FF5C8A"/><path d="M32 32C38 48 24 54 20 42C16 30 32 32 32 32Z" fill="#FF7096"/><path d="M32 32C16 38 18 52 30 50C42 48 32 32 32 32Z" fill="#FF85A1"/><circle cx="32" cy="32" r="5" fill="#FFD166"/></svg>`;
      case '🌷':
      case '💐':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M32 60V32" stroke="#2D6A4F" stroke-width="4"/><path d="M32 32C22 26 18 10 32 16C46 10 42 26 32 32Z" fill="#C9184A" stroke="#800020" stroke-width="3"/></svg>`;
      case '🍷':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M12 12L32 36L52 12H12Z" fill="#800020" stroke="#FFF" stroke-width="3"/><line x1="32" y1="36" x2="32" y2="56" stroke="#FFF" stroke-width="4"/><line x1="20" y1="56" x2="44" y2="56" stroke="#FFF" stroke-width="4"/></svg>`;
      case '🎟️':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 54"><rect width="90" height="54" rx="8" fill="#E8DFD1" stroke="#8C684D" stroke-width="3"/><circle cx="0" cy="27" r="8" fill="#7A1C28"/><circle cx="90" cy="27" r="8" fill="#7A1C28"/><text x="32" y="24" fill="#4A3324" font-size="9" font-family="sans-serif" font-weight="bold">TICKET TO</text><text x="32" y="36" fill="#7A1C28" font-size="10" font-family="serif" font-weight="bold">Anywhere ✨</text></svg>`;
      case '📼':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 50"><rect width="80" height="50" rx="6" fill="#27272A" stroke="#52525B" stroke-width="3"/><rect x="12" y="10" width="56" height="20" rx="3" fill="#E4E4E7"/><circle cx="28" cy="20" r="6" fill="#18181B" stroke="#A1A1AA" stroke-width="2"/><circle cx="52" cy="20" r="6" fill="#18181B" stroke="#A1A1AA" stroke-width="2"/><path d="M20 38H60L54 44H26L20 38Z" fill="#3F3F46"/></svg>`;
      case '💿':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="28" fill="#1A1817" stroke="#3D3A37" stroke-width="2"/><circle cx="32" cy="32" r="22" stroke="#333333" stroke-width="1" stroke-dasharray="3 3"/><circle cx="32" cy="32" r="16" stroke="#333333" stroke-width="1"/><circle cx="32" cy="32" r="10" fill="#E63946"/><circle cx="32" cy="32" r="3.5" fill="#FFFFFF"/></svg>`;
      case '🪩':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 76"><line x1="32" y1="0" x2="32" y2="16" stroke="#C0C0C0" stroke-width="2"/><circle cx="32" cy="44" r="26" fill="url(#dg)" stroke="#808080" stroke-width="2"/><path d="M10 44C10 32 54 32 54 44C54 56 10 56 10 44Z" stroke="#E0E0E0" stroke-width="1.5" stroke-dasharray="3 3"/><path d="M16 44C16 24 48 24 48 44C48 64 16 64 16 44Z" stroke="#E0E0E0" stroke-width="1.5" stroke-dasharray="3 3"/><line x1="32" y1="18" x2="32" y2="70" stroke="#FFFFFF" stroke-width="1.5" opacity="0.6"/><defs><radialGradient id="dg" cx="32" cy="36" r="26" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#FFFFFF"/><stop offset="50%" stop-color="#D3D3D3"/><stop offset="100%" stop-color="#707070"/></radialGradient></defs></svg>`;
      case '📎':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect x="20" y="12" width="24" height="14" rx="3" fill="#D4AF37" stroke="#8B6B1B" stroke-width="2"/><path d="M26 26L20 52H44L38 26" stroke="#D4AF37" stroke-width="3" fill="none"/></svg>`;
      case '🐱':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 60"><path d="M15 55C15 35 25 25 35 25C45 25 55 35 55 55H15Z" fill="#1A1817"/><polygon points="20,28 15,12 30,22" fill="#1A1817"/><polygon points="50,28 55,12 40,22" fill="#1A1817"/><circle cx="28" cy="33" r="3" fill="#FFD166"/><circle cx="42" cy="33" r="3" fill="#FFD166"/><path d="M40 55C40 38 50 28 62 28C74 28 84 38 84 55H40Z" fill="#F4E2D8"/><polygon points="46,30 42,16 56,25" fill="#F4E2D8"/><polygon points="78,30 82,16 68,25" fill="#F4E2D8"/><circle cx="54" cy="36" r="3" fill="#4B6584"/><circle cx="70" cy="36" r="3" fill="#4B6584"/></svg>`;
      case '🎟️-pink-ticket':
      case 'photo-ticket':
      case 'photo-ticket-pink':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 96"><rect x="4" y="4" width="232" height="88" rx="4" fill="#F7C8D4" stroke="#B8657B" stroke-width="2"/><rect x="8" y="8" width="224" height="80" rx="2" fill="#FCE9EF" stroke="#DF93A7" stroke-width="1" stroke-dasharray="3 3"/><line x1="172" y1="8" x2="172" y2="88" stroke="#B8657B" stroke-width="1.5" stroke-dasharray="3 3"/><circle cx="4" cy="48" r="7" fill="#EAE4D9" stroke="#B8657B" stroke-width="1.5"/><circle cx="236" cy="48" r="7" fill="#EAE4D9" stroke="#B8657B" stroke-width="1.5"/><circle cx="172" cy="4" r="5" fill="#EAE4D9" stroke="#B8657B" stroke-width="1.5"/><circle cx="172" cy="92" r="5" fill="#EAE4D9" stroke="#B8657B" stroke-width="1.5"/><text x="20" y="32" fill="#3D2329" font-size="16" font-family="'Playfair Display', serif" font-weight="900" letter-spacing="0.08em">PHOTO</text><text x="20" y="48" fill="#3D2329" font-size="16" font-family="'Playfair Display', serif" font-weight="900" letter-spacing="0.08em">TICKET</text><text x="20" y="20" fill="#8C5362" font-size="5.5" font-family="monospace">TEL: 021-9344</text><rect x="20" y="55" width="140" height="22" fill="#FFFFFF" stroke="#B8657B" stroke-width="1"/><line x1="52" y1="55" x2="52" y2="77" stroke="#B8657B" stroke-width="1"/><line x1="90" y1="55" x2="90" y2="77" stroke="#B8657B" stroke-width="1"/><line x1="122" y1="55" x2="122" y2="77" stroke="#B8657B" stroke-width="1"/><text x="25" y="64" fill="#6B3846" font-size="6" font-family="sans-serif" font-weight="600">Day</text><text x="56" y="64" fill="#6B3846" font-size="6" font-family="sans-serif" font-weight="600">Month</text><text x="94" y="64" fill="#6B3846" font-size="6" font-family="sans-serif" font-weight="600">Year</text><text x="124" y="64" fill="#6B3846" font-size="5" font-family="sans-serif" font-weight="600">Expiration</text><text x="20" y="85" fill="#8C5362" font-size="6" font-family="monospace" font-weight="bold">No. 009324</text><text x="180" y="20" fill="#8C5362" font-size="5" font-family="monospace">TEL: 021-9344</text><text x="202" y="40" fill="#3D2329" font-size="13" font-family="'Playfair Display', serif" font-weight="900" text-anchor="middle">DAY</text><text x="202" y="54" fill="#3D2329" font-size="13" font-family="'Playfair Display', serif" font-weight="900" text-anchor="middle">PASS</text><line x1="182" y1="62" x2="222" y2="62" stroke="#B8657B" stroke-width="0.8"/><text x="182" y="70" fill="#6B3846" font-size="5.5" font-family="sans-serif">For_Month_Year</text><text x="182" y="84" fill="#8C5362" font-size="5" font-family="monospace">No. 009324</text></svg>`;
      case '♥-maroon':
      case 'heart-maroon':
      case 'heart-watercolor':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M32 54C32 54 8 36 8 21C8 12.5 15.5 7 23 7C27.8 7 30.8 9.5 32 12C33.2 9.5 36.2 7 41 7C48.5 7 56 12.5 56 21C56 36 32 54 32 54Z" fill="#8C2635" opacity="0.9"/><path d="M26 16C21 11 14 14 14 21C14 29 25 38 28 41" stroke="#A93244" stroke-width="2.5" stroke-linecap="round" opacity="0.5"/><circle cx="20" cy="18" r="2" fill="#FFFFFF" opacity="0.4"/></svg>`;
      case 'tag-curious':
      case 'the-curious':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 90"><path d="M60 22C52 12 40 16 45 26C50 34 60 22 60 22Z" fill="none" stroke="#2C2219" stroke-width="2.5"/><path d="M60 22C68 12 80 16 75 26C70 34 60 22 60 22Z" fill="none" stroke="#2C2219" stroke-width="2.5"/><circle cx="60" cy="22" r="3" fill="#2C2219"/><path d="M57 24L48 38" stroke="#2C2219" stroke-width="2" stroke-linecap="round"/><path d="M63 24L72 38" stroke="#2C2219" stroke-width="2" stroke-linecap="round"/><ellipse cx="60" cy="56" rx="46" ry="24" fill="#FAF5ED" stroke="#B8A388" stroke-width="2"/><ellipse cx="60" cy="56" rx="42" ry="20" fill="#FFFDF9" stroke="#D8C8B0" stroke-width="1" stroke-dasharray="3 2"/><text x="60" y="55" fill="#8C2D38" font-size="12" font-family="cursive" font-weight="bold" font-style="italic" text-anchor="middle">the</text><text x="60" y="67" fill="#8C2D38" font-size="15" font-family="cursive" font-weight="bold" font-style="italic" text-anchor="middle">curious!</text></svg>`;
      case 'movie-film-reel':
      case 'film-clapper':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 80"><rect x="25" y="42" width="75" height="28" rx="3" fill="#FAF5ED" stroke="#4A3324" stroke-width="2" transform="rotate(-6 25 42)"/><line x1="28" y1="48" x2="98" y2="40" stroke="#4A3324" stroke-width="1" stroke-dasharray="4 3"/><line x1="28" y1="64" x2="98" y2="56" stroke="#4A3324" stroke-width="1" stroke-dasharray="4 3"/><circle cx="34" cy="40" r="22" fill="#5C3E2D" stroke="#2C1D14" stroke-width="2.5"/><circle cx="34" cy="40" r="16" fill="#FAF5ED" stroke="#4A3324" stroke-width="1.5"/><circle cx="34" cy="40" r="6" fill="#2C1D14"/><circle cx="34" cy="29" r="3.5" fill="#5C3E2D"/><circle cx="34" cy="51" r="3.5" fill="#5C3E2D"/><circle cx="23" cy="40" r="3.5" fill="#5C3E2D"/><circle cx="45" cy="40" r="3.5" fill="#5C3E2D"/></svg>`;
      case '3d-star-gold':
      case 'star-3d':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="starG1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#FFFFFF"/><stop offset="50%" stop-color="#E6D3B8"/><stop offset="100%" stop-color="#B8976C"/></linearGradient></defs><path d="M32 4L37 27L60 32L37 37L32 60L27 37L4 32L27 27Z" fill="url(#starG1)" stroke="#8C684D" stroke-width="1.5"/><path d="M32 4L32 60" stroke="#FFFFFF" stroke-width="1" opacity="0.6"/><path d="M4 32L60 32" stroke="#FFFFFF" stroke-width="1" opacity="0.6"/></svg>`;
      case 'exclamation-pink':
      case 'badge-exclamation':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 64"><rect x="2" y="2" width="28" height="60" rx="14" fill="#E63956" stroke="#FFFFFF" stroke-width="2.5"/><rect x="13" y="12" width="6" height="24" rx="3" fill="#FFFFFF"/><circle cx="16" cy="46" r="3.5" fill="#FFFFFF"/></svg>`;
      case 'cinema-barcode':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 60"><text x="50" y="14" fill="#3E271E" font-size="7" font-family="sans-serif" font-weight="bold" text-anchor="middle">Caramel Click</text><text x="50" y="22" fill="#8C684D" font-size="5" font-family="sans-serif" text-anchor="middle">CINEMA PASS</text><rect x="10" y="28" width="4" height="22" fill="#2C1D14"/><rect x="17" y="28" width="2" height="22" fill="#2C1D14"/><rect x="22" y="28" width="5" height="22" fill="#2C1D14"/><rect x="30" y="28" width="2" height="22" fill="#2C1D14"/><rect x="35" y="28" width="6" height="22" fill="#2C1D14"/><rect x="44" y="28" width="2" height="22" fill="#2C1D14"/><rect x="49" y="28" width="4" height="22" fill="#2C1D14"/><rect x="56" y="28" width="3" height="22" fill="#2C1D14"/><rect x="62" y="28" width="6" height="22" fill="#2C1D14"/><rect x="71" y="28" width="2" height="22" fill="#2C1D14"/><rect x="76" y="28" width="4" height="22" fill="#2C1D14"/><rect x="83" y="28" width="3" height="22" fill="#2C1D14"/><rect x="89" y="28" width="2" height="22" fill="#2C1D14"/><text x="50" y="56" fill="#8C684D" font-size="4.5" font-family="monospace" text-anchor="middle">№ 7492019-A</text></svg>`;
      case 'sun-tarot':
      case 'tarot-sun':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 110"><rect x="2" y="2" width="66" height="106" rx="6" fill="#FCE4EC" stroke="#C97A8E" stroke-width="2"/><rect x="5" y="5" width="60" height="100" rx="3" fill="#FFF5F7" stroke="#E598AC" stroke-width="1"/><circle cx="35" cy="40" r="14" fill="#FFB703" stroke="#FB8500" stroke-width="1.5"/><circle cx="31" cy="38" r="1.5" fill="#2C1D14"/><circle cx="39" cy="38" r="1.5" fill="#2C1D14"/><path d="M31 43C33 45 37 45 39 43" stroke="#2C1D14" stroke-width="1" stroke-linecap="round"/><path d="M35 20L35 23M35 57L35 60M17 40L20 40M50 40L53 40M22 27L25 30M45 50L48 53M22 53L25 50M45 30L48 27" stroke="#FFB703" stroke-width="2" stroke-linecap="round"/><ellipse cx="26" cy="63" rx="12" ry="6" fill="#F8BBD0"/><ellipse cx="44" cy="63" rx="12" ry="6" fill="#F48FB1"/><ellipse cx="35" cy="66" rx="16" ry="7" fill="#F06292"/><text x="35" y="93" fill="#880E4F" font-size="7.5" font-family="'Playfair Display', serif" font-weight="bold" letter-spacing="0.08em" text-anchor="middle">THE SUN</text></svg>`;
      case 'pink-lily':
      case 'flower-lily':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><path d="M40 6C50 18 70 26 74 40C70 54 50 62 40 74C30 62 10 54 6 40C10 26 30 18 40 6Z" fill="#FFFFFF" stroke="#F8BBD0" stroke-width="3.5"/><path d="M40 12C46 23 60 30 66 40C60 50 46 57 40 68C34 57 20 50 14 40C20 30 34 23 40 12Z" fill="#F48FB1"/><path d="M22 22C34 32 40 45 40 66C40 45 46 32 58 22C46 30 34 30 22 22Z" fill="#EC407A" opacity="0.65"/><circle cx="40" cy="40" r="4" fill="#FFF59D"/><circle cx="40" cy="32" r="2" fill="#AD1457"/><circle cx="48" cy="36" r="2" fill="#AD1457"/><circle cx="46" cy="46" r="2" fill="#AD1457"/><circle cx="34" cy="46" r="2" fill="#AD1457"/><circle cx="32" cy="36" r="2" fill="#AD1457"/></svg>`;
      case 'cherub-angel':
      case 'angel-statue':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 75"><path d="M15 35C5 20 20 10 32 22C24 28 18 32 15 35Z" fill="#EDE7F6" stroke="#D1C4E9" stroke-width="1.5"/><path d="M75 35C85 20 70 10 58 22C66 28 72 32 75 35Z" fill="#EDE7F6" stroke="#D1C4E9" stroke-width="1.5"/><circle cx="45" cy="30" r="16" fill="#F5F5F5" stroke="#D7CCC8" stroke-width="1.5"/><circle cx="45" cy="20" r="13" fill="#FFFFFF" stroke="#BCAAA4" stroke-width="1.5"/><circle cx="38" cy="12" r="5" fill="#EFEBE9"/><circle cx="45" cy="10" r="5" fill="#EFEBE9"/><circle cx="52" cy="12" r="5" fill="#EFEBE9"/><ellipse cx="40" cy="20" rx="1.5" ry="1" fill="#8D6E63"/><ellipse cx="50" cy="20" rx="1.5" ry="1" fill="#8D6E63"/><path d="M43 25C44 26 46 26 47 25" stroke="#8D6E63" stroke-width="1" stroke-linecap="round"/><ellipse cx="45" cy="46" rx="18" ry="10" fill="#FFFFFF" stroke="#D7CCC8" stroke-width="1.5"/></svg>`;
      case 'butterfly-pink':
      case 'butterfly-3d':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 75"><defs><linearGradient id="bfG2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#F8BBD0"/><stop offset="60%" stop-color="#EC407A"/><stop offset="100%" stop-color="#AD1457"/></linearGradient></defs><path d="M45 42C30 18 5 28 15 50C25 65 42 48 45 42Z" fill="url(#bfG2)" stroke="#880E4F" stroke-width="1.5"/><path d="M45 42C60 18 85 28 75 50C65 65 48 48 45 42Z" fill="url(#bfG2)" stroke="#880E4F" stroke-width="1.5"/><path d="M45 46C34 50 20 65 32 72C42 75 45 52 45 46Z" fill="#C2185B" stroke="#880E4F" stroke-width="1.5"/><path d="M45 46C56 50 70 65 58 72C48 75 45 52 45 46Z" fill="#C2185B" stroke="#880E4F" stroke-width="1.5"/><line x1="45" y1="28" x2="45" y2="60" stroke="#2C1D14" stroke-width="3.5" stroke-linecap="round"/></svg>`;
      case 'doodle-sparkle-white':
      case 'sparkle-doodle':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M32 6C32 20 44 32 58 32C44 32 32 44 32 58C32 44 20 32 6 32C20 32 32 20 32 6Z" fill="#FFFFFF" stroke="rgba(0,0,0,0.2)" stroke-width="1.5"/><circle cx="48" cy="16" r="3" fill="#FFFFFF"/><circle cx="16" cy="48" r="2.5" fill="#FFFFFF"/></svg>`;
      case 'teddy-bucket-hat':
      case '🧸-hat':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><filter id="tds"><feDropShadow dx="0" dy="4" stdDeviation="3" flood-opacity="0.35"/></filter></defs><g filter="url(#tds)"><circle cx="26" cy="38" r="10" fill="#F4E8D8" stroke="#8C6E54" stroke-width="2"/><circle cx="74" cy="38" r="10" fill="#F4E8D8" stroke="#8C6E54" stroke-width="2"/><circle cx="26" cy="38" r="5" fill="#FFB6C1"/><circle cx="74" cy="38" r="5" fill="#FFB6C1"/><ellipse cx="50" cy="56" rx="28" ry="26" fill="#FAF6F0" stroke="#8C6E54" stroke-width="2.5"/><circle cx="40" cy="54" r="3.5" fill="#2C1D14"/><circle cx="60" cy="54" r="3.5" fill="#2C1D14"/><circle cx="39" cy="52" r="1" fill="#FFF"/><circle cx="59" cy="52" r="1" fill="#FFF"/><ellipse cx="50" cy="62" rx="7" ry="5.5" fill="#E8DFD1"/><polygon points="50,60 47,63 53,63" fill="#3D2619"/><ellipse cx="33" cy="62" rx="4.5" ry="3" fill="#FFAEC9" opacity="0.6"/><ellipse cx="67" cy="62" rx="4.5" ry="3" fill="#FFAEC9" opacity="0.6"/><path d="M22 34 Q50 20 78 34 L82 40 Q50 32 18 40 Z" fill="#FFAEC9" stroke="#D1607B" stroke-width="2"/><path d="M28 32 Q50 14 72 32 L70 24 Q50 16 30 24 Z" fill="#FFC0CB" stroke="#D1607B" stroke-width="2"/><ellipse cx="50" cy="78" rx="22" ry="18" fill="#FAF6F0" stroke="#8C6E54" stroke-width="2"/><rect x="42" y="74" width="16" height="18" rx="3" fill="#E67E22" stroke="#B95C0E" stroke-width="1.5"/><ellipse cx="26" cy="80" rx="6" ry="10" fill="#FAF6F0" stroke="#8C6E54" stroke-width="2"/><ellipse cx="74" cy="80" rx="6" ry="10" fill="#FAF6F0" stroke="#8C6E54" stroke-width="2"/></g></svg>`;
      case 'red-scarf':
      case '🧣-taylor':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 110"><defs><filter id="scs"><feDropShadow dx="0" dy="4" stdDeviation="3" flood-opacity="0.35"/></filter></defs><g filter="url(#scs)"><path d="M24 24 Q55 8 86 24 L80 44 Q55 30 30 44 Z" fill="#800020" stroke="#520014" stroke-width="2.5"/><path d="M30 44 L20 86 Q32 90 44 86 L40 44 Z" fill="#990026" stroke="#520014" stroke-width="2.5"/><path d="M20 86 L18 96 M24 86 L22 96 M30 87 L28 97 M36 86 L34 96 M42 85 L40 95" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/><text x="26" y="60" fill="#FFFFFF" font-size="7" font-family="'Caveat', cursive, serif" font-style="italic" transform="rotate(-72 26 60)">I remember it</text><text x="32" y="64" fill="#FFFFFF" font-size="7" font-family="'Caveat', cursive, serif" font-style="italic" transform="rotate(-72 32 64)">all too well ♡</text></g></svg>`;
      case 'london-phone':
      case '☎️-london':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 140"><defs><filter id="lps"><feDropShadow dx="0" dy="4" stdDeviation="3" flood-opacity="0.35"/></filter></defs><g filter="url(#lps)"><rect x="12" y="10" width="56" height="120" rx="10" fill="#C9182B" stroke="#7A0E1A" stroke-width="3"/><rect x="14" y="8" width="52" height="16" rx="8" fill="#A81222"/><rect x="20" y="18" width="40" height="9" rx="2" fill="#FAF5ED" stroke="#7A0E1A" stroke-width="1.2"/><text x="40" y="25" fill="#7A0E1A" font-size="5" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" text-anchor="middle" letter-spacing="1">TELEPHONE</text><rect x="18" y="32" width="44" height="90" rx="3" fill="#1C1412" stroke="#7A0E1A" stroke-width="2"/><g fill="#FAF5ED" opacity="0.85"><rect x="21" y="36" width="10" height="16" rx="1"/><rect x="35" y="36" width="10" height="16" rx="1"/><rect x="49" y="36" width="10" height="16" rx="1"/><rect x="21" y="56" width="10" height="16" rx="1"/><rect x="35" y="56" width="10" height="16" rx="1"/><rect x="49" y="56" width="10" height="16" rx="1"/><rect x="21" y="76" width="10" height="16" rx="1"/><rect x="35" y="76" width="10" height="16" rx="1"/><rect x="49" y="76" width="10" height="16" rx="1"/><rect x="21" y="96" width="10" height="20" rx="1"/><rect x="35" y="96" width="10" height="20" rx="1"/><rect x="49" y="96" width="10" height="20" rx="1"/></g></g></svg>`;
      case 'love-typewriter':
      case 'you-i-truly-love':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 85"><defs><filter id="lts"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-opacity="0.3"/></filter></defs><g filter="url(#lts)"><rect x="6" y="6" width="128" height="72" rx="4" fill="#FDFBF7" stroke="#D1C2A5" stroke-width="2"/><text x="14" y="24" fill="#6B4226" font-size="10" font-family="'Courier New', monospace" font-weight="bold">you.</text><text x="14" y="42" fill="#6B4226" font-size="9" font-family="'Courier New', monospace" font-weight="bold">I truly love you,</text><text x="14" y="58" fill="#6B4226" font-size="9" font-family="'Courier New', monospace" font-weight="bold">with all my</text><text x="14" y="72" fill="#800020" font-size="10" font-family="'Courier New', monospace" font-weight="bold">heart."</text><path d="M96 22 Q102 14 108 22 Q108 30 96 38 Q84 30 84 22 Q90 14 96 22 Z" fill="#800020" opacity="0.85" transform="scale(0.5) translate(80, 20)"/><path d="M120 48 Q126 40 132 48 Q132 56 120 64 Q108 56 108 48 Q114 40 120 48 Z" fill="#800020" opacity="0.85" transform="scale(0.4) translate(140, 60)"/></g></svg>`;
      case 'glitter-star-red':
      case '⭐-red':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><defs><radialGradient id="rg" cx="40" cy="40" r="38" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#E60039"/><stop offset="60%" stop-color="#990026"/><stop offset="100%" stop-color="#5E0017"/></radialGradient></defs><polygon points="40,4 51,27 76,30 57,47 62,72 40,59 18,72 23,47 4,30 29,27" fill="url(#rg)" stroke="#FFFFFF" stroke-width="2.5"/><circle cx="34" cy="30" r="1.5" fill="#FFF"/><circle cx="46" cy="24" r="1.5" fill="#FFF"/><circle cx="42" cy="44" r="1.5" fill="#FFF"/><circle cx="28" cy="46" r="1.5" fill="#FFF"/><circle cx="52" cy="48" r="1.5" fill="#FFF"/></svg>`;
      case 'great-wave':
      case '🌊-kanagawa':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 90"><path d="M8 82 Q30 40 60 70 Q75 30 95 40 Q105 45 106 82 Z" fill="#0C4A6E" stroke="#082F49" stroke-width="2.5"/><path d="M12 82 Q34 46 62 72 Q78 38 98 46 L104 82 Z" fill="#0284C7"/><path d="M60 70 Q75 30 95 40 Q88 34 80 36 Q84 28 92 30" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/><circle cx="76" cy="28" r="2.5" fill="#FFF"/><circle cx="85" cy="22" r="2" fill="#FFF"/><circle cx="94" cy="26" r="2.5" fill="#FFF"/><circle cx="100" cy="34" r="2" fill="#FFF"/><path d="M8 82 Q30 50 50 68" fill="none" stroke="#BAE6FD" stroke-width="2"/></svg>`;
      case 'area-photobox':
      case 'seal-area':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90"><circle cx="45" cy="45" r="40" fill="#FFFFFF" stroke="#1E3A8A" stroke-width="2.5"/><circle cx="45" cy="45" r="36" fill="none" stroke="#1E3A8A" stroke-width="1" stroke-dasharray="3 2"/><text x="45" y="38" fill="#1E3A8A" font-size="15" font-family="'Caveat', cursive, serif" font-weight="bold" font-style="italic" text-anchor="middle">Area</text><text x="45" y="52" fill="#1E3A8A" font-size="7" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" letter-spacing="1.5" text-anchor="middle">PHOTO BOX</text><polygon points="45,18 47,23 52,23 48,26 50,31 45,28 40,31 42,26 38,23 43,23" fill="#1E3A8A"/><polygon points="45,64 47,69 52,69 48,72 50,77 45,74 40,77 42,72 38,69 43,69" fill="#1E3A8A"/></svg>`;
      case 'starfish-blue':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 70"><polygon points="35,4 43,26 66,27 48,41 54,64 35,50 16,64 22,41 4,27 27,26" fill="#0284C7" stroke="#0369A1" stroke-width="2"/><circle cx="35" cy="35" r="3" fill="#BAE6FD"/><circle cx="35" cy="18" r="1.5" fill="#FFF"/><circle cx="50" cy="30" r="1.5" fill="#FFF"/><circle cx="45" cy="48" r="1.5" fill="#FFF"/><circle cx="25" cy="48" r="1.5" fill="#FFF"/><circle cx="20" cy="30" r="1.5" fill="#FFF"/></svg>`;
      case 'starfish-white':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 70"><polygon points="35,4 43,26 66,27 48,41 54,64 35,50 16,64 22,41 4,27 27,26" fill="#FDFBF7" stroke="#CBD5E1" stroke-width="2"/><circle cx="35" cy="35" r="3" fill="#94A3B8"/></svg>`;
      case 'ribbon-blue':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 70"><path d="M35 30 C20 16 6 22 14 36 C22 50 35 30 35 30 Z" fill="#1E3A8A" stroke="#0F172A" stroke-width="2"/><path d="M35 30 C50 16 64 22 56 36 C48 50 35 30 35 30 Z" fill="#1E3A8A" stroke="#0F172A" stroke-width="2"/><circle cx="35" cy="32" r="6" fill="#3B82F6" stroke="#0F172A" stroke-width="2"/><path d="M30 34 L18 60 L28 56 L34 40 Z" fill="#1E40AF" stroke="#0F172A" stroke-width="1.5"/><path d="M40 34 L52 60 L42 56 L36 40 Z" fill="#1E40AF" stroke="#0F172A" stroke-width="1.5"/></svg>`;
      default:
        return null;
    }
  }

  /**
   * Helper to draw rounded rectangle paths
   */
  private static roundRectPath(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
  ): void {
    const radius = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + w, y, x + w, y + h, radius);
    ctx.arcTo(x + w, y + h, x, y + h, radius);
    ctx.arcTo(x, y + h, x, y, radius);
    ctx.arcTo(x, y, x + w, y, radius);
    ctx.closePath();
  }

  /**
   * Helper to draw arch shaped paths
   */
  private static archPath(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
  ): void {
    ctx.beginPath();
    ctx.moveTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h);
    ctx.lineTo(x, y + h);
    ctx.closePath();
  }

  /**
   * 📰 Render Ransom Note / Magazine Cutout Collage Title (e.g. "HELLO")
   */
  private static drawRansomTitle(
    ctx: CanvasRenderingContext2D,
    title: string,
    centerX: number,
    centerY: number,
    baseWidth: number
  ): void {
    ctx.save();
    const letters = title.split('');
    const boxSize = Math.max(34, baseWidth * 0.088);
    const spacing = boxSize * 1.08;
    const startX = centerX - ((letters.length - 1) * spacing) / 2;

    const bgColors = ['#1E3A8A', '#2D6A4F', '#D97706', '#0F766E', '#18181B', '#800020', '#C2410C'];
    const textColors = ['#FFFFFF', '#FFFFFF', '#18181B', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'];

    letters.forEach((char, i) => {
      const bx = startX + i * spacing;
      const by = centerY;
      const angle = ((i % 2 === 0 ? -1 : 1) * ((i * 3) % 7 + 2) * Math.PI) / 180;

      ctx.save();
      ctx.translate(bx, by);
      ctx.rotate(angle);

      // Paper cutout drop shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.38)';
      ctx.shadowBlur = 8;
      ctx.shadowOffsetY = 3;

      // Cutout rectangular paper block
      ctx.fillStyle = bgColors[i % bgColors.length];
      const padW = boxSize * 0.94;
      const padH = boxSize * 1.15;
      ctx.fillRect(-padW / 2, -padH / 2, padW, padH);

      // Inner subtle paper border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(-padW / 2 + 2, -padH / 2 + 2, padW - 4, padH - 4);

      // Bold magazine cutout typography
      ctx.shadowColor = 'transparent';
      ctx.fillStyle = textColors[i % textColors.length];
      ctx.font = `900 ${Math.round(boxSize * 0.72)}px "Playfair Display", "Plus Jakarta Sans", impact, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(char, 0, 0);

      ctx.restore();
    });

    ctx.restore();
  }

  /**
   * 🏷️ Render Distressed Vintage Stamp Title (e.g. "dump")
   */
  private static drawStampTitle(
    ctx: CanvasRenderingContext2D,
    title: string,
    centerX: number,
    centerY: number,
    baseWidth: number,
    color: string = '#800020'
  ): void {
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.shadowColor = 'rgba(0, 0, 0, 0.22)';
    ctx.shadowBlur = 6;
    ctx.shadowOffsetY = 2;
    ctx.fillStyle = color;
    ctx.font = `900 ${Math.round(baseWidth * 0.11)}px "Playfair Display", Georgia, serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(title, 0, 0);
    ctx.restore();
  }

  /**
   * Render complete high-resolution final canvas output
   */
  static async renderFullCanvas(
    canvas: HTMLCanvasElement,
    template: TemplateData,
    capturedPhotos: string[],
    options: RenderCanvasOptions = {}
  ): Promise<string> {
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    const width = template.canvasWidth;
    const height = template.canvasHeight;
    canvas.width = width;
    canvas.height = height;

    const bgColor = options.backgroundColor || template.backgroundColor;
    const bgTexture = options.backgroundTexture !== undefined ? options.backgroundTexture : template.backgroundTexture;
    const filter = options.filter || 'original';
    const customTexts = options.customTexts || {};
    const stickers = options.placedStickers || [];

    // 1. Draw Base Background Layer (or Custom Backdrop Image)
    ctx.save();
    if (options.customBackdropUrl) {
      try {
        const bgImg = await this.loadImage(options.customBackdropUrl);
        const imgRatio = bgImg.width / bgImg.height;
        const canvasRatio = width / height;
        let dw = width;
        let dh = height;
        let dx = 0;
        let dy = 0;
        if (imgRatio > canvasRatio) {
          dh = height;
          dw = height * imgRatio;
          dx = (width - dw) / 2;
        } else {
          dw = width;
          dh = width / imgRatio;
          dy = (height - dh) / 2;
        }
        ctx.drawImage(bgImg, dx, dy, dw, dh);
      } catch (err) {
        console.warn('Failed to load custom backdrop image, falling back to background color:', err);
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, width, height);
      }
    } else if (template.backgroundGradient && template.backgroundGradient !== 'none') {
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, bgColor);
      grad.addColorStop(1, template.accentColor ? template.accentColor + '44' : '#00000044');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    } else {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);
    }
    ctx.restore();

    // 1b. Draw High-Impact Tactile Physical Texture Overlays
    if (bgTexture === 'dots') {
      ctx.save();
      ctx.fillStyle = template.accentColor ? template.accentColor + '66' : 'rgba(255, 255, 255, 0.45)';
      const step = Math.round(width * 0.045);
      const r = Math.max(3, width * 0.007);
      for (let x = step / 2; x < width; x += step) {
        for (let y = step / 2; y < height; y += step) {
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    } else if (bgTexture === 'grid') {
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = Math.max(1.5, width * 0.0025);
      const gridStep = Math.round(width * 0.055);
      for (let x = 0; x < width; x += gridStep) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += gridStep) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }
      ctx.restore();
    } else if (bgTexture === 'gingham' || bgTexture === 'gingham-red') {
      ctx.save();
      ctx.fillStyle = bgTexture === 'gingham-red' ? 'rgba(217, 4, 41, 0.25)' : 'rgba(255, 255, 255, 0.35)';
      const gStep = Math.round(width * 0.07);
      for (let x = 0; x < width; x += gStep * 2) {
        ctx.fillRect(x, 0, gStep, height);
      }
      for (let y = 0; y < height; y += gStep * 2) {
        ctx.fillRect(0, y, width, gStep);
      }
      ctx.restore();
    } else if (bgTexture === 'paper' || bgTexture === 'vintage-paper') {
      ctx.save();
      // Warm antique parchment wash & burned aged edges
      ctx.fillStyle = 'rgba(217, 185, 143, 0.22)';
      ctx.fillRect(0, 0, width, height);

      const radGrad = ctx.createRadialGradient(
        width / 2, height / 2, Math.min(width, height) * 0.35,
        width / 2, height / 2, Math.max(width, height) * 0.72
      );
      radGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
      radGrad.addColorStop(1, 'rgba(92, 53, 20, 0.28)');
      ctx.fillStyle = radGrad;
      ctx.fillRect(0, 0, width, height);

      // Distressed horizontal aged paper pulp ridges
      for (let y = 0; y < height; y += Math.round(width * 0.015)) {
        ctx.fillStyle = (y % 2 === 0) ? 'rgba(100, 60, 20, 0.08)' : 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(0, y, width, 2);
      }

      // Organic tea stains & speckles
      for (let i = 0; i < 500; i++) {
        const sx = Math.random() * width;
        const sy = Math.random() * height;
        const sr = Math.random() * 2.5 + 0.8;
        ctx.fillStyle = Math.random() > 0.4 ? 'rgba(78, 46, 20, 0.15)' : 'rgba(255, 245, 230, 0.25)';
        ctx.beginPath();
        ctx.arc(sx, sy, sr, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    } else if (bgTexture === 'film-grain') {
      ctx.save();
      // Rich analog film grain
      for (let i = 0; i < 7000; i++) {
        const rx = Math.random() * width;
        const ry = Math.random() * height;
        const sz = Math.random() * (width * 0.003) + 1;
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.22)';
        ctx.fillRect(rx, ry, sz, sz);
      }
      ctx.restore();
    } else if (bgTexture === 'wood') {
      ctx.save();
      ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
      for (let x = 0; x < width; x += Math.round(width * 0.02)) {
        ctx.fillRect(x, 0, Math.max(2, width * 0.005), height);
      }
      // Inner Cream Scalloped Card
      const cardX = width * 0.04;
      const cardY = height * 0.04;
      const cardW = width * 0.92;
      const cardH = height * 0.92;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
      ctx.shadowBlur = width * 0.03;
      ctx.fillStyle = '#EBE0CA';
      this.roundRectPath(ctx, cardX, cardY, cardW, cardH, 16);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = '#B8A388';
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 8]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    } else if (bgTexture === 'matte') {
      ctx.save();
      // Velvety soft matte paper with tactile tooth
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
      ctx.fillRect(0, 0, width, height);
      // High-density organic stipple grain
      for (let i = 0; i < 9000; i++) {
        const rx = Math.random() * width;
        const ry = Math.random() * height;
        const sz = Math.random() * (width * 0.0035) + 1;
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.18)' : 'rgba(30, 20, 10, 0.12)';
        ctx.fillRect(rx, ry, sz, sz);
      }
      ctx.restore();
    } else if (bgTexture === 'polaroid-gloss') {
      ctx.save();
      // Premium resin-coated gloss sheen
      const glossGrad = ctx.createLinearGradient(0, 0, width * 0.7, height);
      glossGrad.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
      glossGrad.addColorStop(0.25, 'rgba(255, 255, 255, 0.12)');
      glossGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
      glossGrad.addColorStop(0.8, 'rgba(0, 0, 0, 0.05)');
      glossGrad.addColorStop(1, 'rgba(0, 0, 0, 0.22)');
      ctx.fillStyle = glossGrad;
      ctx.fillRect(0, 0, width, height);

      // Specular reflection diagonal band
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.lineWidth = Math.max(12, width * 0.04);
      ctx.beginPath();
      ctx.moveTo(-width * 0.1, height * 0.4);
      ctx.lineTo(width * 0.9, -height * 0.1);
      ctx.stroke();
      ctx.restore();
    } else if (bgTexture === 'linen') {
      ctx.save();
      // True woven textile cross-hatch fibers
      const lStep = Math.max(4, Math.round(width * 0.01));
      ctx.lineWidth = 1.2;
      for (let x = 0; x < width; x += lStep) {
        ctx.strokeStyle = x % (lStep * 2) === 0 ? 'rgba(255, 255, 255, 0.22)' : 'rgba(0, 0, 0, 0.12)';
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += lStep) {
        ctx.strokeStyle = y % (lStep * 2) === 0 ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)';
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      // Micro fiber flecks
      for (let i = 0; i < 350; i++) {
        const fx = Math.random() * width;
        const fy = Math.random() * height;
        const fLen = Math.random() * 8 + 3;
        const angle = Math.random() * Math.PI;
        ctx.strokeStyle = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.35)' : 'rgba(60, 40, 30, 0.2)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(fx, fy);
        ctx.lineTo(fx + Math.cos(angle) * fLen, fy + Math.sin(angle) * fLen);
        ctx.stroke();
      }
      ctx.restore();
    } else if (bgTexture === 'holographic') {
      ctx.save();
      const holoGrad = ctx.createLinearGradient(0, 0, width, height);
      holoGrad.addColorStop(0, 'rgba(255, 105, 180, 0.35)');
      holoGrad.addColorStop(0.2, 'rgba(138, 43, 226, 0.3)');
      holoGrad.addColorStop(0.4, 'rgba(0, 191, 255, 0.35)');
      holoGrad.addColorStop(0.6, 'rgba(0, 250, 154, 0.3)');
      holoGrad.addColorStop(0.8, 'rgba(255, 215, 0, 0.35)');
      holoGrad.addColorStop(1, 'rgba(255, 69, 0, 0.3)');
      ctx.fillStyle = holoGrad;
      ctx.fillRect(0, 0, width, height);

      // Iridescent light flare beam
      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.rotate((-35 * Math.PI) / 180);
      const beamGrad = ctx.createLinearGradient(-width, 0, width, 0);
      beamGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      beamGrad.addColorStop(0.48, 'rgba(255, 255, 255, 0.55)');
      beamGrad.addColorStop(0.52, 'rgba(255, 255, 255, 0.55)');
      beamGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = beamGrad;
      ctx.fillRect(-width, -height, width * 2, height * 2);
      ctx.restore();
      ctx.restore();
    } else if (bgTexture === 'cable-knit') {
      // 🧶 Cozy Cable Knit Sweater Wool Texture (Autumn Nakatama Theme)
      ctx.save();
      ctx.fillStyle = '#F5EFE6';
      ctx.fillRect(0, 0, width, height);

      const colWidth = width * 0.12;
      const totalCols = Math.ceil(width / colWidth);

      for (let c = 0; c < totalCols; c++) {
        const colX = c * colWidth;

        // Vertical rib groove shadow
        ctx.strokeStyle = 'rgba(160, 140, 120, 0.22)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(colX, 0);
        ctx.lineTo(colX, height);
        ctx.stroke();

        // Cable braid loops
        const stepY = colWidth * 0.7;
        const totalSteps = Math.ceil(height / stepY);

        for (let s = 0; s < totalSteps; s++) {
          const cy = s * stepY;
          ctx.save();
          ctx.translate(colX + colWidth / 2, cy);

          // Left cable braid curve
          ctx.strokeStyle = 'rgba(140, 115, 95, 0.25)';
          ctx.lineWidth = colWidth * 0.18;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(-colWidth * 0.35, -stepY * 0.35);
          ctx.bezierCurveTo(-colWidth * 0.1, -stepY * 0.1, colWidth * 0.2, stepY * 0.1, colWidth * 0.35, stepY * 0.35);
          ctx.stroke();

          // Highlight on cable strand
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.lineWidth = colWidth * 0.08;
          ctx.beginPath();
          ctx.moveTo(-colWidth * 0.3, -stepY * 0.3);
          ctx.bezierCurveTo(-colWidth * 0.08, -stepY * 0.08, colWidth * 0.18, stepY * 0.08, colWidth * 0.3, stepY * 0.3);
          ctx.stroke();

          ctx.restore();
        }
      }

      // Soft wool micro-grain fuzz
      for (let i = 0; i < 400; i++) {
        const rx = Math.random() * width;
        const ry = Math.random() * height;
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.35)' : 'rgba(150, 130, 110, 0.15)';
        ctx.beginPath();
        ctx.arc(rx, ry, Math.random() * 2 + 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    } else if (bgTexture === 'water-ripples') {
      // 🌊 Marine Ocean Water Ripples & Sea Surface (Ocean Nakatama Theme)
      ctx.save();
      // Linen sand paper base
      ctx.fillStyle = '#F3EFE6';
      ctx.fillRect(0, 0, width, height);

      // Top Ocean Wave Deep Band
      const topWaveGrad = ctx.createLinearGradient(0, 0, 0, height * 0.18);
      topWaveGrad.addColorStop(0, '#0C4A6E');
      topWaveGrad.addColorStop(0.65, '#0284C7');
      topWaveGrad.addColorStop(1, 'rgba(14, 165, 233, 0)');
      ctx.fillStyle = topWaveGrad;
      ctx.fillRect(0, 0, width, height * 0.18);

      // Bottom Ocean Deep Band
      const botWaveGrad = ctx.createLinearGradient(0, height * 0.82, 0, height);
      botWaveGrad.addColorStop(0, 'rgba(14, 165, 233, 0)');
      botWaveGrad.addColorStop(0.35, '#0284C7');
      botWaveGrad.addColorStop(1, '#0C4A6E');
      ctx.fillStyle = botWaveGrad;
      ctx.fillRect(0, height * 0.82, width, height * 0.18);

      // Caustic Water Light Ripples across the card
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.38)';
      ctx.lineWidth = 2.5;

      for (let i = 0; i < 18; i++) {
        const rx = (i % 3) * (width / 2.5) + (Math.random() * 40 - 20);
        const ry = Math.floor(i / 3) * (height / 6) + (Math.random() * 50 - 25);
        const rw = width * (0.15 + Math.random() * 0.12);
        const rh = height * (0.02 + Math.random() * 0.02);

        ctx.beginPath();
        ctx.ellipse(rx, ry, rw, rh, (Math.PI / 180) * (Math.random() * 20 - 10), 0, Math.PI * 2);
        ctx.stroke();
      }

      // Foamy white specks at top and bottom
      ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
      for (let j = 0; j < 60; j++) {
        const fx = Math.random() * width;
        const fy = j % 2 === 0 ? Math.random() * height * 0.14 : height * (0.86 + Math.random() * 0.14);
        ctx.beginPath();
        ctx.arc(fx, fy, Math.random() * 3 + 1, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    // 1c. Draw 35mm Film Strip Perforations & Frame Exposure Numbers in Canvas Output
    if (template.style === 'film-strip' || template.id.includes('film')) {
      ctx.save();
      const pWidth = width * 0.055;
      const pHeight = height * 0.014;
      const pLeft = width * 0.03;
      const pRight = width * 0.915;
      const count = 10;
      const startY = height * 0.04;
      const endY = height * 0.94;
      const stepY = (endY - startY) / (count - 1);

      for (let i = 0; i < count; i++) {
        const curY = startY + i * stepY;
        
        // Left Sprocket Hole
        this.roundRectPath(ctx, pLeft, curY, pWidth, pHeight, Math.max(2, width * 0.005));
        ctx.fillStyle = '#000000';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = Math.max(1, width * 0.0015);
        ctx.stroke();

        // Right Sprocket Hole
        this.roundRectPath(ctx, pRight, curY, pWidth, pHeight, Math.max(2, width * 0.005));
        ctx.fillStyle = '#000000';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = Math.max(1, width * 0.0015);
        ctx.stroke();
      }

      // Draw Gold 35mm Exposure Frame Numbers (▶ 01A, ▶ 02A, ▶ 03A, ▶ 04A)
      const numbers = ['▶ 01A', '▶ 02A', '▶ 03A', '▶ 04A'];
      const textX = width * 0.89;
      const fontPx = Math.round(width * 0.024);
      ctx.font = `700 ${fontPx}px monospace, Courier New, sans-serif`;
      ctx.fillStyle = template.accentColor || '#F59E0B';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';

      const numStartY = height * 0.14;
      const numEndY = height * 0.78;
      const numStepY = (numEndY - numStartY) / (numbers.length - 1);

      numbers.forEach((numText, idx) => {
        const numY = numStartY + idx * numStepY;
        ctx.fillText(numText, textX, numY);
      });

      ctx.restore();
    }

    // 1d. Draw Ticket Stub Dashed Cutout Line & Side Notches in Canvas Output
    if (template.style === 'ticket' || template.id.includes('ticket')) {
      ctx.save();
      ctx.strokeStyle = template.textColor || '#7A1C28';
      ctx.lineWidth = 3;
      ctx.setLineDash([12, 12]);
      const lineY = height * 0.88;

      ctx.beginPath();
      ctx.moveTo(width * 0.08, lineY);
      ctx.lineTo(width * 0.92, lineY);
      ctx.stroke();

      // Draw side notches
      ctx.fillStyle = template.backgroundColor || '#FFFDF9';
      ctx.beginPath();
      ctx.arc(0, lineY, width * 0.035, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(width, lineY, width * 0.035, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 1c. Render Vintage Newspaper Masthead Double Rules & Column Lines
    if (template.style === 'newspaper' || template.id.includes('newspaper')) {
      ctx.save();
      const ruleColor = template.textColor || '#1C1917';

      // Top Double Rules
      const lineYTop = height * 0.105;
      ctx.strokeStyle = ruleColor;
      ctx.lineWidth = Math.max(3, width * 0.005);
      ctx.beginPath();
      ctx.moveTo(width * 0.06, lineYTop - 3);
      ctx.lineTo(width * 0.94, lineYTop - 3);
      ctx.stroke();

      ctx.lineWidth = Math.max(1, width * 0.002);
      ctx.beginPath();
      ctx.moveTo(width * 0.06, lineYTop + 4);
      ctx.lineTo(width * 0.94, lineYTop + 4);
      ctx.stroke();

      // Bottom Gazette Editorial Line
      const lineYBottom = height * 0.925;
      ctx.lineWidth = Math.max(1, width * 0.002);
      ctx.beginPath();
      ctx.moveTo(width * 0.06, lineYBottom);
      ctx.lineTo(width * 0.94, lineYBottom);
      ctx.stroke();

      // Vertical Newsprint Column Margins
      ctx.strokeStyle = 'rgba(28, 25, 23, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(width * 0.05, height * 0.115);
      ctx.lineTo(width * 0.05, height * 0.92);
      ctx.moveTo(width * 0.95, height * 0.115);
      ctx.lineTo(width * 0.95, height * 0.92);
      ctx.stroke();
      ctx.restore();
    }

    // 1e. Render Scrapbook Title (Ransom Cutout "HELLO" or Vintage Stamp "dump")
    if (template.ransomTitle) {
      if (template.ransomTitle.toLowerCase() === 'dump') {
        this.drawStampTitle(ctx, template.ransomTitle, width / 2, height * 0.052, width, template.accentColor || '#800020');
      } else {
        this.drawRansomTitle(ctx, template.ransomTitle, width / 2, height * 0.055, width);
      }
    }

    // 2. Render Outer Border if specified
    if (template.frameBorderWidth && template.frameBorderWidth > 0) {
      ctx.save();
      ctx.lineWidth = template.frameBorderWidth * 2;
      ctx.strokeStyle = template.frameBorderColor;
      ctx.strokeRect(0, 0, width, height);
      ctx.restore();
    }

    // 3. Load & Render Captured Photos in Slots
    for (let index = 0; index < template.photoSlots.length; index++) {
      const slot = template.photoSlots[index];
      const photoSrc = capturedPhotos[index];

      const slotX = (slot.x / 100) * width;
      const slotY = (slot.y / 100) * height;
      const slotW = (slot.width / 100) * width;
      const slotH = (slot.height / 100) * height;

      ctx.save();
      ctx.translate(slotX + slotW / 2, slotY + slotH / 2);
      if (slot.rotation) {
        ctx.rotate((slot.rotation * Math.PI) / 180);
      }

      // --- POLAROID FRAME WRAPPER rendering in Canvas ---
      if (slot.frameStyle === 'polaroid') {
        const outerW = slotW;
        const outerH = slotH;
        const outerX = -outerW / 2;
        const outerY = -outerH / 2;

        // Draw Polaroid Drop Shadow
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowBlur = width * 0.03;
        ctx.shadowOffsetY = height * 0.015;

        // Draw Polaroid White Card Body
        ctx.fillStyle = '#ffffff';
        this.roundRectPath(ctx, outerX, outerY, outerW, outerH, 8);
        ctx.fill();
        ctx.restore();

        // Draw Tape Detail at top left corner of polaroid
        ctx.save();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.shadowColor = 'rgba(0,0,0,0.1)';
        ctx.shadowBlur = 4;
        ctx.translate(outerX + 16, outerY - 6);
        ctx.rotate((-6 * Math.PI) / 180);
        ctx.fillRect(-15, -4, 30, 10);
        ctx.restore();

        // Inner Photo Slot Area (with polaroid bottom margin)
        const padX = outerW * 0.06;
        const padTop = outerH * 0.06;
        const padBottom = outerH * 0.22; // Thick polaroid bottom!
        const screenW = outerW - padX * 2;
        const screenH = outerH - padTop - padBottom;
        const screenX = outerX + padX;
        const screenY = outerY + padTop;

        ctx.save();
        this.roundRectPath(ctx, screenX, screenY, screenW, screenH, 4);
        ctx.clip();

        if (photoSrc) {
          try {
            const img = await this.loadImage(photoSrc);
            this.applyContextFilter(ctx, filter);

            const imgAspect = img.width / img.height;
            const slotAspect = screenW / screenH;
            let drawW = screenW;
            let drawH = screenH;
            let drawX = screenX;
            let drawY = screenY;

            if (imgAspect > slotAspect) {
              drawW = screenH * imgAspect;
              drawX = screenX - (drawW - screenW) / 2;
            } else {
              drawH = screenW / imgAspect;
              drawY = screenY - (drawH - screenH) / 2;
            }

            ctx.drawImage(img, drawX, drawY, drawW, drawH);
          } catch {
            ctx.fillStyle = '#cbd5e1';
            ctx.fillRect(screenX, screenY, screenW, screenH);
          }
        } else {
          ctx.fillStyle = '#e2e8f0';
          ctx.fillRect(screenX, screenY, screenW, screenH);
        }
        ctx.restore();
      }
      // --- DIGICAM FRAME WRAPPER rendering in Canvas ---
      else if (slot.frameStyle === 'digicam') {
        const outerW = slotW;
        const outerH = slotH;
        const outerX = -outerW / 2;
        const outerY = -outerH / 2;

        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
        ctx.shadowBlur = width * 0.035;
        ctx.shadowOffsetY = height * 0.015;

        // Camera Metallic Brown Body
        const camGrad = ctx.createLinearGradient(outerX, outerY, outerX + outerW, outerY + outerH);
        camGrad.addColorStop(0, '#8c684d');
        camGrad.addColorStop(1, '#4a3324');
        ctx.fillStyle = camGrad;
        ctx.strokeStyle = '#b89374';
        ctx.lineWidth = Math.max(2, width * 0.005);
        this.roundRectPath(ctx, outerX, outerY, outerW, outerH, 16);
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        // Screen Cutout Area (76% width on left)
        const screenW = outerW * 0.76;
        const screenH = outerH * 0.84;
        const screenX = outerX + outerW * 0.04;
        const screenY = outerY + (outerH - screenH) / 2;

        // Draw Gold Camera Dials on the Right Side
        ctx.save();
        const dialX = outerX + outerW * 0.89;
        ctx.fillStyle = '#d4af37';
        ctx.beginPath();
        ctx.arc(dialX, -screenH * 0.22, Math.max(4, screenH * 0.14), 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = '#3e2719';
        ctx.beginPath();
        ctx.arc(dialX, 0, Math.max(3, screenH * 0.09), 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(dialX, screenH * 0.22, Math.max(3, screenH * 0.09), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        ctx.save();
        this.roundRectPath(ctx, screenX, screenY, screenW, screenH, 8);
        ctx.clip();

        if (photoSrc) {
          try {
            const img = await this.loadImage(photoSrc);
            this.applyContextFilter(ctx, filter);

            const imgAspect = img.width / img.height;
            const slotAspect = screenW / screenH;
            let drawW = screenW;
            let drawH = screenH;
            let drawX = screenX;
            let drawY = screenY;

            if (imgAspect > slotAspect) {
              drawW = screenH * imgAspect;
              drawX = screenX - (drawW - screenW) / 2;
            } else {
              drawH = screenW / imgAspect;
              drawY = screenY - (drawH - screenH) / 2;
            }

            ctx.drawImage(img, drawX, drawY, drawW, drawH);
          } catch {
            ctx.fillStyle = '#cbd5e1';
            ctx.fillRect(screenX, screenY, screenW, screenH);
          }
        } else {
          ctx.fillStyle = '#e2e8f0';
          ctx.fillRect(screenX, screenY, screenW, screenH);
        }
        ctx.restore();
      }
      // --- STANDARD PHOTO SLOT RENDERING ---
      else {
        const slotRectX = -slotW / 2;
        const slotRectY = -slotH / 2;
        const borderRadius = slot.borderRadius ? (slot.borderRadius / 100) * width * 0.8 : (width * 0.008);

        // 1. Draw Drop Shadow
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = width * 0.02;
        ctx.shadowOffsetY = height * 0.008;

        if (slot.shape === 'arch') {
          this.archPath(ctx, slotRectX, slotRectY, slotW, slotH, slotW / 2);
        } else {
          this.roundRectPath(ctx, slotRectX, slotRectY, slotW, slotH, borderRadius);
        }
        ctx.fillStyle = '#1f2937';
        ctx.fill();
        ctx.restore();

        // 2. Draw & Clip Photo
        ctx.save();
        if (slot.shape === 'arch') {
          this.archPath(ctx, slotRectX, slotRectY, slotW, slotH, slotW / 2);
        } else {
          this.roundRectPath(ctx, slotRectX, slotRectY, slotW, slotH, borderRadius);
        }
        ctx.clip();

        if (photoSrc) {
          try {
            const img = await this.loadImage(photoSrc);
            this.applyContextFilter(ctx, filter);

            const imgAspect = img.width / img.height;
            const slotAspect = slotW / slotH;
            let drawW = slotW;
            let drawH = slotH;
            let drawX = slotRectX;
            let drawY = slotRectY;

            if (imgAspect > slotAspect) {
              drawW = slotH * imgAspect;
              drawX = slotRectX - (drawW - slotW) / 2;
            } else {
              drawH = slotW / imgAspect;
              drawY = slotRectY - (drawH - slotH) / 2;
            }

            ctx.drawImage(img, drawX, drawY, drawW, drawH);
          } catch {
            ctx.fillStyle = '#cbd5e1';
            ctx.fillRect(slotRectX, slotRectY, slotW, slotH);
          }
        } else {
          ctx.fillStyle = '#e2e8f0';
          ctx.fillRect(slotRectX, slotRectY, slotW, slotH);
        }
        ctx.restore();

        // 3. Draw Frame Border (Scalloped Stamp / Wave Crest / Crisp Solid)
        if (slot.borderStyle === 'scalloped-stamp' || template.scallopedBorder) {
          // 📮 Authentic Scalloped Postage Stamp Border with White Perforation Holes
          ctx.save();
          const frameColor = slot.borderColor || template.frameBorderColor || '#800020';
          const outerPad = width * 0.014;
          ctx.strokeStyle = frameColor;
          ctx.lineWidth = outerPad * 2.2;
          this.roundRectPath(ctx, slotRectX - outerPad, slotRectY - outerPad, slotW + outerPad * 2, slotH + outerPad * 2, borderRadius + outerPad);
          ctx.stroke();

          // White Perforated Stamp Holes along the border perimeter
          ctx.fillStyle = '#FFFFFF';
          const dotRadius = Math.max(3, width * 0.007);
          const dotSpacing = dotRadius * 3.3;

          const dotLeft = slotRectX - outerPad;
          const dotRight = slotRectX + slotW + outerPad;
          const dotTop = slotRectY - outerPad;
          const dotBottom = slotRectY + slotH + outerPad;

          // Top and Bottom rows
          for (let dx = dotLeft; dx <= dotRight; dx += dotSpacing) {
            ctx.beginPath();
            ctx.arc(dx, dotTop, dotRadius, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(dx, dotBottom, dotRadius, 0, Math.PI * 2);
            ctx.fill();
          }
          // Left and Right columns
          for (let dy = dotTop; dy <= dotBottom; dy += dotSpacing) {
            ctx.beginPath();
            ctx.arc(dotLeft, dy, dotRadius, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(dotRight, dy, dotRadius, 0, Math.PI * 2);
            ctx.fill();
          }

          // Inner crisp white guideline
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.lineWidth = Math.max(1.5, width * 0.003);
          this.roundRectPath(ctx, slotRectX, slotRectY, slotW, slotH, borderRadius);
          ctx.stroke();
          ctx.restore();
        } else if (slot.borderStyle === 'wave-crest') {
          // 🌊 Scalloped Wavy Sea Frame Border
          ctx.save();
          const waveColor = slot.borderColor || '#0284C7';
          ctx.strokeStyle = waveColor;
          ctx.lineWidth = Math.max(3, width * 0.008);
          this.roundRectPath(ctx, slotRectX, slotRectY, slotW, slotH, borderRadius);
          ctx.stroke();

          // Subtle wavy crest accents at four corners
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 2;
          this.roundRectPath(ctx, slotRectX + 3, slotRectY + 3, slotW - 6, slotH - 6, Math.max(2, borderRadius - 2));
          ctx.stroke();
          ctx.restore();
        } else if (slot.borderStyle !== 'none' && template.id !== 'royal-gala-vip-ticket') {
          // Standard Crisp White Frame Border
          ctx.save();
          if (slot.shape === 'arch') {
            this.archPath(ctx, slotRectX, slotRectY, slotW, slotH, slotW / 2);
          } else {
            this.roundRectPath(ctx, slotRectX, slotRectY, slotW, slotH, borderRadius);
          }
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.lineWidth = Math.max(2, width * 0.006);
          ctx.stroke();
          ctx.restore();
        }
      }

      ctx.restore();
    }

    // 3a. Render Royal Gala VIP Ticket Frame Overlay (High-Resolution Gold Bevel & Filigree)
    if (template.id === 'royal-gala-vip-ticket') {
      try {
        const overlayImg = await this.loadImage('/assets/frames/royal-gala/royal-gala-overlay.png');
        ctx.drawImage(overlayImg, 0, 0, width, height);
      } catch (err) {
        console.warn('Failed to load royal gala overlay:', err);
      }
    }

    // 3b. Render Realistic Washi Tapes over Photo Slots if enabled
    const showWashi = options.showWashiTape !== undefined ? options.showWashiTape : template.showWashiTape;
    if (showWashi) {
      for (const slot of template.photoSlots) {
        const slotX = (slot.x / 100) * width;
        const slotY = (slot.y / 100) * height;
        const slotW = (slot.width / 100) * width;
        const slotH = (slot.height / 100) * height;
        const tapeColor = options.washiTapeColor || template.washiTapeColor || 'rgba(255, 230, 205, 0.82)';

        // Top-left corner washi tape
        this.drawWashiTape(
          ctx,
          slotX + slotW * 0.08,
          slotY + 2,
          Math.max(28, slotW * 0.28),
          Math.max(10, slotH * 0.06),
          -10,
          tapeColor
        );
      }
    }

    // 4. Render Template Decorative Elements
    for (const el of template.decorativeElements) {
      if (template.id === 'royal-gala-vip-ticket' && el.id === 'gala-badge-seal') {
        continue;
      }
      ctx.save();
      const elX = (el.x / 100) * width;
      const elY = (el.y / 100) * height;

      ctx.translate(elX, elY);
      if (el.rotation) {
        ctx.rotate((el.rotation * Math.PI) / 180);
      }

      const svgString = this.getStickerSvg(el.content);
      const fontSize = (el.fontSize || 32) * 1.5;

      if (svgString) {
        try {
          const svgDataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
          const svgImg = await this.loadImage(svgDataUrl);
          ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
          ctx.shadowBlur = 12;
          ctx.shadowOffsetY = 4;
          const imgW = svgImg.naturalWidth || svgImg.width || 80;
          const imgH = svgImg.naturalHeight || svgImg.height || 80;
          const aspect = imgW / imgH;
          const drawW = fontSize * (aspect >= 1 ? aspect : 1);
          const drawH = fontSize * (aspect < 1 ? (1 / aspect) : 1);
          ctx.drawImage(svgImg, -drawW / 2, -drawH / 2, drawW, drawH);
        } catch {
          ctx.fillStyle = el.color || template.textColor;
          ctx.font = `${fontSize}px ${el.fontFamily || 'sans-serif'}`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(el.content, 0, 0);
        }
      } else {
        ctx.fillStyle = el.color || template.textColor;
        ctx.font = `${fontSize}px ${el.fontFamily || 'sans-serif'}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(el.content, 0, 0);
      }

      ctx.restore();
    }

    // 5. Render HD Text Elements (Customized or Default)
    template.textElements.forEach((el) => {
      if (template.id === 'royal-gala-vip-ticket' && el.id === 'gala-title' && !customTexts[el.id]) {
        return;
      }
      ctx.save();
      const textX = (el.x / 100) * width;
      const textY = (el.y / 100) * height;
      ctx.translate(textX, textY);
      if (el.rotation) {
        ctx.rotate((el.rotation * Math.PI) / 180);
      }

      const contentText = customTexts[el.id] !== undefined ? customTexts[el.id] : el.defaultText;

      const fontSizePx = Math.round((el.fontSize || 20) * 1.5);
      const isSerif = el.fontFamily?.toLowerCase().includes('playfair') || el.fontFamily?.toLowerCase().includes('serif');
      const isScript = el.fontFamily?.toLowerCase().includes('caveat') || el.fontFamily?.toLowerCase().includes('cursive');
      const fontFamilies = el.fontFamily
        ? `"${el.fontFamily}", "Playfair Display", "Plus Jakarta Sans", "Caveat", Georgia, serif`
        : 'sans-serif';

      ctx.font = `${isSerif ? '900' : isScript ? '600' : '700'} ${fontSizePx}px ${fontFamilies}`;
      ctx.textAlign = (el.align as CanvasTextAlign) || 'center';
      ctx.textBaseline = 'middle';

      // HD Text Shadow & Depth
      ctx.shadowColor = 'rgba(0, 0, 0, 0.28)';
      ctx.shadowBlur = Math.max(3, fontSizePx * 0.15);
      ctx.shadowOffsetY = Math.max(2, fontSizePx * 0.08);

      ctx.fillStyle = el.color || template.textColor;
      ctx.fillText(contentText, 0, 0);
      ctx.restore();
    });

    // 5b. Render Footer Custom Bottom Text if present
    if (options.customBottomText) {
      ctx.save();
      ctx.fillStyle = template.textColor || '#FFFFFF';
      ctx.font = `600 ${Math.round(width * 0.022)}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(options.customBottomText, width / 2, height * 0.975);
      ctx.restore();
    }

    // 6. Render User Placed Custom Stickers
    for (const st of stickers) {
      ctx.save();
      const stX = (st.x / 100) * width;
      const stY = (st.y / 100) * height;

      ctx.translate(stX, stY);
      if (st.rotation) {
        ctx.rotate((st.rotation * Math.PI) / 180);
      }

      const svgString = this.getStickerSvg(st.content);
      const scaleFactor = st.scale || 1;
      const baseSize = Math.round(width * 0.14) * scaleFactor;

      if (svgString) {
        try {
          const svgDataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
          const svgImg = await this.loadImage(svgDataUrl);
          ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
          ctx.shadowBlur = 16 * scaleFactor;
          ctx.shadowOffsetY = 6 * scaleFactor;
          const imgW = svgImg.naturalWidth || svgImg.width || 80;
          const imgH = svgImg.naturalHeight || svgImg.height || 80;
          const aspect = imgW / imgH;
          const drawW = baseSize * (aspect >= 1 ? aspect : 1);
          const drawH = baseSize * (aspect < 1 ? (1 / aspect) : 1);
          ctx.drawImage(svgImg, -drawW / 2, -drawH / 2, drawW, drawH);
        } catch {
          ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
          ctx.shadowBlur = 12 * scaleFactor;
          ctx.shadowOffsetY = 4 * scaleFactor;
          ctx.font = `${baseSize}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(st.content, 0, 0);
        }
      } else {
        ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
        ctx.shadowBlur = 12 * scaleFactor;
        ctx.shadowOffsetY = 4 * scaleFactor;
        ctx.font = `${baseSize}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(st.content, 0, 0);
      }

      ctx.restore();
    }

    // 6b. Render Live Rubber Postal Stamp if enabled
    const showStamp = options.showLiveStamp !== undefined ? options.showLiveStamp : template.showLiveStamp;
    if (showStamp) {
      const stampRadius = Math.min(width * 0.12, 70);
      const stampX = width * 0.82;
      const stampY = height * 0.90;
      this.drawLiveStamp(ctx, stampX, stampY, stampRadius, template.accentColor || '#8C2635');
    }

    // 6c. Render Barcode Accent if enabled
    const showBar = options.showBarcode !== undefined ? options.showBarcode : template.showBarcode;
    if (showBar) {
      const barW = Math.min(width * 0.35, 240);
      const barH = Math.max(24, height * 0.035);
      const barX = width * 0.25;
      const barY = height * 0.94;
      this.drawBarcode(ctx, barX, barY, barW, barH, template.textColor || '#1E293B');
    }

    // 7. Render Glossy Sheen Overlay on final export
    ctx.save();
    const sheenGrad = ctx.createLinearGradient(0, 0, width, height);
    sheenGrad.addColorStop(0, 'rgba(255, 255, 255, 0.18)');
    sheenGrad.addColorStop(0.45, 'rgba(255, 255, 255, 0)');
    sheenGrad.addColorStop(1, 'rgba(0, 0, 0, 0.08)');
    ctx.fillStyle = sheenGrad;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();

    return canvas.toDataURL('image/png', 1.0);
  }

  /**
   * Render authentic double strip (pair of identical 2x6 strips side-by-side on 4x6 print sheet)
   */
  static async renderDoubleStripCanvas(
    canvas: HTMLCanvasElement,
    singleStripDataUrl: string,
    width: number = 1200,
    height: number = 1800
  ): Promise<string> {
    const ctx = canvas.getContext('2d');
    if (!ctx) return singleStripDataUrl;

    canvas.width = width;
    canvas.height = height;

    try {
      const stripImg = await this.loadImage(singleStripDataUrl);
      const halfW = width / 2;

      // Draw Left Strip
      ctx.drawImage(stripImg, 0, 0, halfW, height);

      // Draw Right Strip
      ctx.drawImage(stripImg, halfW, 0, halfW, height);

      // Draw Center Cutting Guideline
      ctx.save();
      ctx.strokeStyle = 'rgba(160, 160, 160, 0.45)';
      ctx.lineWidth = 2;
      ctx.setLineDash([10, 10]);
      ctx.beginPath();
      ctx.moveTo(halfW, 25);
      ctx.lineTo(halfW, height - 25);
      ctx.stroke();

      // Mini Scissor Icon in center
      ctx.fillStyle = 'rgba(100, 100, 100, 0.65)';
      ctx.font = '22px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('✂', halfW, height / 2);
      ctx.restore();

      return canvas.toDataURL('image/png', 1.0);
    } catch {
      return singleStripDataUrl;
    }
  }
}

