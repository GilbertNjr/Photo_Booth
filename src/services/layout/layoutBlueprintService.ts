import type { PhotoSlot, TemplateData, GridAspectRatio } from '../../types/template';

export interface GridPreset {
  id: string;
  name: string;
  aspectRatio: GridAspectRatio;
  slotsCount: number;
  canvasWidth: number;
  canvasHeight: number;
  description: string;
  slots: PhotoSlot[];
}

export class LayoutBlueprintService {
  /**
   * Predefined signature layout blueprints for instant selection
   */
  static readonly PRESETS: GridPreset[] = [
    // --- 1:1 SQUARE PRESETS ---
    {
      id: '1-1-grid-4',
      name: 'Square 2x2 (Grid 4)',
      aspectRatio: '1:1',
      slotsCount: 4,
      canvasWidth: 1600,
      canvasHeight: 1600,
      description: '4 foto bujur sangkar simetris klasik',
      slots: [
        { id: 's1', x: 6, y: 6, width: 41, height: 41, borderRadius: 12, aspectRatio: 1, shape: 'rect' },
        { id: 's2', x: 53, y: 6, width: 41, height: 41, borderRadius: 12, aspectRatio: 1, shape: 'rect' },
        { id: 's3', x: 6, y: 53, width: 41, height: 41, borderRadius: 12, aspectRatio: 1, shape: 'rect' },
        { id: 's4', x: 53, y: 53, width: 41, height: 41, borderRadius: 12, aspectRatio: 1, shape: 'rect' },
      ],
    },
    {
      id: '1-1-polaroid-single',
      name: 'Giant Square Polaroid (1 Foto)',
      aspectRatio: '1:1',
      slotsCount: 1,
      canvasWidth: 1600,
      canvasHeight: 1600,
      description: '1 foto kotak besar dengan border polaroid tebal',
      slots: [
        { id: 's1', x: 8, y: 8, width: 84, height: 84, borderRadius: 16, aspectRatio: 1, shape: 'rect', frameStyle: 'polaroid' },
      ],
    },

    // --- 2:6 PHOTOSTRIP PRESETS ---
    {
      id: '2-6-strip-4',
      name: 'Classic 4-Cut Strip (2x6)',
      aspectRatio: '2:6',
      slotsCount: 4,
      canvasWidth: 800,
      canvasHeight: 2400,
      description: '4 strip vertikal gaya ikonik Life Four Cuts Korea',
      slots: [
        { id: 's1', x: 8, y: 4, width: 84, height: 20.5, borderRadius: 8, aspectRatio: 4 / 3, shape: 'rect' },
        { id: 's2', x: 8, y: 26.5, width: 84, height: 20.5, borderRadius: 8, aspectRatio: 4 / 3, shape: 'rect' },
        { id: 's3', x: 8, y: 49, width: 84, height: 20.5, borderRadius: 8, aspectRatio: 4 / 3, shape: 'rect' },
        { id: 's4', x: 8, y: 71.5, width: 84, height: 20.5, borderRadius: 8, aspectRatio: 4 / 3, shape: 'rect' },
      ],
    },
    {
      id: '2-6-strip-3',
      name: '3-Cut Big Strip (2x6)',
      aspectRatio: '2:6',
      slotsCount: 3,
      canvasWidth: 800,
      canvasHeight: 2400,
      description: '3 foto vertikal lebih besar & lega',
      slots: [
        { id: 's1', x: 8, y: 5, width: 84, height: 27, borderRadius: 10, aspectRatio: 4 / 3, shape: 'rect' },
        { id: 's2', x: 8, y: 34, width: 84, height: 27, borderRadius: 10, aspectRatio: 4 / 3, shape: 'rect' },
        { id: 's3', x: 8, y: 63, width: 84, height: 27, borderRadius: 10, aspectRatio: 4 / 3, shape: 'rect' },
      ],
    },

    // --- 4:6 POSTCARD PRESETS ---
    {
      id: '4-6-postcard-4',
      name: 'Postcard 2x2 (4x6)',
      aspectRatio: '4:6',
      slotsCount: 4,
      canvasWidth: 1200,
      canvasHeight: 1800,
      description: 'Format cetak kartu pos 4x6 4 foto seimbang',
      slots: [
        { id: 's1', x: 6, y: 6, width: 42, height: 38, borderRadius: 8, aspectRatio: 3 / 4, shape: 'rect' },
        { id: 's2', x: 52, y: 6, width: 42, height: 38, borderRadius: 8, aspectRatio: 3 / 4, shape: 'rect' },
        { id: 's3', x: 6, y: 48, width: 42, height: 38, borderRadius: 8, aspectRatio: 3 / 4, shape: 'rect' },
        { id: 's4', x: 52, y: 48, width: 42, height: 38, borderRadius: 8, aspectRatio: 3 / 4, shape: 'rect' },
      ],
    },
    {
      id: '4-6-postcard-mixed-3',
      name: 'Hero Top + 2 Bottom (4x6)',
      aspectRatio: '4:6',
      slotsCount: 3,
      canvasWidth: 1200,
      canvasHeight: 1800,
      description: '1 foto horizontal utama + 2 foto vertikal di bawah',
      slots: [
        { id: 's1', x: 6, y: 6, width: 88, height: 42, borderRadius: 12, aspectRatio: 16 / 9, shape: 'rect' },
        { id: 's2', x: 6, y: 51, width: 42, height: 38, borderRadius: 10, aspectRatio: 3 / 4, shape: 'rect' },
        { id: 's3', x: 52, y: 51, width: 42, height: 38, borderRadius: 10, aspectRatio: 3 / 4, shape: 'rect' },
      ],
    },
    {
      id: '4-6-postcard-6',
      name: 'Postcard Mini 6-Grid (4x6)',
      aspectRatio: '4:6',
      slotsCount: 6,
      canvasWidth: 1200,
      canvasHeight: 1800,
      description: '6 foto mini kolase pesta / teman sekelas',
      slots: [
        { id: 's1', x: 6, y: 5, width: 42, height: 26, borderRadius: 6, aspectRatio: 4 / 3, shape: 'rect' },
        { id: 's2', x: 52, y: 5, width: 42, height: 26, borderRadius: 6, aspectRatio: 4 / 3, shape: 'rect' },
        { id: 's3', x: 6, y: 34, width: 42, height: 26, borderRadius: 6, aspectRatio: 4 / 3, shape: 'rect' },
        { id: 's4', x: 52, y: 34, width: 42, height: 26, borderRadius: 6, aspectRatio: 4 / 3, shape: 'rect' },
        { id: 's5', x: 6, y: 63, width: 42, height: 26, borderRadius: 6, aspectRatio: 4 / 3, shape: 'rect' },
        { id: 's6', x: 52, y: 63, width: 42, height: 26, borderRadius: 6, aspectRatio: 4 / 3, shape: 'rect' },
      ],
    },

    // --- 3:4 PORTRAIT PRESETS ---
    {
      id: '3-4-twin-2',
      name: 'Twin Portrait (3:4)',
      aspectRatio: '3:4',
      slotsCount: 2,
      canvasWidth: 1200,
      canvasHeight: 1600,
      description: '2 foto vertikal bersanding elegan',
      slots: [
        { id: 's1', x: 6, y: 6, width: 42, height: 80, borderRadius: 12, aspectRatio: 3 / 4, shape: 'rect' },
        { id: 's2', x: 52, y: 6, width: 42, height: 80, borderRadius: 12, aspectRatio: 3 / 4, shape: 'rect' },
      ],
    },
    {
      id: '3-4-single',
      name: 'Single Portrait Studio (3:4)',
      aspectRatio: '3:4',
      slotsCount: 1,
      canvasWidth: 1200,
      canvasHeight: 1600,
      description: '1 foto potret studio fokus utama',
      slots: [
        { id: 's1', x: 8, y: 8, width: 84, height: 76, borderRadius: 16, aspectRatio: 3 / 4, shape: 'rect' },
      ],
    },

    // --- 9:16 STORY / TIKTOK PRESETS ---
    {
      id: '9-16-story-4',
      name: 'TikTok Story 4-Stack (9:16)',
      aspectRatio: '9:16',
      slotsCount: 4,
      canvasWidth: 1080,
      canvasHeight: 1920,
      description: 'Format layar penuh HP 9:16 siap upload Story & Reels',
      slots: [
        { id: 's1', x: 8, y: 5, width: 84, height: 20, borderRadius: 10, aspectRatio: 16 / 9, shape: 'rect' },
        { id: 's2', x: 8, y: 27, width: 84, height: 20, borderRadius: 10, aspectRatio: 16 / 9, shape: 'rect' },
        { id: 's3', x: 8, y: 49, width: 84, height: 20, borderRadius: 10, aspectRatio: 16 / 9, shape: 'rect' },
        { id: 's4', x: 8, y: 71, width: 84, height: 20, borderRadius: 10, aspectRatio: 16 / 9, shape: 'rect' },
      ],
    },
  ];

