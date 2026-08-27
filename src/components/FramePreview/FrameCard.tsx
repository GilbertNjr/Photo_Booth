import React from 'react';
import { Heart, Image as ImageIcon } from 'lucide-react';
import type { TemplateData } from '../../types/template';
import { Badge } from '../Common/Badge';
import { FrameRender } from './FrameRender';

interface FrameCardProps {
  template: TemplateData;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelect: (template: TemplateData) => void;
}

export const FrameCard: React.FC<FrameCardProps> = ({
  template,
  isFavorite,
  onToggleFavorite,
  onSelect,
}) => {
  return (
    <div className="frame-card" onClick={() => onSelect(template)}>
      <div className="frame-card-badges">
        <Badge variant="slot">
          <ImageIcon size={12} />
          <span>{template.photoSlotsCount} Photos</span>
        </Badge>

        <button
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={(e) => onToggleFavorite(template.id, e)}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="frame-card-preview-wrapper">
        <FrameRender template={template} />
        <div className="frame-card-hover-overlay">
          <button className="btn-primary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem', boxShadow: '0 8px 20px rgba(255, 117, 151, 0.4)' }}>
            <span>Pilih Bingkai ✨</span>
          </button>
        </div>
      </div>

      <div className="frame-card-info">
        <div className="frame-card-header">
          <h3 className="frame-card-title">{template.name}</h3>
          {template.isNew && (
            <Badge variant="new">NEW</Badge>
          )}
        </div>

        {template.subtitle && (
          <p className="frame-card-subtitle">{template.subtitle}</p>
        )}

        <div className="frame-card-tags">
          <Badge variant={template.category}>{template.category.toUpperCase()}</Badge>
          <span
            style={{
              fontSize: '0.72rem',
              color: 'var(--color-neutral-sub)',
              background: 'var(--color-cream-dark)',
              padding: '0.2rem 0.55rem',
              borderRadius: 'var(--radius-full)',
              textTransform: 'capitalize',
            }}
          >
            {template.style.replace('-', ' ')}
          </span>
        </div>
      </div>
    </div>
  );
};
