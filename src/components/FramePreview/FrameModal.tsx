import React from 'react';
import { Camera, Heart } from 'lucide-react';
import type { TemplateData } from '../../types/template';
import { Modal } from '../Common/Modal';
import { Button } from '../Common/Button';
import { Badge } from '../Common/Badge';
import { FrameRender } from './FrameRender';

interface FrameModalProps {
  template: TemplateData | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (template: TemplateData) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}

export const FrameModal: React.FC<FrameModalProps> = ({
  template,
  isOpen,
  onClose,
  onConfirm,
  isFavorite,
  onToggleFavorite,
}) => {
  if (!template) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'start' }}>
        {/* Left column: Frame preview */}
        <div
          style={{
            background: 'var(--color-cream-dark)',
            borderRadius: 'var(--radius-lg)',
            padding: '1rem',
            aspectRatio: '2/3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'inset 0 0 16px rgba(0,0,0,0.06)',
          }}
        >
          <FrameRender template={template} />
        </div>

        {/* Right column: Specs & CTA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <Badge variant={template.category}>{template.category.toUpperCase()}</Badge>
              <button
                className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                onClick={(e) => onToggleFavorite(template.id, e)}
              >
                <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
              </button>
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800 }}>{template.name}</h2>
            {template.subtitle && (
              <p style={{ color: 'var(--color-neutral-sub)', fontSize: '0.9rem', marginTop: '0.2rem' }}>{template.subtitle}</p>
            )}
          </div>

          <div
            style={{
              background: 'var(--color-cream-bg)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem',
              fontSize: '0.88rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-neutral-sub)' }}>Photo Slots:</span>
              <strong style={{ color: 'var(--color-pink-primary)' }}>{template.photoSlotsCount} Photos</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-neutral-sub)' }}>Frame Style:</span>
              <span style={{ fontWeight: 600, textTransform: 'capitalize' }}>{template.style.replace('-', ' ')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-neutral-sub)' }}>Print Aspect Ratio:</span>
              <span style={{ fontWeight: 600 }}>{template.aspectRatio}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-neutral-sub)' }}>Default Resolution:</span>
              <span style={{ fontWeight: 600 }}>{template.canvasWidth} × {template.canvasHeight} px</span>
            </div>
          </div>

          {/* Color Palettes preview */}
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-neutral-sub)', marginBottom: '0.4rem' }}>
              CUSTOMIZABLE PALETTES
            </div>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {template.colorPalettes.map((c, i) => (
                <div
                  key={i}
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: c,
                    border: '1px solid rgba(0,0,0,0.1)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {template.tags.map((t) => (
              <span key={t} style={{ fontSize: '0.75rem', color: 'var(--color-neutral-sub)', background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                #{t}
              </span>
            ))}
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
            <Button
              variant="primary"
              style={{ width: '100%', padding: '0.9rem', fontSize: '1rem' }}
              onClick={() => onConfirm(template)}
            >
              <Camera size={18} />
              <span>Use This Frame</span>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
