/**
 * Service to capture animated Boomerang GIF / Motion Photo loops during photo booth session
 */
export class GifRecorderService {
  private static recordedFrames: string[] = [];

  static startRecording(): void {
    this.recordedFrames = [];
  }

  static addFrame(frameBase64Data: string): void {
    if (this.recordedFrames.length < 24) {
      this.recordedFrames.push(frameBase64Data);
    }
  }

  static getRecordedFrames(): string[] {
    return [...this.recordedFrames];
  }

  /**
   * Generates a ping-pong Boomerang loop sequence data URL
   */
  static generateBoomerangLoop(): string[] {
    if (this.recordedFrames.length === 0) return [];
    const forward = [...this.recordedFrames];
    const backward = [...this.recordedFrames].reverse().slice(1, -1);
    return [...forward, ...backward];
  }
}
