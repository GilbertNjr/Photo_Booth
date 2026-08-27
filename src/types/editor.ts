import type { TemplateData } from './template';

export type PhotoFilterType = 
  | 'original' 
  | 'bright' 
  | 'warm' 
  | 'vintage' 
  | 'film' 
  | 'soft' 
  | 'bw' 
  | 'retro';

export interface StickerItem {
  id: string;
  name: string;
  category: string;
  content: string; // SVG data, emoji, or image URL
  type: 'emoji' | 'svg' | 'image';
}

export interface PlacedSticker {
  id: string;
  stickerId: string;
  content: string;
  x: number; // percentage on canvas
  y: number; // percentage on canvas
  scale: number;
  rotation: number;
}

export interface CustomizedText {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
  fontSize: number;
  fontFamily: string;
}

export interface PhotoSessionState {
  selectedTemplate: TemplateData | null;
  capturedPhotos: string[]; // Base64 image data URLs
  filter: PhotoFilterType;
  backgroundColor: string;
  customTexts: Record<string, string>; // maps text element id -> customized text
  placedStickers: PlacedSticker[];
}
