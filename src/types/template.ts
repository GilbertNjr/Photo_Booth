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
  x: number;          // % x position (0 to 100)
  y: number;          // % y position (0 to 100)
  width: number;      // % width
  height: number;     // % height
  rotation?: number;  // degrees tilt (-45 to 45)
  borderRadius?: number; // px
  aspectRatio?: number; // width / height
}

export interface DecorativeElement {
  id: string;
  type: 'sticker' | 'tape' | 'doodle' | 'text' | 'badge' | 'barcode' | 'sprocket' | 'stamp';
  content: string;
  x: number;          // % x
  y: number;          // % y
  width?: number;     // % width or px
  height?: number;    // % height or px
  rotation?: number;  // degrees
  color?: string;
  fontFamily?: string;
  fontSize?: number;  // px or rem
  opacity?: number;
}

export interface TextElement {
  id: string;
  defaultText: string;
  placeholder: string;
  x: number;          // % x
  y: number;          // % y
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
  aspectRatio: string; // e.g. "2:6", "4:6", "1:1", "4:5"
  canvasWidth: number; // default rendering resolution e.g. 1200
  canvasHeight: number; // default rendering resolution e.g. 1800
  
  // Visual properties
  backgroundColor: string; // hex or CSS background
  backgroundTexture?: 'none' | 'paper' | 'film-grain' | 'grid' | 'dots' | 'vintage-paper';
  backgroundGradient?: string;
  frameBorderColor: string;
  frameBorderWidth: number;
  frameBorderRadius: number;
  accentColor: string;
  textColor: string;
  
  // Color palette choices for customization
  colorPalettes: string[];
  
  // Internal elements
  photoSlots: PhotoSlot[];
  decorativeElements: DecorativeElement[];
  textElements: TextElement[];
  
  tags: string[];
  isPopular?: boolean;
  isNew?: boolean;
}
