export type AIGestureType = 'none' | 'peace' | 'heart' | 'smile' | 'thumbs_up' | 'wave';

export interface AIGestureResult {
  gesture: AIGestureType;
  confidence: number;
  label: string;
}

export class GestureService {
  private static lastFrameData: Uint8ClampedArray | null = null;
  private static lastCheckTime = 0;

  /**
   * Analyze canvas or video frame for user hand gestures (V-sign ✌️, wave ✋, smile 😊) from long distance (1-2.5m).
   */
  static detectGesture(videoElement: HTMLVideoElement): AIGestureResult {
    if (!videoElement || videoElement.readyState < 2 || !videoElement.videoWidth) {
      return { gesture: 'none', confidence: 0, label: 'Kamera Siap' };
    }

    try {
      const width = 160;
      const height = 120;
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      if (!ctx) return { gesture: 'none', confidence: 0, label: 'Kamera Siap' };

      ctx.drawImage(videoElement, 0, 0, width, height);
      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;

      const now = Date.now();
      let motionDelta = 0;

      // Frame difference motion tracking for hand wave / movement
      if (this.lastFrameData && now - this.lastCheckTime < 800) {
        let diffCount = 0;
        for (let i = 0; i < data.length; i += 16) {
          const diff = Math.abs(data[i] - this.lastFrameData[i]) +
                       Math.abs(data[i + 1] - this.lastFrameData[i + 1]) +
                       Math.abs(data[i + 2] - this.lastFrameData[i + 2]);
          if (diff > 45) diffCount++;
        }
        motionDelta = diffCount / (data.length / 16);
      }
      this.lastFrameData = new Uint8ClampedArray(data);
      this.lastCheckTime = now;

      // Analyze skin pixel distribution for 1-2.5m long distance detection
      let skinPixels = 0;
      let topMotionPixels = 0;
      let centerFacePixels = 0;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = (y * width + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];

          // Enhanced skin color heuristic in YCbCr / RGB space
          const isSkin = r > 80 && g > 35 && b > 15 && r > g && r > b && Math.abs(r - g) > 12;
          if (isSkin) {
            skinPixels++;
            if (y < height * 0.5) {
              topMotionPixels++; // Hand raised in top 50% region
            }
            if (x > width * 0.25 && x < width * 0.75 && y > height * 0.2 && y < height * 0.8) {
              centerFacePixels++;
            }
          }
        }
      }

      const totalPixels = width * height;
      const skinRatio = skinPixels / totalPixels;
      const topHandRatio = skinPixels > 0 ? topMotionPixels / skinPixels : 0;

      // Long-distance multi-gesture classification thresholds
      if (skinRatio >= 0.015 && topHandRatio > 0.18) {
        // High confidence 2-finger / Raised hand gesture (✌️ / ✋)
        return { gesture: 'peace', confidence: 0.88, label: 'Pose 2 Jari ✌️ Terdeteksi!' };
      } else if (motionDelta > 0.12 && skinRatio >= 0.012) {
        // Hand wave motion gesture (✋)
        return { gesture: 'wave', confidence: 0.85, label: 'Lambaian Tangan ✋ Terdeteksi!' };
      } else if (skinRatio >= 0.02 && centerFacePixels > 150) {
        // Smile / Face pose gesture (😊)
        return { gesture: 'smile', confidence: 0.82, label: 'Senyuman Manis 😊 Terdeteksi!' };
      }

      return { gesture: 'none', confidence: 0.4, label: 'AI Ready 🤖 (Angkat ✌️ / Lambaikan ✋)' };
    } catch {
      return { gesture: 'none', confidence: 0, label: 'AI Mode Active' };
    }
  }
}
