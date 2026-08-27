import React from 'react';
import type { FrameCategory } from '../../types/template';

interface BadgeProps {
  children: React.ReactNode;
  variant?: FrameCategory | 'slot' | 'popular' | 'new' | 'default';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = '' }) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'cute': return 'badge-cute';
      case 'minimal': return 'badge-minimal';
      case 'vintage': return 'badge-vintage';
      case 'romantic': return 'badge-romantic';
      case 'friendship': return 'badge-friendship';
      case 'birthday': return 'badge-birthday';
      case 'graduation': return 'badge-graduation';
      case 'seasonal': return 'badge-seasonal';
      case 'slot': return 'badge-slot';
      case 'popular': return 'badge-cute';
      case 'new': return 'badge-friendship';
      default: return 'badge-minimal';
    }
  };

  return <span className={`badge-pill ${getVariantClass()} ${className}`}>{children}</span>;
};
