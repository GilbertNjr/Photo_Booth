export class CameraService {
  private static activeStream: MediaStream | null = null;

  /**
   * Get available video input devices (cameras)
   */
  static async getCameraDevices(): Promise<MediaDeviceInfo[]> {
    try {
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

    try {
      const constraints: MediaStreamConstraints = {
        video: deviceId
          ? { deviceId: { exact: deviceId } }
          : { width: { ideal: 1920 }, height: { ideal: 1080 }, facingMode },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.activeStream = stream;
      videoElement.srcObject = stream;
      await videoElement.play();
      return true;
    } catch (error) {
      console.error('Camera initialization failed:', error);
      return false;
    }
  }

  /**
   * Stop active camera stream
   */
  static stopCamera(): void {
    if (this.activeStream) {
      this.activeStream.getTracks().forEach((track) => track.stop());
      this.activeStream = null;
    }
  }

  /**
   * Check if camera is active
   */
  static isCameraActive(): boolean {
    return !!this.activeStream && this.activeStream.active;
  }
}
