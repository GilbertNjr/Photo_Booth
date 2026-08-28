export class CaptureService {
  private static audioCtx: AudioContext | null = null;

  private static getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  /**
   * Play synthesized countdown beep tone
   */
  static playCountdownBeep(isFinal: boolean = false): void {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(isFinal ? 880 : 440, ctx.currentTime); // A5 for final, A4 for count

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch {
      // Audio playback silent fallback
    }
  }

  /**
   * Play synthesized camera shutter sound
   */
  static playShutterSound(): void {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      // Noise burst for mechanical shutter click
      const bufferSize = ctx.sampleRate * 0.08;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(1000, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch {
      // Audio fallback
    }
  }

  /**
   * Capture a single frame from video element as base64 JPEG with auto studio portrait enhancement
   */
  static captureFrame(videoElement: HTMLVideoElement, mirror: boolean = true): string {
    try {
      const canvas = document.createElement('canvas');
      const w = videoElement.videoWidth || 1920;
      const h = videoElement.videoHeight || 1080;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        if (mirror) {
          ctx.translate(canvas.width, 0);
          ctx.scale(-1, 1);
        }

        // Apply Auto Studio Lighting Enhancement (Brightness boost, skin warmth & contrast sharpening)
        ctx.filter = 'brightness(1.08) contrast(1.06) saturate(1.08)';
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        ctx.filter = 'none';
      }

      return canvas.toDataURL('image/jpeg', 0.96);
    } catch (e) {
      console.error('Frame capture fallback error:', e);
      // Fail-safe fallback canvas
      const fallbackCanvas = document.createElement('canvas');
      fallbackCanvas.width = 1280;
      fallbackCanvas.height = 720;
      const fCtx = fallbackCanvas.getContext('2d');
      if (fCtx) {
        fCtx.fillStyle = '#1e1e24';
        fCtx.fillRect(0, 0, 1280, 720);
      }
      return fallbackCanvas.toDataURL('image/jpeg', 0.8);
    }
  }
}
