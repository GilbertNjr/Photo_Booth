/**
 * Photo Booth High-Performance Image Preloader & Cache Engine
 * Provides pre-decoding, memory caching, and WebP thumbnail optimizations
 */

class ImageCacheService {
  private cache = new Map<string, HTMLImageElement>();
  private preloadedUrls = new Set<string>();

  /**
   * Returns an optimized thumbnail URL for grid rendering
   */
  public getOptimizedSampleUrl(url: string, width = 240, quality = 75): string {
    if (url.includes('unsplash.com')) {
      // Optimize unsplash size and quality for instant grid rendering
      const baseUrl = url.split('?')[0];
      return `${baseUrl}?auto=format&fit=crop&w=${width}&q=${quality}`;
    }
    return url;
  }

  /**
   * Asynchronously pre-decodes an image into browser memory
   */
  public preloadImage(url: string): Promise<HTMLImageElement> {
    const optimizedUrl = this.getOptimizedSampleUrl(url);

    if (this.cache.has(optimizedUrl)) {
      return Promise.resolve(this.cache.get(optimizedUrl)!);
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        // Use HTMLImageElement decode API if available for zero main-thread lock
        if ('decode' in img) {
          img
            .decode()
            .then(() => {
              this.cache.set(optimizedUrl, img);
              this.preloadedUrls.add(optimizedUrl);
              resolve(img);
            })
            .catch(() => {
              this.cache.set(optimizedUrl, img);
              this.preloadedUrls.add(optimizedUrl);
              resolve(img);
            });
        } else {
          this.cache.set(optimizedUrl, img);
          this.preloadedUrls.add(optimizedUrl);
          resolve(img);
        }
      };

      img.onerror = (err) => reject(err);
      img.src = optimizedUrl;
    });
  }

  /**
   * Batch preloads an array of image URLs asynchronously
   */
  public preloadBatch(urls: string[]): void {
    urls.forEach((url) => {
      if (!this.preloadedUrls.has(url)) {
        this.preloadImage(url).catch(() => {
          /* ignore error for batch background preloading */
        });
      }
    });
  }

  /**
   * Check if image is already cached in memory
   */
  public isCached(url: string): boolean {
    return this.cache.has(this.getOptimizedSampleUrl(url));
  }
}

export const imageCacheService = new ImageCacheService();
