import type { TemplateData } from '../../types/template';
import { cutePink01 } from './cute';
import { vintageCamera01 } from './vintage';
import { newspaper01 } from './romantic';
import { ticket01 } from './friendship';
import { filmStrip01 } from './minimal';
import { cuteBear01 } from './birthday';
import { polaroid01 } from './graduation';
import { seasonalSummer01 } from './seasonal';

export const TEMPLATES: TemplateData[] = [
  cutePink01,
  vintageCamera01,
  newspaper01,
  ticket01,
  filmStrip01,
  cuteBear01,
  polaroid01,
  seasonalSummer01,
];

export * from './cute';
export * from './vintage';
export * from './romantic';
export * from './friendship';
export * from './minimal';
export * from './birthday';
export * from './graduation';
export * from './seasonal';