  /**
   * Get all presets filtered by aspect ratio
   */
  static getPresetsByRatio(ratio: GridAspectRatio): GridPreset[] {
    return this.PRESETS.filter((p) => p.aspectRatio === ratio);
  }

  /**
   * Generate dynamic slots for custom slot counts & aspect ratio
   */
  static generateDynamicSlots(slotCount: number, ratio: GridAspectRatio): PhotoSlot[] {
    // Check if exact preset exists
    const exact = this.PRESETS.find((p) => p.aspectRatio === ratio && p.slotsCount === slotCount);
    if (exact) {
      return [...exact.slots];
    }

    // Algorithmic fallbacks
    const slots: PhotoSlot[] = [];
    if (slotCount === 1) {
      slots.push({
        id: 'slot-1',
        x: 8,
        y: 8,
        width: 84,
        height: 80,
        borderRadius: 12,
        aspectRatio: ratio === '1:1' ? 1 : 4 / 3,
        shape: 'rect',
      });
      return slots;
    }

    if (slotCount === 2) {
      const isTall = ratio === '2:6' || ratio === '9:16';
      if (isTall) {
        slots.push(
          { id: 'slot-1', x: 8, y: 6, width: 84, height: 42, borderRadius: 10, aspectRatio: 4 / 3, shape: 'rect' },
          { id: 'slot-2', x: 8, y: 51, width: 84, height: 42, borderRadius: 10, aspectRatio: 4 / 3, shape: 'rect' }
        );
      } else {
        slots.push(
          { id: 'slot-1', x: 6, y: 8, width: 42, height: 80, borderRadius: 10, aspectRatio: 3 / 4, shape: 'rect' },
          { id: 'slot-2', x: 52, y: 8, width: 42, height: 80, borderRadius: 10, aspectRatio: 3 / 4, shape: 'rect' }
        );
      }
      return slots;
    }

    if (slotCount === 3) {
      slots.push(
        { id: 'slot-1', x: 8, y: 5, width: 84, height: 26, borderRadius: 8, aspectRatio: 4 / 3, shape: 'rect' },
        { id: 'slot-2', x: 8, y: 34, width: 84, height: 26, borderRadius: 8, aspectRatio: 4 / 3, shape: 'rect' },
        { id: 'slot-3', x: 8, y: 63, width: 84, height: 26, borderRadius: 8, aspectRatio: 4 / 3, shape: 'rect' }
      );
      return slots;
    }

    // Default 4-grid
    slots.push(
      { id: 'slot-1', x: 6, y: 6, width: 42, height: 42, borderRadius: 8, aspectRatio: 1, shape: 'rect' },
      { id: 'slot-2', x: 52, y: 6, width: 42, height: 42, borderRadius: 8, aspectRatio: 1, shape: 'rect' },
      { id: 'slot-3', x: 6, y: 52, width: 42, height: 42, borderRadius: 8, aspectRatio: 1, shape: 'rect' },
      { id: 'slot-4', x: 52, y: 52, width: 42, height: 42, borderRadius: 8, aspectRatio: 1, shape: 'rect' }
    );
    return slots;
  }

