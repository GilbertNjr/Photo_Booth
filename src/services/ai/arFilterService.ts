export type ARFilterType = 
  | 'none' 
  | 'beauty' 
  | 'bunny' 
  | 'cat' 
  | 'y2k' 
  | 'angel' 
  | 'sparkles' 
  | 'hearts';

export interface FaceDetectionData {
  hasFace: boolean;
  box: { x: number; y: number; width: number; height: number };
  leftEye: { x: number; y: number };
  rightEye: { x: number; y: number };
  nose: { x: number; y: number };
  mouth: { x: number; y: number };
  leftCheek: { x: number; y: number };
  rightCheek: { x: number; y: number };
  forehead: { x: number; y: number };
  isSmiling: boolean;
  tiltAngle: number;
}

export class ARFilterService {
  private static animFrame = 0;
  private static lastSmoothedFace: FaceDetectionData | null = null;

  /**
   * Fast, ultra-lightweight real-time face tracker running on canvas at 60 FPS
   */
  static detectFace(videoElement: HTMLVideoElement, width: number, height: number): FaceDetectionData {
    if (!videoElement || videoElement.readyState < 2 || !videoElement.videoWidth) {
      return this.getDefaultFace(width, height);
    }

    try {
      const sampleW = 120;
      const sampleH = 90;
      const offscreen = document.createElement('canvas');
      offscreen.width = sampleW;
      offscreen.height = sampleH;
      const ctx = offscreen.getContext('2d', { willReadFrequently: true });
      if (!ctx) return this.getDefaultFace(width, height);

      ctx.drawImage(videoElement, 0, 0, sampleW, sampleH);
      const imgData = ctx.getImageData(0, 0, sampleW, sampleH);
      const data = imgData.data;

      let minX = sampleW;
      let maxX = 0;
      let minY = sampleH;
      let maxY = 0;
      let skinCount = 0;

      // Find face skin bounding box
      for (let y = 10; y < sampleH - 10; y++) {
        for (let x = 15; x < sampleW - 15; x++) {
          const idx = (y * sampleW + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];

          // Normalized skin color heuristic
          const isSkin = r > 70 && g > 35 && b > 20 && r > g && r > b && Math.abs(r - g) > 12;
          if (isSkin) {
            skinCount++;
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }

      const totalPixels = sampleW * sampleH;
      const isFacePresent = skinCount > totalPixels * 0.03 && maxX > minX && maxY > minY;

      if (!isFacePresent) {
        return this.getDefaultFace(width, height);
      }

      // Map sampled coords to target canvas dimensions
      const scaleX = width / sampleW;
      const scaleY = height / sampleH;

      const rawBox = {
        x: minX * scaleX,
        y: minY * scaleY,
        width: Math.max(width * 0.35, (maxX - minX) * scaleX),
        height: Math.max(height * 0.45, (maxY - minY) * scaleY),
      };

      const centerX = rawBox.x + rawBox.width / 2;
      const centerY = rawBox.y + rawBox.height / 2;

      // Compute facial landmarks based on human head proportions
      const leftEye = { x: centerX - rawBox.width * 0.22, y: centerY - rawBox.height * 0.14 };
      const rightEye = { x: centerX + rawBox.width * 0.22, y: centerY - rawBox.height * 0.14 };
      const forehead = { x: centerX, y: rawBox.y + rawBox.height * 0.08 };
      const nose = { x: centerX, y: centerY + rawBox.height * 0.05 };
      const mouth = { x: centerX, y: centerY + rawBox.height * 0.26 };
      const leftCheek = { x: centerX - rawBox.width * 0.28, y: centerY + rawBox.height * 0.10 };
      const rightCheek = { x: centerX + rawBox.width * 0.28, y: centerY + rawBox.height * 0.10 };

      // Smile heuristic based on cheek brightness & width expansion
      const isSmiling = rawBox.width / rawBox.height > 0.72;

      const currentFace: FaceDetectionData = {
        hasFace: true,
        box: rawBox,
        leftEye,
        rightEye,
        nose,
        mouth,
        leftCheek,
        rightCheek,
        forehead,
        isSmiling,
        tiltAngle: 0,
      };

      // Smooth jitter with Linear Interpolation (lerp)
      if (!this.lastSmoothedFace) {
        this.lastSmoothedFace = currentFace;
      } else {
        const lerpFactor = 0.35;
        this.lastSmoothedFace = {
          hasFace: true,
          box: {
            x: this.lerp(this.lastSmoothedFace.box.x, currentFace.box.x, lerpFactor),
            y: this.lerp(this.lastSmoothedFace.box.y, currentFace.box.y, lerpFactor),
            width: this.lerp(this.lastSmoothedFace.box.width, currentFace.box.width, lerpFactor),
            height: this.lerp(this.lastSmoothedFace.box.height, currentFace.box.height, lerpFactor),
          },
          leftEye: {
            x: this.lerp(this.lastSmoothedFace.leftEye.x, currentFace.leftEye.x, lerpFactor),
            y: this.lerp(this.lastSmoothedFace.leftEye.y, currentFace.leftEye.y, lerpFactor),
          },
          rightEye: {
            x: this.lerp(this.lastSmoothedFace.rightEye.x, currentFace.rightEye.x, lerpFactor),
            y: this.lerp(this.lastSmoothedFace.rightEye.y, currentFace.rightEye.y, lerpFactor),
          },
          nose: {
            x: this.lerp(this.lastSmoothedFace.nose.x, currentFace.nose.x, lerpFactor),
            y: this.lerp(this.lastSmoothedFace.nose.y, currentFace.nose.y, lerpFactor),
          },
          mouth: {
            x: this.lerp(this.lastSmoothedFace.mouth.x, currentFace.mouth.x, lerpFactor),
            y: this.lerp(this.lastSmoothedFace.mouth.y, currentFace.mouth.y, lerpFactor),
          },
          leftCheek: {
            x: this.lerp(this.lastSmoothedFace.leftCheek.x, currentFace.leftCheek.x, lerpFactor),
            y: this.lerp(this.lastSmoothedFace.leftCheek.y, currentFace.leftCheek.y, lerpFactor),
          },
          rightCheek: {
            x: this.lerp(this.lastSmoothedFace.rightCheek.x, currentFace.rightCheek.x, lerpFactor),
            y: this.lerp(this.lastSmoothedFace.rightCheek.y, currentFace.rightCheek.y, lerpFactor),
          },
          forehead: {
            x: this.lerp(this.lastSmoothedFace.forehead.x, currentFace.forehead.x, lerpFactor),
            y: this.lerp(this.lastSmoothedFace.forehead.y, currentFace.forehead.y, lerpFactor),
          },
          isSmiling,
          tiltAngle: 0,
        };
      }

      return this.lastSmoothedFace;
    } catch {
      return this.getDefaultFace(width, height);
    }
  }

  private static lerp(start: number, end: number, factor: number): number {
    return start + (end - start) * factor;
  }

  private static getDefaultFace(width: number, height: number): FaceDetectionData {
    const centerX = width * 0.5;
    const centerY = height * 0.45;
    const faceW = width * 0.42;
    const faceH = height * 0.52;

    return {
      hasFace: false,
      box: { x: centerX - faceW / 2, y: centerY - faceH / 2, width: faceW, height: faceH },
      leftEye: { x: centerX - faceW * 0.22, y: centerY - faceH * 0.14 },
      rightEye: { x: centerX + faceW * 0.22, y: centerY - faceH * 0.14 },
      forehead: { x: centerX, y: centerY - faceH * 0.42 },
      nose: { x: centerX, y: centerY + faceH * 0.05 },
      mouth: { x: centerX, y: centerY + faceH * 0.26 },
      leftCheek: { x: centerX - faceW * 0.28, y: centerY + faceH * 0.10 },
      rightCheek: { x: centerX + faceW * 0.28, y: centerY + faceH * 0.10 },
      isSmiling: false,
      tiltAngle: 0,
    };
  }

  /**
   * Render AR Filter overlay onto canvas
   */
  static renderAROverlay(
    videoElement: HTMLVideoElement,
    canvas: HTMLCanvasElement,
    activeFilter: ARFilterType,
    mirror: boolean = true
  ): void {
    if (!canvas || activeFilter === 'none') return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    this.animFrame = (this.animFrame + 1) % 360;
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const face = this.detectFace(videoElement, width, height);

    ctx.save();
    if (mirror) {
      ctx.translate(width, 0);
      ctx.scale(-1, 1);
    }

    // --- 1. BEAUTY GLOW & SOFT PINK BLUSH (Always active in beauty or prop modes) ---
    this.drawCheekBlush(ctx, face.leftCheek.x, face.leftCheek.y, face.box.width * 0.18);
    this.drawCheekBlush(ctx, face.rightCheek.x, face.rightCheek.y, face.box.width * 0.18);

    // --- 2. SPECIFIC AR PROPS RENDERING ---
    switch (activeFilter) {
      case 'bunny':
        this.drawBunnyEars(ctx, face);
        break;
      case 'cat':
        this.drawCatEars(ctx, face);
        break;
      case 'y2k':
        this.drawY2KShades(ctx, face);
        break;
      case 'angel':
        this.drawAngelHalo(ctx, face);
        break;
      case 'sparkles':
        this.drawSparkles(ctx, face);
        break;
      case 'hearts':
        this.drawFloatingHearts(ctx, face);
        break;
      case 'beauty':
      default:
        // Beauty already has cheek blush + subtle chin sparkle
        this.drawStar(ctx, face.rightCheek.x + face.box.width * 0.12, face.rightCheek.y - 10, 10, 'rgba(255, 255, 255, 0.8)');
        break;
    }

    ctx.restore();
  }

  /**
   * Soft airbrush blush on cheeks with vibrant, radiant healthy glow
   */
  private static drawCheekBlush(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number): void {
    ctx.save();
    const grad = ctx.createRadialGradient(x, y, 0, x, y, radius * 1.15);
    grad.addColorStop(0, 'rgba(255, 90, 135, 0.78)');
    grad.addColorStop(0.45, 'rgba(255, 130, 165, 0.45)');
    grad.addColorStop(0.8, 'rgba(255, 170, 195, 0.18)');
    grad.addColorStop(1, 'rgba(255, 200, 215, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, radius * 1.15, 0, Math.PI * 2);
    ctx.fill();

    // Cute subtle cheek highlight dot
    ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
    ctx.beginPath();
    ctx.arc(x - radius * 0.25, y - radius * 0.2, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  /**
   * 🐰 Cute Floppy Bunny Ears + Pink Nose
   */
  private static drawBunnyEars(ctx: CanvasRenderingContext2D, face: FaceDetectionData): void {
    const headX = face.forehead.x;
    const headY = face.forehead.y;
    const earW = face.box.width * 0.22;
    const earH = face.box.height * 0.65;
    const wobble = Math.sin(this.animFrame * 0.08) * 4;

    ctx.save();
    // Left Ear
    ctx.save();
    ctx.translate(headX - earW * 1.1, headY + 10);
    ctx.rotate(((-14 + wobble) * Math.PI) / 180);
    // Outer white ear
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
    ctx.shadowBlur = 12;
    this.drawEarShape(ctx, 0, -earH, earW, earH);
    // Inner pink ear
    ctx.fillStyle = '#FFB6C1';
    this.drawEarShape(ctx, earW * 0.15, -earH * 0.85, earW * 0.7, earH * 0.75);
    ctx.restore();

    // Right Ear
    ctx.save();
    ctx.translate(headX + earW * 1.1, headY + 10);
    ctx.rotate(((14 - wobble) * Math.PI) / 180);
    // Outer white ear
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
    ctx.shadowBlur = 12;
    this.drawEarShape(ctx, 0, -earH, earW, earH);
    // Inner pink ear
    ctx.fillStyle = '#FFB6C1';
    this.drawEarShape(ctx, earW * 0.15, -earH * 0.85, earW * 0.7, earH * 0.75);
    ctx.restore();

    // Cute pink nose heart
    ctx.fillStyle = '#FF6B8B';
    ctx.beginPath();
    const noseR = face.box.width * 0.055;
    ctx.arc(face.nose.x, face.nose.y, noseR, 0, Math.PI * 2);
    ctx.fill();

    // Cute whiskers
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.lineWidth = 2.5;
    // Left whiskers
    ctx.beginPath();
    ctx.moveTo(face.nose.x - noseR * 1.8, face.nose.y - 4);
    ctx.lineTo(face.nose.x - noseR * 5.5, face.nose.y - 12);
    ctx.moveTo(face.nose.x - noseR * 1.8, face.nose.y + 4);
    ctx.lineTo(face.nose.x - noseR * 5.5, face.nose.y + 8);
    ctx.stroke();
    // Right whiskers
    ctx.beginPath();
    ctx.moveTo(face.nose.x + noseR * 1.8, face.nose.y - 4);
    ctx.lineTo(face.nose.x + noseR * 5.5, face.nose.y - 12);
    ctx.moveTo(face.nose.x + noseR * 1.8, face.nose.y + 4);
    ctx.lineTo(face.nose.x + noseR * 5.5, face.nose.y + 8);
    ctx.stroke();

    ctx.restore();
  }

  private static drawEarShape(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number): void {
    ctx.beginPath();
    ctx.moveTo(x, y + h);
    ctx.bezierCurveTo(x - w * 0.4, y + h * 0.6, x - w * 0.4, y + h * 0.2, x + w * 0.5, y);
    ctx.bezierCurveTo(x + w * 1.4, y + h * 0.2, x + w * 1.4, y + h * 0.6, x + w, y + h);
    ctx.closePath();
    ctx.fill();
  }

  /**
   * 🐱 Adorable Anime Cat Ears
   */
  private static drawCatEars(ctx: CanvasRenderingContext2D, face: FaceDetectionData): void {
    const headX = face.forehead.x;
    const headY = face.forehead.y;
    const earSize = face.box.width * 0.32;

    ctx.save();
    // Left Triangle Cat Ear
    ctx.save();
    ctx.translate(headX - earSize * 0.9, headY - 10);
    ctx.rotate((-20 * Math.PI) / 180);
    ctx.fillStyle = '#2B2D42';
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.moveTo(0, earSize * 0.8);
    ctx.lineTo(earSize * 0.5, -earSize * 0.4);
    ctx.lineTo(earSize, earSize * 0.8);
    ctx.closePath();
    ctx.fill();
    // Inner pink triangle
    ctx.fillStyle = '#FF758F';
    ctx.beginPath();
    ctx.moveTo(earSize * 0.2, earSize * 0.7);
    ctx.lineTo(earSize * 0.5, -earSize * 0.15);
    ctx.lineTo(earSize * 0.8, earSize * 0.7);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Right Triangle Cat Ear
    ctx.save();
    ctx.translate(headX + earSize * 0.9, headY - 10);
    ctx.rotate((20 * Math.PI) / 180);
    ctx.fillStyle = '#2B2D42';
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.moveTo(-earSize, earSize * 0.8);
    ctx.lineTo(-earSize * 0.5, -earSize * 0.4);
    ctx.lineTo(0, earSize * 0.8);
    ctx.closePath();
    ctx.fill();
    // Inner pink triangle
    ctx.fillStyle = '#FF758F';
    ctx.beginPath();
    ctx.moveTo(-earSize * 0.8, earSize * 0.7);
    ctx.lineTo(-earSize * 0.5, -earSize * 0.15);
    ctx.lineTo(-earSize * 0.2, earSize * 0.7);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Tiny pink cat nose
    ctx.fillStyle = '#FF4D6D';
    ctx.beginPath();
    ctx.moveTo(face.nose.x - 7, face.nose.y - 4);
    ctx.lineTo(face.nose.x + 7, face.nose.y - 4);
    ctx.lineTo(face.nose.x, face.nose.y + 6);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  /**
   * 🕶️ Y2K Cyberpunk Tinted Sunglasses
   */
  private static drawY2KShades(ctx: CanvasRenderingContext2D, face: FaceDetectionData): void {
    const eyeY = (face.leftEye.y + face.rightEye.y) / 2;
    const glassW = face.box.width * 0.38;
    const glassH = face.box.height * 0.22;

    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
    ctx.shadowBlur = 14;
    ctx.shadowOffsetY = 4;

    // Dark sleek frame gradient
    const lensGrad = ctx.createLinearGradient(0, eyeY - glassH / 2, 0, eyeY + glassH / 2);
    lensGrad.addColorStop(0, '#1a1a24');
    lensGrad.addColorStop(0.5, '#2e1065');
    lensGrad.addColorStop(1, '#db2777');

    // Left Lens
    ctx.fillStyle = lensGrad;
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 3;
    this.roundRect(ctx, face.leftEye.x - glassW * 0.55, eyeY - glassH * 0.5, glassW, glassH, 12);
    ctx.fill();
    ctx.stroke();

    // Right Lens
    this.roundRect(ctx, face.rightEye.x - glassW * 0.45, eyeY - glassH * 0.5, glassW, glassH, 12);
    ctx.fill();
    ctx.stroke();

    // Center Bridge
    ctx.strokeStyle = '#e11d48';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(face.leftEye.x + glassW * 0.45, eyeY - 2);
    ctx.lineTo(face.rightEye.x - glassW * 0.45, eyeY - 2);
    ctx.stroke();

    // Mirror lens white shine streak
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(face.leftEye.x - glassW * 0.4, eyeY + glassH * 0.2);
    ctx.lineTo(face.leftEye.x - glassW * 0.1, eyeY - glassH * 0.3);
    ctx.moveTo(face.rightEye.x - glassW * 0.2, eyeY + glassH * 0.2);
    ctx.lineTo(face.rightEye.x + glassW * 0.1, eyeY - glassH * 0.3);
    ctx.stroke();

    ctx.restore();
  }

  /**
   * 😇 Glowing Golden Angel Halo
   */
  private static drawAngelHalo(ctx: CanvasRenderingContext2D, face: FaceDetectionData): void {
    const haloX = face.forehead.x;
    const floatOffset = Math.sin(this.animFrame * 0.08) * 8;
    const haloY = face.forehead.y - face.box.height * 0.28 + floatOffset;
    const radiusX = face.box.width * 0.38;
    const radiusY = face.box.height * 0.10;

    ctx.save();
    ctx.shadowColor = '#FFD700';
    ctx.shadowBlur = 24;

    // Glowing halo ellipse
    ctx.strokeStyle = '#FFEE58';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.ellipse(haloX, haloY, radiusX, radiusY, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Inner bright core
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.ellipse(haloX, haloY, radiusX, radiusY, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  }

  /**
   * ✨ Twinkling Smile Sparkles
   */
  private static drawSparkles(ctx: CanvasRenderingContext2D, face: FaceDetectionData): void {
    const pulse = Math.abs(Math.sin(this.animFrame * 0.1)) * 4;
    const smileBonus = face.isSmiling ? 8 : 0;

    ctx.save();
    // Cheeks and eye corners sparkles
    this.drawStar(ctx, face.leftEye.x - face.box.width * 0.15, face.leftEye.y - 12, 14 + pulse + smileBonus, '#FFD700');
    this.drawStar(ctx, face.rightEye.x + face.box.width * 0.15, face.rightEye.y - 12, 16 + pulse + smileBonus, '#FFF176');
    this.drawStar(ctx, face.leftCheek.x - 10, face.leftCheek.y + 14, 11 + pulse, '#FFFFFF');
    this.drawStar(ctx, face.rightCheek.x + 10, face.rightCheek.y + 14, 13 + pulse, '#FFE082');

    if (face.isSmiling) {
      this.drawStar(ctx, face.forehead.x, face.forehead.y - 20, 20 + pulse, '#FFCA28');
    }
    ctx.restore();
  }

  private static drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, color: string): void {
    ctx.save();
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.moveTo(cx, cy - r);
    ctx.quadraticCurveTo(cx, cy, cx + r, cy);
    ctx.quadraticCurveTo(cx, cy, cx, cy + r);
    ctx.quadraticCurveTo(cx, cy, cx - r, cy);
    ctx.quadraticCurveTo(cx, cy, cx, cy - r);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  /**
   * 💖 Floating Orbiting Hearts
   */
  private static drawFloatingHearts(ctx: CanvasRenderingContext2D, face: FaceDetectionData): void {
    const t = this.animFrame * 0.05;

    ctx.save();
    const heart1X = face.leftCheek.x + Math.cos(t) * 20;
    const heart1Y = face.leftCheek.y - 20 + Math.sin(t) * 15;
    this.drawHeart(ctx, heart1X, heart1Y, 14, '#FF4D6D');

    const heart2X = face.rightCheek.x + Math.sin(t) * 20;
    const heart2Y = face.rightCheek.y - 25 + Math.cos(t) * 15;
    this.drawHeart(ctx, heart2X, heart2Y, 16, '#FF758F');

    const heart3X = face.forehead.x + Math.cos(t + 2) * 35;
    const heart3Y = face.forehead.y - 25 + Math.sin(t + 2) * 10;
    this.drawHeart(ctx, heart3X, heart3Y, 18, '#FF1744');
    ctx.restore();
  }

  private static drawHeart(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string): void {
    ctx.save();
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
    ctx.bezierCurveTo(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  private static roundRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
  ): void {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  /**
   * Composite camera video feed WITH active AR filters onto canvas (WYSIWYG Capture)
   */
  static compositeARWithFrame(
    videoElement: HTMLVideoElement,
    mirror: boolean = true,
    filterCss?: string,
    targetAspectRatio?: number,
    activeFilter: ARFilterType = 'none'
  ): string {
    try {
      const vW = videoElement.videoWidth || 1920;
      const vH = videoElement.videoHeight || 1080;

      let cropX = 0;
      let cropY = 0;
      let cropW = vW;
      let cropH = vH;

      if (targetAspectRatio && targetAspectRatio > 0) {
        const videoRatio = vW / vH;
        if (videoRatio > targetAspectRatio) {
          cropW = vH * targetAspectRatio;
          cropX = (vW - cropW) / 2;
        } else {
          cropH = vW / targetAspectRatio;
          cropY = (vH - cropH) / 2;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = Math.round(cropW);
      canvas.height = Math.round(cropH);
      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.save();
        if (mirror) {
          ctx.translate(canvas.width, 0);
          ctx.scale(-1, 1);
        }

        // 1. Draw Camera Frame with Film filter
        ctx.filter = filterCss || 'none';
        ctx.drawImage(
          videoElement,
          cropX,
          cropY,
          cropW,
          cropH,
          0,
          0,
          canvas.width,
          canvas.height
        );
        ctx.filter = 'none';
        ctx.restore();

        // 2. Draw AR Overlay on top of captured photo if active
        if (activeFilter !== 'none') {
          const arOverlayCanvas = document.createElement('canvas');
          arOverlayCanvas.width = canvas.width;
          arOverlayCanvas.height = canvas.height;
          this.renderAROverlay(videoElement, arOverlayCanvas, activeFilter, mirror);

          ctx.drawImage(arOverlayCanvas, 0, 0);
        }
      }

      return canvas.toDataURL('image/jpeg', 0.96);
    } catch (e) {
      console.error('AR composite capture error:', e);
      return '';
    }
  }
}
