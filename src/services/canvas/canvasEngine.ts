import type { TemplateData } from '../../types/template';
import type { PhotoFilterType, PlacedSticker } from '../../types/editor';

export class CanvasEngine {
  /**
   * Apply CSS canvas filters to 2D Context based on selected photo filter type
   */
  private static applyContextFilter(ctx: CanvasRenderingContext2D, filter: PhotoFilterType): void {
    switch (filter) {
      case 'bright':
        ctx.filter = 'brightness(1.15) contrast(1.05) saturate(1.1)';
        break;
      case 'warm':
        ctx.filter = 'sepia(0.25) contrast(1.05) saturate(1.2) hue-rotate(-10deg)';
        break;
      case 'vintage':
        ctx.filter = 'sepia(0.4) contrast(1.1) brightness(0.95) saturate(0.85)';
        break;
      case 'film':
        ctx.filter = 'contrast(1.2) saturate(0.85) brightness(1.05) sepia(0.15)';
        break;
      case 'soft':
        ctx.filter = 'brightness(1.08) contrast(0.92) saturate(1.15)';
        break;
      case 'bw':
        ctx.filter = 'grayscale(1) contrast(1.2) brightness(1.05)';
        break;
      case 'retro':
        ctx.filter = 'contrast(1.25) saturate(1.3) hue-rotate(15deg)';
        break;
      case 'original':
      default:
        ctx.filter = 'none';
        break;
    }
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
   * Return SVG Data URL string for decorative stickers
   */
  private static getStickerSvg(content: string): string | null {
    switch (content) {
      case '🍄':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M12 36C12 21.6 20.9 10 32 10C43 10 52 21.6 52 36H12Z" fill="#E63946" stroke="#900C3F" stroke-width="3"/><circle cx="24" cy="22" r="4.5" fill="#FFF"/><circle cx="40" cy="24" r="3.5" fill="#FFF"/><circle cx="31" cy="16" r="3" fill="#FFF"/><path d="M22 36V48C22 52 26 55 32 55C38 55 42 52 42 48V36H22Z" fill="#FDF0ED" stroke="#B8978A" stroke-width="3"/></svg>`;
      case '📷':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect x="8" y="20" width="48" height="34" rx="6" fill="#3D3A37" stroke="#1A1817" stroke-width="3"/><path d="M22 20L25 14H39L42 20H22Z" fill="#6B6560" stroke="#1A1817" stroke-width="3"/><rect x="12" y="24" width="40" height="10" fill="#E8DFD1" rx="2"/><circle cx="32" cy="37" r="11" fill="#1A1817" stroke="#D4AF37" stroke-width="3"/><circle cx="32" cy="37" r="6" fill="#4B6584"/><circle cx="30" cy="35" r="2" fill="#FFF" opacity="0.8"/></svg>`;
      case '🌺':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M32 32C24 16 12 24 18 36C24 48 32 32 32 32Z" fill="#FF477E"/><path d="M32 32C48 24 52 38 40 44C28 50 32 32 32 32Z" fill="#FF5C8A"/><path d="M32 32C38 48 24 54 20 42C16 30 32 32 32 32Z" fill="#FF7096"/><path d="M32 32C16 38 18 52 30 50C42 48 32 32 32 32Z" fill="#FF85A1"/><circle cx="32" cy="32" r="5" fill="#FFD166"/></svg>`;
      case '🐚':
      case '⭐':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M32 6L38.5 23.5L57 24L42.5 35L47.5 53L32 42.5L16.5 53L21.5 35L7 24L25.5 23.5L32 6Z" fill="#F4A261" stroke="#E76F51" stroke-width="3"/></svg>`;
      case '🧸':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="18" cy="18" r="9" fill="#B07D62"/><circle cx="46" cy="18" r="9" fill="#B07D62"/><circle cx="32" cy="32" r="18" fill="#B07D62"/><ellipse cx="32" cy="36" rx="8" ry="6" fill="#E8B49B"/><circle cx="32" cy="34" r="3" fill="#6C4A35"/><circle cx="25" cy="28" r="2.5" fill="#1A1817"/><circle cx="39" cy="28" r="2.5" fill="#1A1817"/></svg>`;
      case '🎀':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M32 28C22 18 10 24 16 36C22 48 32 32 32 32Z" fill="#D90429"/><path d="M32 28C42 18 54 24 48 36C42 48 32 32 32 32Z" fill="#EF233C"/><path d="M28 34L14 54" stroke="#D90429" stroke-width="6"/><path d="M36 34L50 54" stroke="#EF233C" stroke-width="6"/><rect x="27" y="27" width="10" height="10" rx="3" fill="#FF85A1"/></svg>`;
      case '🪩':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 76"><line x1="32" y1="0" x2="32" y2="16" stroke="#C0C0C0" stroke-width="2"/><circle cx="32" cy="44" r="26" fill="#D3D3D3" stroke="#808080" stroke-width="2"/><path d="M10 44C10 32 54 32 54 44C54 56 10 56 10 44Z" stroke="#FFF" stroke-width="1.5" stroke-dasharray="3 3"/><line x1="32" y1="18" x2="32" y2="70" stroke="#FFF" stroke-width="1.5" opacity="0.7"/></svg>`;
      case '🎵':
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 70"><rect width="110" height="70" rx="10" fill="#2C2219" stroke="#D2B48C" stroke-width="2"/><rect x="10" y="10" width="22" height="22" rx="4" fill="#8C6239"/><text x="38" y="20" fill="#F5EFE6" font-size="9" font-family="sans-serif" font-weight="bold">Lover</text><text x="38" y="29" fill="#D2B48C" font-size="7" font-family="sans-serif">Taylor Swift ♡</text><text x="10" y="44" fill="#FFF" font-size="8" font-family="sans-serif">Can we always be this close?</text></svg>`;
      default:
        return null;
    }
  }

  /**
   * Render complete high-resolution final canvas output
   */
  static async renderFullCanvas(
    canvas: HTMLCanvasElement,
    template: TemplateData,
    capturedPhotos: string[],
    options: {
      filter?: PhotoFilterType;
      backgroundColor?: string;
      customTexts?: Record<string, string>;
      customBottomText?: string;
      placedStickers?: PlacedSticker[];
    } = {}
  ): Promise<string> {
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    const width = template.canvasWidth;
    const height = template.canvasHeight;
    canvas.width = width;
    canvas.height = height;

    const bgColor = options.backgroundColor || template.backgroundColor;
    const filter = options.filter || 'original';
    const customTexts = options.customTexts || {};
    const stickers = options.placedStickers || [];

    // 1. Draw Background Layer
    ctx.save();
    if (template.backgroundGradient && template.backgroundGradient !== 'none') {
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, bgColor);
      grad.addColorStop(1, template.accentColor + '44');
      ctx.fillStyle = grad;
    } else {
      ctx.fillStyle = bgColor;
    }
    ctx.fillRect(0, 0, width, height);
    ctx.restore();

    // 2. Draw Frame Border if specified
    if (template.frameBorderWidth > 0) {
      ctx.save();
      ctx.lineWidth = template.frameBorderWidth * 2;
      ctx.strokeStyle = template.frameBorderColor;
      ctx.strokeRect(0, 0, width, height);
      ctx.restore();
    }

    // 3. Load & Render Captured Photos in Slots (WITH POLAROID & DIGICAM FRAME WRAPPERS!)
    for (let index = 0; index < template.photoSlots.length; index++) {
      const slot = template.photoSlots[index];
      const photoSrc = capturedPhotos[index];

      const slotX = (slot.x / 100) * width;
      const slotY = (slot.y / 100) * height;
      const slotW = (slot.width / 100) * width;
      const slotH = (slot.height / 100) * height;

      ctx.save();

      // Set Center Pivot for Rotation
      const centerX = slotX + slotW / 2;
      const centerY = slotY + slotH / 2;

      ctx.translate(centerX, centerY);
      if (slot.rotation) {
        ctx.rotate((slot.rotation * Math.PI) / 180);
      }

      // --- POLAROID FRAME WRAPPER rendering in Canvas ---
      if (slot.frameStyle === 'polaroid') {
        const polaroidPaddingX = width * 0.02; // 2% padding
        const polaroidPaddingTop = height * 0.01;
        const polaroidPaddingBottom = height * 0.045; // Thick polaroid bottom

        const outerW = slotW + polaroidPaddingX * 2;
        const outerH = slotH + polaroidPaddingTop + polaroidPaddingBottom;
        const outerX = -outerW / 2;
        const outerY = -outerH / 2;

        // Draw Polaroid Drop Shadow
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowBlur = width * 0.03;
        ctx.shadowOffsetY = height * 0.015;

        // Draw Polaroid White Card Body
        ctx.fillStyle = '#ffffff';
        this.roundRectPath(ctx, outerX, outerY, outerW, outerH, 12);
        ctx.fill();
        ctx.restore();

        // Draw Tape Detail at top left corner of polaroid
        ctx.save();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.shadowColor = 'rgba(0,0,0,0.1)';
        ctx.shadowBlur = 4;
        ctx.translate(outerX + 24, outerY - 8);
        ctx.rotate((-6 * Math.PI) / 180);
        ctx.fillRect(-20, -6, 40, 16);
        ctx.restore();

        // Inner Photo Slot Area
        const innerX = outerX + polaroidPaddingX;
        const innerY = outerY + polaroidPaddingTop;

        ctx.save();
        this.roundRectPath(ctx, innerX, innerY, slotW, slotH, 4);
        ctx.clip();

        if (photoSrc) {
          try {
            const img = await this.loadImage(photoSrc);
            this.applyContextFilter(ctx, filter);

            const imgAspect = img.width / img.height;
            const slotAspect = slotW / slotH;
            let drawW = slotW;
            let drawH = slotH;
            let drawX = innerX;
            let drawY = innerY;

            if (imgAspect > slotAspect) {
              drawW = slotH * imgAspect;
              drawX = innerX - (drawW - slotW) / 2;
            } else {
              drawH = slotW / imgAspect;
              drawY = innerY - (drawH - slotH) / 2;
            }

            ctx.drawImage(img, drawX, drawY, drawW, drawH);
          } catch {
            ctx.fillStyle = '#cbd5e1';
            ctx.fillRect(innerX, innerY, slotW, slotH);
          }
        } else {
          ctx.fillStyle = '#e2e8f0';
          ctx.fillRect(innerX, innerY, slotW, slotH);
        }
        ctx.restore();
      }
      // --- DIGICAM FRAME WRAPPER rendering in Canvas ---
      else if (slot.frameStyle === 'digicam') {
        const outerW = slotW * 1.18;
        const outerH = slotH * 1.15;
        const outerX = -outerW / 2;
        const outerY = -outerH / 2;

        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
        ctx.shadowBlur = width * 0.035;
        ctx.shadowOffsetY = height * 0.015;

        // Camera Metallic Brown Gradient Body
        const camGrad = ctx.createLinearGradient(outerX, outerY, outerX + outerW, outerY + outerH);
        camGrad.addColorStop(0, '#7c5a43');
        camGrad.addColorStop(1, '#4a3324');
        ctx.fillStyle = camGrad;
        ctx.strokeStyle = '#a88468';
        ctx.lineWidth = 4;
        this.roundRectPath(ctx, outerX, outerY, outerW, outerH, 24);
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        // Screen Cutout Area
        const screenW = slotW;
        const screenH = slotH;
        const screenX = outerX + (outerW - screenW) * 0.4;
        const screenY = outerY + (outerH - screenH) / 2;

        // Draw Gold Camera Dials on the Right Side
        ctx.save();
        ctx.fillStyle = '#d4af37';
        ctx.beginPath();
        ctx.arc(outerX + outerW - 24, centerY - 10, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        ctx.save();
        this.roundRectPath(ctx, screenX, screenY, screenW, screenH, 12);
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
      // --- STANDARD SLOT RENDERING ---
      else {
        const slotRectX = -slotW / 2;
        const slotRectY = -slotH / 2;

        if (slot.shape === 'arch') {
          this.archPath(ctx, slotRectX, slotRectY, slotW, slotH, slotW / 2);
          ctx.clip();
        } else if (slot.borderRadius) {
          this.roundRectPath(ctx, slotRectX, slotRectY, slotW, slotH, slot.borderRadius * 2);
          ctx.clip();
        }

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
      }

      ctx.restore();
    }

    // 4. Render Template Decorative Elements (WITH SVG STICKER ARTWORK!)
    for (const el of template.decorativeElements) {
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
          ctx.drawImage(svgImg, -fontSize / 2, -fontSize / 2, fontSize, fontSize);
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

    // 5. Render Text Elements (Customized or Default)
    template.textElements.forEach((el) => {
      ctx.save();
      const textX = (el.x / 100) * width;
      const textY = (el.y / 100) * height;
      const contentText = customTexts[el.id] !== undefined ? customTexts[el.id] : el.defaultText;

      ctx.fillStyle = el.color || template.textColor;
      ctx.font = `bold ${(el.fontSize || 24) * 1.5}px ${el.fontFamily || 'sans-serif'}`;
      ctx.textAlign = (el.align as CanvasTextAlign) || 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(contentText, textX, textY);
      ctx.restore();
    });

    // 6. Render User Placed Custom Stickers
    stickers.forEach((st) => {
      ctx.save();
      const stX = (st.x / 100) * width;
      const stY = (st.y / 100) * height;

      ctx.translate(stX, stY);
      if (st.rotation) {
        ctx.rotate((st.rotation * Math.PI) / 180);
      }
      ctx.scale(st.scale, st.scale);

      ctx.font = '64px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(st.content, 0, 0);
      ctx.restore();
    });

    // 7. Render Photobooth Bottom Date Stamp & Glossy Sheen Overlay on final export
    ctx.save();
    ctx.fillStyle = template.textColor;
    ctx.font = '600 24px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(options.customBottomText || '2026.08.28 • PHOTO BOOTH STUDIO', 32, height - 32);
    ctx.textAlign = 'right';
    ctx.fillText('#04829', width - 32, height - 32);

    const sheenGrad = ctx.createLinearGradient(0, 0, width, height);
    sheenGrad.addColorStop(0, 'rgba(255, 255, 255, 0.18)');
    sheenGrad.addColorStop(0.45, 'rgba(255, 255, 255, 0)');
    sheenGrad.addColorStop(1, 'rgba(0, 0, 0, 0.08)');
    ctx.fillStyle = sheenGrad;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();

    return canvas.toDataURL('image/png');
  }

  private static roundRectPath(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  private static archPath(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ) {
    ctx.beginPath();
    const r = Math.min(width / 2, radius);
    ctx.moveTo(x, y + height);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + width / 2, y, r);
    ctx.arcTo(x + width, y, x + width, y + r, r);
    ctx.lineTo(x + width, y + height);
    ctx.closePath();
  }
}
