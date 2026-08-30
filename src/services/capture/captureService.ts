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
   * Play synthesized countdown beep tone (Studio Chime Tone)
   */
  static playCountdownBeep(isFinal: boolean = false): void {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(isFinal ? 1046.50 : 523.25, t); // C6 for final, C5 for count

      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.22);
    } catch {
      // Audio playback silent fallback
    }
  }

  /**
   * Play synthesized authentic mechanical DSLR camera shutter sound (ker-CHAK! + Flash)
   */
  static playShutterSound(): void {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const t = ctx.currentTime;

      // 1. Mechanical Mirror-Up Thud (Low Punch Slap)
      const mirrorOsc = ctx.createOscillator();
      const mirrorGain = ctx.createGain();
      mirrorOsc.type = 'triangle';
      mirrorOsc.frequency.setValueAtTime(280, t);
      mirrorOsc.frequency.exponentialRampToValueAtTime(40, t + 0.07);
      mirrorGain.gain.setValueAtTime(0.65, t);
      mirrorGain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
      mirrorOsc.connect(mirrorGain);
      mirrorGain.connect(ctx.destination);
      mirrorOsc.start(t);
      mirrorOsc.stop(t + 0.07);

      // 2. High-Frequency Metallic Curtain Snap (Dual Noise Burst)
      const bufferSize = Math.floor(ctx.sampleRate * 0.14);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const bandpass = ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(3200, t + 0.015);
      bandpass.Q.setValueAtTime(1.8, t + 0.015);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.01, t);
      noiseGain.gain.setValueAtTime(0.7, t + 0.015);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);

      noise.connect(bandpass);
      bandpass.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(t + 0.015);
      noise.stop(t + 0.14);

      // 3. Secondary Motor Rewind / Spring Click
      const springOsc = ctx.createOscillator();
      const springGain = ctx.createGain();
      springOsc.type = 'sine';
      springOsc.frequency.setValueAtTime(1600, t + 0.08);
      springOsc.frequency.exponentialRampToValueAtTime(500, t + 0.16);
      springGain.gain.setValueAtTime(0.2, t + 0.08);
      springGain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
      springOsc.connect(springGain);
      springGain.connect(ctx.destination);
      springOsc.start(t + 0.08);
      springOsc.stop(t + 0.16);
    } catch {
      // Audio fallback
    }
  }

  /**
   * Capture a single frame from video element as base64 JPEG with live cinematic filter & studio portrait enhancement
   */
  static captureFrame(videoElement: HTMLVideoElement, mirror: boolean = true, filterCss?: string): string {
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

        // Apply Live Cinematic Filter or Auto Studio Lighting Enhancement
        ctx.filter = filterCss || 'brightness(1.08) contrast(1.06) saturate(1.08)';
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
