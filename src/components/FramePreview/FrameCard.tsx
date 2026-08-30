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

export const FrameCard: React.FC<FrameCardProps> = React.memo(
  ({
    template,
    isFavorite,
    isSelected = false,
    onToggleFavorite,
    onSelect,
  }) => {
    const cardId = template.id;
    const isScrapbook = cardId.includes('scrapbook');
    const isFilm = cardId.includes('film') || template.style === 'film-strip';
    const isCute = cardId.includes('cute') || cardId.includes('sticker') || template.style === 'cute-bear';
    const isCamera = cardId.includes('camera') || template.style === 'vintage-camera';
    const isClassic = cardId.includes('classic') || cardId.includes('photobooth');

    // Clean, unified UI card container styling (no duplicate frame borders)
    const isDarkCard = isFilm || isCamera || isClassic;
    const cardBg = isDarkCard ? '#18181B' : '#FFFFFF';
    const cardBorder = isSelected
      ? '2px solid #800020'
      : isDarkCard
      ? '1px solid #27272A'
      : '1px solid #EBE5DB';
    const cardShadow = isSelected
      ? '0 12px 28px rgba(128, 0, 32, 0.25), 0 0 0 3px rgba(128, 0, 32, 0.15)'
      : '0 4px 16px rgba(0, 0, 0, 0.05)';

    const textColor = isDarkCard ? '#FFFFFF' : 'var(--color-neutral-dark)';

    return (
      <div
        className={`frame-card ${isSelected ? 'selected' : ''}`}
        onClick={() => onSelect(template)}
        style={{
          position: 'relative',
          background: cardBg,
          border: cardBorder,
          boxShadow: cardShadow,
          borderRadius: '18px',
          padding: '0.85rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          overflow: 'visible',
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Selected Checkmark Badge */}
        <div
          style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: 'var(--color-pink-primary)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.9rem',
            fontWeight: 900,
            zIndex: 30,
            boxShadow: '0 4px 10px rgba(128, 0, 32, 0.4)',
            opacity: isSelected ? 1 : 0,
            transform: isSelected ? 'scale(1)' : 'scale(0.7)',
            pointerEvents: 'none',
            transition: 'opacity var(--motion-fast), transform var(--motion-fast)',
          }}
        >
          ✓
        </div>

        {/* Decorative Washi Tape / Stamps */}
        {isScrapbook && (
          <div
            style={{
              position: 'absolute',
              top: '-8px',
              left: '20px',
              width: '45px',
              height: '14px',
              background: 'rgba(255, 235, 185, 0.85)',
              transform: 'rotate(-4deg)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              zIndex: 20,
            }}
          />
        )}
        {isCute && (
          <div style={{ position: 'absolute', top: '-12px', right: '12px', fontSize: '24px', zIndex: 25, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }}>
            🧸
          </div>
        )}

        {/* Badges & Favorite Header Row */}
        <div className="frame-card-header-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', minWidth: 0, zIndex: 15, flexWrap: 'wrap', gap: '0.2rem' }}>
          <Badge variant="slot">
            <ImageIcon size={11} />
            <span>{template.photoSlotsCount} Foto</span>
          </Badge>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', flexWrap: 'wrap' }}>
            {template.isPopular && (
              <span
                style={{
                  background: '#F97316',
                  color: '#FFFFFF',
                  fontSize: '0.55rem',
                  fontWeight: 800,
                  padding: '0.12rem 0.35rem',
                  borderRadius: '9999px',
                  letterSpacing: '0.02em',
                  boxShadow: '0 2px 6px rgba(249, 115, 22, 0.3)',
                }}
              >
                POPULER
              </span>
            )}
            {template.isNew && !template.isPopular && (
              <span
                style={{
                  background: '#EF4444',
                  color: '#FFFFFF',
                  fontSize: '0.55rem',
                  fontWeight: 800,
                  padding: '0.12rem 0.35rem',
                  borderRadius: '9999px',
                  letterSpacing: '0.02em',
                  boxShadow: '0 2px 6px rgba(239, 68, 68, 0.3)',
                }}
              >
                NEW
              </span>
            )}

            <button
              className={`favorite-btn ${isFavorite ? 'active' : ''}`}
              onClick={(e) => onToggleFavorite(template.id, e)}
              title={isFavorite ? 'Hapus dari Favorit' : 'Tambah ke Favorit'}
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: '#ffffff',
                border: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: isFavorite ? '#D22B2B' : '#A1A1AA',
                boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
              }}
            >
              <Heart size={12} fill={isFavorite ? 'currentColor' : 'none'} color={isFavorite ? '#D22B2B' : '#A1A1AA'} />
            </button>
          </div>
        </div>

        {/* Frame Preview Container */}
        <div className="frame-card-preview-wrapper" style={{ width: '100%', minWidth: 0 }}>
          <FrameRender template={template} />
        </div>

        {/* Card Info Footer */}
        <div className="frame-card-info" style={{ color: textColor, paddingTop: '0.15rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%', minWidth: 0 }}>
          <div style={{ minWidth: 0 }}>
            <h3
              className="frame-card-title"
              style={{
                color: textColor,
                fontFamily: 'var(--font-heading)',
                fontSize: '0.96rem',
                fontWeight: 800,
                margin: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {template.name}
            </h3>

            <p
              className="frame-card-subtitle"
              style={{
                color: isFilm || isCamera || isClassic ? 'rgba(255,255,255,0.75)' : 'var(--color-neutral-sub)',
                fontSize: '0.78rem',
                fontWeight: 600,
                textTransform: 'capitalize',
                margin: '0.15rem 0 0 0',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {template.category} • {template.photoSlotsCount} Foto
            </p>
          </div>

          {/* Clean "Pakai Bingkai" Button under each card */}
          <button
            className="use-frame-card-btn"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(template);
            }}
            style={{
              width: '100%',
              padding: '0.55rem 0.85rem',
              borderRadius: '12px',
              background: isSelected ? 'var(--color-burgundy-deep)' : '#800020',
              color: '#ffffff',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
              boxShadow: '0 4px 12px rgba(128, 0, 32, 0.2)',
              transition: 'transform 0.15s ease, background 0.15s ease',
            }}
          >
            <span>Pakai Bingkai</span>
            <span style={{ fontSize: '0.9rem' }}>➔</span>
          </button>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.isSelected === nextProps.isSelected &&
    prevProps.isFavorite === nextProps.isFavorite &&
    prevProps.template.id === nextProps.template.id
);
