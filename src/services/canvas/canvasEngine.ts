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

    // 3. Load & Render Captured Photos in Slots
    for (let index = 0; index < template.photoSlots.length; index++) {
      const slot = template.photoSlots[index];
      const photoSrc = capturedPhotos[index];

      const slotX = (slot.x / 100) * width;
      const slotY = (slot.y / 100) * height;
      const slotW = (slot.width / 100) * width;
      const slotH = (slot.height / 100) * height;

      ctx.save();

      // Rotation & Position
      if (slot.rotation) {
        ctx.translate(slotX + slotW / 2, slotY + slotH / 2);
        ctx.rotate((slot.rotation * Math.PI) / 180);
        ctx.translate(-(slotX + slotW / 2), -(slotY + slotH / 2));
      }

      // Slot Shadow & Border
      ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
      ctx.shadowBlur = 16;
      ctx.shadowOffsetY = 6;

      // Slot Clip / Rounding
      if (slot.borderRadius) {
        this.roundRectPath(ctx, slotX, slotY, slotW, slotH, slot.borderRadius * 2);
        ctx.clip();
      }

      if (photoSrc) {
        try {
          const img = await this.loadImage(photoSrc);

          // Apply selected Photo Filter
          ctx.save();
          this.applyContextFilter(ctx, filter);

          // Object-fit: cover logic
          const imgAspect = img.width / img.height;
          const slotAspect = slotW / slotH;
          let drawW = slotW;
          let drawH = slotH;
          let drawX = slotX;
          let drawY = slotY;

          if (imgAspect > slotAspect) {
            drawW = slotH * imgAspect;
            drawX = slotX - (drawW - slotW) / 2;
          } else {
            drawH = slotW / imgAspect;
            drawY = slotY - (drawH - slotH) / 2;
          }

          ctx.drawImage(img, drawX, drawY, drawW, drawH);
          ctx.restore();
        } catch {
          ctx.fillStyle = '#cbd5e1';
          ctx.fillRect(slotX, slotY, slotW, slotH);
        }
      } else {
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(slotX, slotY, slotW, slotH);
      }

      ctx.restore();
    }

    // 4. Render Template Decorative Elements (Washi tape, badges, stamps)
    template.decorativeElements.forEach((el) => {
      ctx.save();
      const elX = (el.x / 100) * width;
      const elY = (el.y / 100) * height;

      ctx.translate(elX, elY);
      if (el.rotation) {
        ctx.rotate((el.rotation * Math.PI) / 180);
      }

      ctx.fillStyle = el.color || template.textColor;
      ctx.font = `${(el.fontSize || 24) * 1.5}px ${el.fontFamily || 'sans-serif'}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(el.content, 0, 0);
      ctx.restore();
    });

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
}