  /**
   * Clone and adapt an existing template into a newly chosen aspect ratio & slot count
   */
  static adaptTemplate(
    baseTemplate: TemplateData,
    targetRatio: GridAspectRatio,
    targetSlotsCount: number
  ): TemplateData {
    const preset = this.PRESETS.find(
      (p) => p.aspectRatio === targetRatio && p.slotsCount === targetSlotsCount
    );

    const newSlots = preset
      ? preset.slots.map((s) => ({
          ...s,
          // Preserve frame wrapper style if base template had one (e.g. polaroid or digicam)
          frameStyle: baseTemplate.photoSlots[0]?.frameStyle || s.frameStyle,
        }))
      : this.generateDynamicSlots(targetSlotsCount, targetRatio);

    let canvasWidth = baseTemplate.canvasWidth;
    let canvasHeight = baseTemplate.canvasHeight;

    if (preset) {
      canvasWidth = preset.canvasWidth;
      canvasHeight = preset.canvasHeight;
    } else {
      switch (targetRatio) {
        case '1:1':
          canvasWidth = 1600;
          canvasHeight = 1600;
          break;
        case '3:4':
          canvasWidth = 1200;
          canvasHeight = 1600;
          break;
        case '4:3':
          canvasWidth = 1600;
          canvasHeight = 1200;
          break;
        case '2:6':
          canvasWidth = 800;
          canvasHeight = 2400;
          break;
        case '4:6':
          canvasWidth = 1200;
          canvasHeight = 1800;
          break;
        case '9:16':
          canvasWidth = 1080;
          canvasHeight = 1920;
          break;
      }
    }

    return {
      ...baseTemplate,
      id: `${baseTemplate.id}-${targetRatio}-${targetSlotsCount}`,
      name: `${baseTemplate.name} (${targetRatio} • ${targetSlotsCount} Photos)`,
      aspectRatio: targetRatio,
      photoSlotsCount: targetSlotsCount,
      photoSlots: newSlots,
      canvasWidth,
      canvasHeight,
    };
  }
}
