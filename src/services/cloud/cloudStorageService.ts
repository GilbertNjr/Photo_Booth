export interface CloudUploadResponse {
  sessionId: string;
  photoUrl: string;
  gifUrl: string;
  qrCodeDataUrl: string;
  expiresAt: string;
}

export class CloudStorageService {
  /**
   * Simulates real-time cloud upload to Supabase/S3 with unique session UUID & dynamic mobile URL
   */
  static async uploadSessionData(
    finalPhotoDataUrl: string,
    gifFrames: string[] = []
  ): Promise<CloudUploadResponse> {
    const sessionId = `pb-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 7)}`;
    
    // Construct dynamic mobile download link
    const mobileDownloadUrl = `https://photobooth-studio.app/s/${sessionId}`;
    
    return {
      sessionId,
      photoUrl: finalPhotoDataUrl,
      gifUrl: gifFrames[0] || finalPhotoDataUrl,
      qrCodeDataUrl: mobileDownloadUrl,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
  }
}
