/**
 * Service to capture and compile animated Boomerang GIF / Motion Photo loops during photo booth session
 */
export class GifRecorderService {
  private static recordedFrames: string[] = [];
  private static slotFrames: Record<number, string[]> = {};

  static startRecording(): void {
    this.recordedFrames = [];
    this.slotFrames = {};
  }

  static startSlotRecording(slot: number): void {
    this.slotFrames[slot] = [];
  }

  static addFrame(frameBase64Data: string, slot?: number): void {
    if (this.recordedFrames.length < 40) {
      this.recordedFrames.push(frameBase64Data);
    }
    if (slot !== undefined) {
      if (!this.slotFrames[slot]) this.slotFrames[slot] = [];
      if (this.slotFrames[slot].length < 12) {
        this.slotFrames[slot].push(frameBase64Data);
      }
    }
  }

  static getRecordedFrames(): string[] {
    return [...this.recordedFrames];
  }

  static getSlotFrames(slot: number): string[] {
    return this.slotFrames[slot] ? [...this.slotFrames[slot]] : [];
  }

  /**
   * Generates a ping-pong Boomerang loop sequence of image data URLs (Forward -> Backward -> Loop)
   */
  static generateBoomerangLoop(): string[] {
    if (this.recordedFrames.length === 0) return [];
    const forward = [...this.recordedFrames];
    const backward = [...this.recordedFrames].reverse().slice(1, -1);
    return [...forward, ...backward];
  }

