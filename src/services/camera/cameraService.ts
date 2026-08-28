export class CameraService {
  private static activeStream: MediaStream | null = null;

  /**
   * Get available video input devices (cameras)
   */
  static async getCameraDevices(): Promise<MediaDeviceInfo[]> {
    try {
      if (typeof navigator === 'undefined' || !navigator.mediaDevices?.enumerateDevices) {
        return [];
      }
      const devices = await navigator.mediaDevices.enumerateDevices();
      return devices.filter((device) => device.kind === 'videoinput');
    } catch {
      return [];
    }
  }

  /**
   * Start camera stream on target HTMLVideoElement
   */
  static async startCamera(
    videoElement: HTMLVideoElement,
    deviceId?: string,
    facingMode: 'user' | 'environment' = 'user'
  ): Promise<boolean> {
    this.stopCamera();

    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      console.warn('getUserMedia is not supported in this browser context');
      return false;
    }

    try {
      // Mobile-friendly constraints without strict min resolutions or frameRates
      const videoConstraints: MediaTrackConstraints = deviceId && deviceId !== ''
        ? { deviceId: { exact: deviceId } }
        : {
            facingMode: { ideal: facingMode },
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          };

      const constraints: MediaStreamConstraints = {
        video: videoConstraints,
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.activeStream = stream;
      videoElement.srcObject = stream;
      await videoElement.play().catch(() => {});
      return true;
    } catch (error) {
      console.warn('Standard camera constraints fallback...', error);
      try {
        const fallbackStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        this.activeStream = fallbackStream;
        videoElement.srcObject = fallbackStream;
        await videoElement.play().catch(() => {});
        return true;
      } catch (fallbackErr) {
        console.error('Camera initialization failed:', fallbackErr);
        return false;
      }
    }
  }

  /**
   * Stop active camera stream
   */
  static stopCamera(): void {
    if (this.activeStream) {
      try {
        this.activeStream.getTracks().forEach((track) => track.stop());
      } catch {
        // Ignore track stop errors
      }
      this.activeStream = null;
    }
  }

  /**
   * Check if camera is active
   */
  static isCameraActive(): boolean {
    return !!this.activeStream && this.activeStream.active;
  }

  /**
   * Get active MediaStream instance
   */
  static getActiveStream(): MediaStream | null {
    return this.activeStream;
  }
}
