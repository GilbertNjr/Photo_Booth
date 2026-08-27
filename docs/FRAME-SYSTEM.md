# Frame System & Data Specification — Photo Booth Web App

## 1. Overview
The Frame System is entirely **data-driven**. Every template is defined as a TypeScript configuration object. Adding new frames requires zero modifications to core UI logic.

## 2. Template Schema (`TemplateData`)

```typescript
export type FrameCategory = 
  | 'cute' 
  | 'minimal' 
  | 'vintage' 
  | 'romantic' 
  | 'friendship' 
  | 'birthday' 
  | 'graduation' 
  | 'seasonal';

export type FrameStyle = 
  | 'scrapbook' 
  | 'vintage-camera' 
  | 'cute-bear' 
  | 'ticket' 
  | 'film-strip' 
  | 'newspaper' 
  | 'polaroid' 
  | 'minimal-modern';

export interface PhotoSlot {
  id: string;
  x: number;          // % relative to canvas width
  y: number;          // % relative to canvas height
  width: number;      // % width
  height: number;     // % height
  rotation?: number;  // degree tilt (-15 to 15)
  borderRadius?: number; // px or %
  aspectRatio?: number; // width/height ratio
}

export interface DecorativeElement {
  id: string;
  type: 'sticker' | 'tape' | 'doodle' | 'text' | 'badge' | 'barcode' | 'sprocket' | 'stamp';
  content: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  rotation?: number;
  color?: string;
  fontFamily?: string;
  fontSize?: number;
}

export interface TextElement {
  id: string;
  defaultText: string;
  placeholder: string;
  x: number;
  y: number;
  fontFamily: string;
  fontSize: number;
  color: string;
  align?: 'left' | 'center' | 'right';
  isEditable: boolean;
}

export interface TemplateData {
  id: string;
  name: string;
  subtitle?: string;
  category: FrameCategory;
  style: FrameStyle;
  photoSlotsCount: number;
  aspectRatio: string; // "2:6", "4:6", "1:1", etc.
  canvasWidth: number;
  canvasHeight: number;
  backgroundColor: string;
  backgroundTexture?: 'none' | 'paper' | 'film-grain' | 'grid' | 'dots' | 'vintage-paper';
  backgroundGradient?: string;
  frameBorderColor: string;
  frameBorderWidth: number;
  frameBorderRadius: number;
  accentColor: string;
  textColor: string;
  colorPalettes: string[];
  photoSlots: PhotoSlot[];
  decorativeElements: DecorativeElement[];
  textElements: TextElement[];
  tags: string[];
  isPopular?: boolean;
  isNew?: boolean;
}
```

## 3. How to Add a New Frame
1. Open or create a file in `src/data/templates/` (e.g. `src/data/templates/cute.ts`).
2. Construct a new `TemplateData` object adhering to the schema above.
3. Export the template object and add it to the exported array in `src/data/templates/index.ts`.
4. The system will automatically index, render, and filter the new frame across the application!
