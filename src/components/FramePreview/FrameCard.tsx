import React from 'react';
import { Heart, Image as ImageIcon } from 'lucide-react';
import type { TemplateData } from '../../types/template';
import { Badge } from '../Common/Badge';
import { FrameRender } from './FrameRender';

interface FrameCardProps {
  template: TemplateData;
  isFavorite: boolean;
  isSelected?: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelect: (template: TemplateData) => void;
}

export const FrameCard: React.FC<FrameCardProps> = ({
  template,
  isFavorite,
  isSelected = false,
  onToggleFavorite,
  onSelect,
}) => {
  return (
    <div
      className={`frame-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(template)}
      style={{
        border: isSelected ? '2px solid var(--color-burgundy-deep)' : '1px solid var(--color-border)',
        boxShadow: isSelected ? '0 8px 24px rgba(92, 6, 18, 0.15)' : '0 4px 16px rgba(0, 0, 0, 0.04)',
      }}
    >
      {/* Selected Checkmark Badge */}
      {isSelected && (
        <div
          style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            background: 'var(--color-pink-primary)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.85rem',
            fontWeight: 900,
            zIndex: 10,
            boxShadow: '0 2px 8px rgba(211, 47, 47, 0.4)',
          }}
        >
          ✓
        </div>
      )}
      <div className="frame-card-badges">
        <Badge variant="slot">
          <ImageIcon size={12} />
          <span>{template.photoSlotsCount} Foto</span>
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

        <div className="frame-card-tags" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
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

          <button
            style={{
              padding: '0.35rem 0.75rem',
              fontSize: '0.78rem',
              fontWeight: 700,
              color: '#ffffff',
              background: 'var(--color-pink-primary)',
              border: 'none',
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(255, 117, 151, 0.3)',
              transition: 'transform 0.2s ease',
            }}
          >
            Pilih ➔
          </button>
        </div>
      </div>
    </div>
  );
};
