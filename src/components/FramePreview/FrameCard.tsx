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
  const cardId = template.id;
  const isScrapbook = cardId.includes('scrapbook');
  const isPolaroid = cardId.includes('polaroid');
  const isFilm = cardId.includes('film') || template.style === 'film-strip';
  const isTicket = cardId.includes('ticket') || template.style === 'ticket';
  const isNewspaper = cardId.includes('newspaper') || template.style === 'newspaper';
  const isCute = cardId.includes('cute') || cardId.includes('sticker') || template.style === 'cute-bear';
  const isCamera = cardId.includes('camera') || template.style === 'vintage-camera';
  const isMinimal = cardId.includes('minimal') || template.style === 'minimal-modern';
  const isY2K = cardId.includes('y2k') || cardId.includes('digicam');
  const isPostcard = cardId.includes('postcard');
  const isRomantic = cardId.includes('romantic') || cardId.includes('flower');
  const isClassic = cardId.includes('classic') || cardId.includes('photobooth');

  // Dynamic Card Background & Style based on Card Personality
  let cardBg = '#ffffff';
  let cardBorder = isSelected ? '2px solid var(--color-burgundy-deep)' : '1px solid var(--color-border)';
  let cardShadow = isSelected ? '0 12px 28px rgba(92, 6, 18, 0.2)' : '0 6px 20px rgba(0, 0, 0, 0.05)';

  if (isScrapbook) {
    cardBg = '#FFFDF9';
    cardBorder = isSelected ? '2px solid #800020' : '1px solid #E5E0D8';
  } else if (isPolaroid) {
    cardBg = '#FFFFFF';
    cardShadow = '0 10px 25px rgba(0,0,0,0.08)';
  } else if (isFilm) {
    cardBg = '#18181B';
    cardBorder = isSelected ? '2px solid #F59E0B' : '1px solid #27272A';
  } else if (isTicket) {
    cardBg = '#FDFBF7';
    cardBorder = isSelected ? '2px solid #800020' : '2px dashed #800020';
  } else if (isNewspaper) {
    cardBg = '#F9F6EE';
    cardBorder = isSelected ? '2px solid #18181B' : '1px solid #D4D0C7';
  } else if (isCute) {
    cardBg = '#FFF0F5';
    cardBorder = isSelected ? '2px solid #F43F5E' : '1px solid #FECDD3';
  } else if (isCamera) {
    cardBg = '#26201C';
    cardBorder = isSelected ? '2px solid #E07A5F' : '1px solid #3A302A';
  } else if (isMinimal) {
    cardBg = '#FAF8F5';
    cardBorder = isSelected ? '2px solid #800020' : '1px solid #D4AF37';
  } else if (isY2K) {
    cardBg = '#E0F2FE';
    cardBorder = isSelected ? '2px solid #0284C7' : '1px solid #BAE6FD';
  } else if (isPostcard) {
    cardBg = '#FDFBF7';
    cardBorder = isSelected ? '2px solid #800020' : '1px solid #E2E8F0';
  } else if (isRomantic) {
    cardBg = '#FFE4E6';
    cardBorder = isSelected ? '2px solid #BE123C' : '1px solid #FECDD3';
  } else if (isClassic) {
    cardBg = '#800020';
    cardBorder = isSelected ? '2px solid #FFFFFF' : '1px solid #5C0612';
  }

  const textColor = isFilm || isCamera || isClassic ? '#FFFFFF' : 'inherit';

  return (
    <div
      className={`frame-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(template)}
      style={{
        position: 'relative',
        background: cardBg,
        border: cardBorder,
        boxShadow: cardShadow,
        borderRadius: isTicket ? '16px' : isFilm ? '6px' : '14px',
        overflow: 'visible',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
      }}
    >
      {/* Selected Checkmark Badge */}
      {isSelected && (
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
            boxShadow: '0 4px 10px rgba(211, 47, 47, 0.4)',
          }}
        >
          ✓
        </div>
      )}

      {/* Decorative Washi Tape / Notches / Stamps based on Card Style */}
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
      {isTicket && (
        <>
          <div style={{ position: 'absolute', left: '-10px', top: '50%', width: '20px', height: '20px', background: 'var(--color-bg-primary)', borderRadius: '50%', zIndex: 15 }} />
          <div style={{ position: 'absolute', right: '-10px', top: '50%', width: '20px', height: '20px', background: 'var(--color-bg-primary)', borderRadius: '50%', zIndex: 15 }} />
        </>
      )}
      {isCute && (
        <div style={{ position: 'absolute', top: '-12px', right: '12px', fontSize: '24px', zIndex: 25, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }}>
          🧸
        </div>
      )}
      {isPostcard && (
        <div style={{ position: 'absolute', top: '10px', right: '12px', fontSize: '26px', zIndex: 20 }}>
          📮
        </div>
      )}
      {isFilm && (
        <div style={{ position: 'absolute', top: '6px', left: '10px', fontSize: '10px', fontFamily: 'monospace', color: '#F59E0B', zIndex: 20 }}>
          35MM KODAK #01
        </div>
      )}
      {isY2K && (
        <div style={{ position: 'absolute', top: '8px', left: '12px', fontSize: '11px', fontWeight: 800, color: '#EF4444', zIndex: 20 }}>
          🔴 REC
        </div>
      )}

      {/* Badges Header */}
      <div className="frame-card-badges" style={{ zIndex: 15 }}>
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

      {/* Frame Preview Container */}
      <div className="frame-card-preview-wrapper" style={{ transform: isScrapbook ? 'rotate(-1.5deg)' : isPolaroid ? 'rotate(1deg)' : 'none' }}>
        <FrameRender template={template} />
        <div className="frame-card-hover-overlay">
          <button className="btn-primary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem', boxShadow: '0 8px 20px rgba(255, 117, 151, 0.4)' }}>
            <span>Pilih Bingkai ✨</span>
          </button>
        </div>
      </div>

      {/* Top Badges (NEW / POPULER) */}
      <div
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          zIndex: 6,
          display: 'flex',
          gap: '0.4rem',
        }}
      >
        {template.isPopular && (
          <span
            style={{
              background: '#F97316',
              color: '#FFFFFF',
              fontSize: '0.68rem',
              fontWeight: 800,
              padding: '0.2rem 0.6rem',
              borderRadius: '9999px',
              letterSpacing: '0.05em',
              boxShadow: '0 4px 10px rgba(249, 115, 22, 0.35)',
            }}
          >
            POPULER
          </span>
        )}
        {template.isNew && (
          <span
            style={{
              background: '#EF4444',
              color: '#FFFFFF',
              fontSize: '0.68rem',
              fontWeight: 800,
              padding: '0.2rem 0.6rem',
              borderRadius: '9999px',
              letterSpacing: '0.05em',
              boxShadow: '0 4px 10px rgba(239, 68, 68, 0.35)',
            }}
          >
            NEW
          </span>
        )}
      </div>

      <div className="frame-card-preview-wrapper" style={{ transform: isScrapbook ? 'rotate(-1deg)' : 'none' }}>
        <FrameRender template={template} />
        <div className="frame-card-hover-overlay">
          <button className="btn-primary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem', boxShadow: '0 8px 20px rgba(128, 0, 32, 0.4)' }}>
            <span>Pilih Bingkai ✦</span>
          </button>
        </div>
      </div>

      {/* Card Info Section Matching Mockup */}
      <div className="frame-card-info" style={{ color: textColor, paddingTop: '0.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <h3
            className="frame-card-title"
            style={{
              color: textColor,
              fontFamily: 'var(--font-heading)',
              fontSize: '1.02rem',
              fontWeight: 800,
            }}
          >
            {template.name}
          </h3>

          {/* Heart Favorite Button */}
          <button
            onClick={(e) => onToggleFavorite(template.id, e)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.2rem',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isFavorite ? '#D22B2B' : 'var(--color-neutral-muted)',
              transition: 'transform 0.2s ease',
            }}
            title={isFavorite ? 'Hapus dari Favorit' : 'Tambah ke Favorit'}
          >
            <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} color={isFavorite ? '#D22B2B' : '#A1A1AA'} />
          </button>
        </div>

        {/* Subtitle matching Mockup "Category • X Foto" */}
        <p
          className="frame-card-subtitle"
          style={{
            color: isFilm || isCamera || isClassic ? 'rgba(255,255,255,0.75)' : 'var(--color-neutral-sub)',
            fontSize: '0.82rem',
            fontWeight: 600,
            textTransform: 'capitalize',
            margin: 0,
          }}
        >
          {template.category} • {template.photoSlotsCount} Foto
        </p>
      </div>
    </div>
  );
};