  /**
   * Pure TypeScript lightweight animated GIF generator
   * Generates a true valid .gif file Blob that can be downloaded and viewed on any smartphone or PC
   */
  static async createAnimatedGifBlob(
    frames: string[],
    targetWidth: number = 280,
    targetHeight: number = 420,
    fps: number = 8,
    filterCss?: string
  ): Promise<Blob> {
    if (frames.length === 0) {
      throw new Error('No frames recorded to encode GIF');
    }

    const loopFrames = [...frames, ...[...frames].reverse().slice(1, -1)];
    const sampleCount = Math.min(loopFrames.length, 16);
    const step = Math.max(1, Math.floor(loopFrames.length / sampleCount));
    const selectedFrames: string[] = [];

    for (let i = 0; i < loopFrames.length && selectedFrames.length < sampleCount; i += step) {
      selectedFrames.push(loopFrames[i]);
    }

    // Load images asynchronously
    const images: HTMLImageElement[] = await Promise.all(
      selectedFrames.map(
        (src) =>
          new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error('Failed to load frame image for GIF'));
            img.src = src;
          })
      )
    );

    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) throw new Error('Canvas 2D context unavailable');

    const delay = Math.round(100 / fps); // in 1/100ths of second for GIF
    const bytes: number[] = [];

    // 1. GIF Header: GIF89a
    this.writeString(bytes, 'GIF89a');

    // 2. Logical Screen Descriptor
    this.writeLittleEndian16(bytes, targetWidth);
    this.writeLittleEndian16(bytes, targetHeight);
    bytes.push(0x70); // GCT Flag: 0, Color Res: 7 (8-bit), Sort: 0, GCT Size: 0
    bytes.push(0);    // Background color index
    bytes.push(0);    // Pixel aspect ratio

    // 3. Netscape Application Extension for infinite loop
    bytes.push(0x21, 0xFF, 0x0B);
    this.writeString(bytes, 'NETSCAPE2.0');
    bytes.push(0x03, 0x01);
    this.writeLittleEndian16(bytes, 0); // 0 = Loop forever
    bytes.push(0x00); // Block terminator

    // 4. Encode each frame
    for (const img of images) {
      ctx.clearRect(0, 0, targetWidth, targetHeight);

      // Apply vibrant brightness and photo filter compensation
      ctx.filter = filterCss
        ? `${filterCss} brightness(1.10) saturate(1.15)`
        : 'brightness(1.10) contrast(1.05) saturate(1.15)';

      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
      ctx.filter = 'none';

      const imgData = ctx.getImageData(0, 0, targetWidth, targetHeight);

      // Quantize to 64 color palette with closest match
      const { indexedPixels, palette } = this.quantize64(imgData.data, targetWidth * targetHeight);

      // Graphic Control Extension
      bytes.push(0x21, 0xF9, 0x04);
      bytes.push(0x04); // Disposal method 1 (do not dispose)
      this.writeLittleEndian16(bytes, delay);
      bytes.push(0x00); // Transparent color index
      bytes.push(0x00); // Block terminator

      // Image Descriptor
      bytes.push(0x2C);
      this.writeLittleEndian16(bytes, 0); // Left
      this.writeLittleEndian16(bytes, 0); // Top
      this.writeLittleEndian16(bytes, targetWidth);
      this.writeLittleEndian16(bytes, targetHeight);
      bytes.push(0x85); // Local Color Table flag: 1, Interlace: 0, Size: 5 (64 colors)

      // Local Color Table (64 * 3 bytes)
      for (let i = 0; i < 64; i++) {
        if (i < palette.length) {
          bytes.push(palette[i][0], palette[i][1], palette[i][2]);
        } else {
          bytes.push(0, 0, 0);
        }
      }

      // LZW Compress Image Data
      this.lzwEncode(bytes, 6, indexedPixels);
    }

    // 5. GIF Trailer
    bytes.push(0x3B);

    return new Blob([new Uint8Array(bytes)], { type: 'image/gif' });
  }

  private static writeString(bytes: number[], str: string): void {
    for (let i = 0; i < str.length; i++) {
      bytes.push(str.charCodeAt(i));
    }
  }

  private static writeLittleEndian16(bytes: number[], value: number): void {
    bytes.push(value & 0xFF);
    bytes.push((value >> 8) & 0xFF);
  }

  private static quantize64(
    rgbaData: Uint8ClampedArray,
    pixelCount: number
  ): { indexedPixels: number[]; palette: [number, number, number][] } {
    const palette: [number, number, number][] = [];
    const colorMap: Record<number, number> = {};
    const indexedPixels: number[] = new Array(pixelCount);

    for (let i = 0; i < pixelCount; i++) {
      const idx = i * 4;
      const rVal = rgbaData[idx];
      const gVal = rgbaData[idx + 1];
      const bVal = rgbaData[idx + 2];

      // Quantize key
      const r = rVal & 0b11100000;
      const g = gVal & 0b11100000;
      const b = bVal & 0b11000000;
      const key = (r << 8) | (g << 2) | (b >> 4);

      if (colorMap[key] === undefined) {
        if (palette.length < 64) {
          colorMap[key] = palette.length;
          palette.push([rVal, gVal, bVal]);
        } else {
          // Find closest color match in current palette instead of black fallback
          let bestDist = Infinity;
          let bestIdx = 0;
          for (let p = 0; p < palette.length; p++) {
            const dr = rVal - palette[p][0];
            const dg = gVal - palette[p][1];
            const db = bVal - palette[p][2];
            const dist = dr * dr + dg * dg + db * db;
            if (dist < bestDist) {
              bestDist = dist;
              bestIdx = p;
            }
          }
          colorMap[key] = bestIdx;
        }
      }
      indexedPixels[i] = colorMap[key];
    }

    while (palette.length < 64) {
      palette.push([0, 0, 0]);
    }

    return { indexedPixels, palette };
  }

  /**
   * Fast LZW Image Encoder
   */
  private static lzwEncode(bytes: number[], minCodeSize: number, pixels: number[]): void {
    bytes.push(minCodeSize); // LZW Minimum Code Size

    const clearCode = 1 << minCodeSize;
    const eoiCode = clearCode + 1;

    let codeSize = minCodeSize + 1;
    let nextCode = eoiCode + 1;
    const maxDictSize = 4096;

    const dict: Record<string, number> = {};
    const resetDict = () => {
      for (const k in dict) delete dict[k];
      for (let i = 0; i < clearCode; i++) {
        dict[String(i)] = i;
      }
      codeSize = minCodeSize + 1;
      nextCode = eoiCode + 1;
    };
    resetDict();

    let curBits = 0;
    let bitCount = 0;
    const buffer: number[] = [];

    const emitBits = (code: number) => {
      curBits |= code << bitCount;
      bitCount += codeSize;
      while (bitCount >= 8) {
        buffer.push(curBits & 0xFF);
        curBits >>= 8;
        bitCount -= 8;
      }
    };

    const flushPacket = (isEnd: boolean = false) => {
      if (isEnd && bitCount > 0) {
        buffer.push(curBits & 0xFF);
        curBits = 0;
        bitCount = 0;
      }

      while (buffer.length > 0) {
        const chunk = buffer.splice(0, Math.min(buffer.length, 254));
        bytes.push(chunk.length);
        for (let j = 0; j < chunk.length; j++) bytes.push(chunk[j]);
      }
    };

    emitBits(clearCode);

    let prefix = String(pixels[0]);
    for (let i = 1; i < pixels.length; i++) {
      const c = pixels[i];
      const combined = `${prefix},${c}`;

      if (dict[combined] !== undefined) {
        prefix = combined;
      } else {
        emitBits(dict[prefix]);

        if (nextCode < maxDictSize) {
          dict[combined] = nextCode++;
          if (nextCode > (1 << codeSize) && codeSize < 12) {
            codeSize++;
          }
        } else {
          emitBits(clearCode);
          resetDict();
        }
        prefix = String(c);
      }

      if (buffer.length >= 254) {
        flushPacket(false);
      }
    }

    emitBits(dict[prefix]);
    emitBits(eoiCode);
    flushPacket(true);

    bytes.push(0x00); // Block terminator
  }
}
