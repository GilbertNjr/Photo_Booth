import React from 'react';
import type { PlacedSticker } from '../../types/editor';
import { Smile, Trash2 } from 'lucide-react';

interface StickerPickerProps {
  onAddSticker: (content: string) => void;
  placedStickers: PlacedSticker[];
  onRemoveSticker: (id: string) => void;
}

export const STICKER_CATALOG = [
  '💖', '🎀', '⭐', '🌸', '✨', '🧸', '🐰', '🍰',
  '📸', '👑', '☕', '🎈', '🎂', '🎓', '🌊', '☀️',
  '🍓', '🎵', '⚡', '💌', '🍀', '🦋', '🌙', '🍒',
];

export const StickerPicker: React.FC<StickerPickerProps> = ({
  onAddSticker,
  placedStickers,
  onRemoveSticker,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <label style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-neutral-sub)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <Smile size={16} color="#f59e0b" /> ADD DECORATIVE STICKERS
      </label>

      {/* Catalog Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          gap: '0.4rem',
          background: 'var(--color-cream-bg)',
          padding: '0.75rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border-soft)',
        }}
      >
        {STICKER_CATALOG.map((st, i) => (
          <button
            key={i}
            onClick={() => onAddSticker(st)}
            style={{
              fontSize: '1.5rem',
              padding: '0.35rem',
              borderRadius: 'var(--radius-sm)',
              background: 'white',
              border: '1px solid var(--color-border-soft)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.15s ease',
              boxShadow: 'var(--shadow-sm)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            title="Click to add sticker to canvas"
          >
            {st}
          </button>
        ))}
      </div>

      {/* Placed Stickers List */}
      {placedStickers.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-neutral-sub)' }}>
            PLACED STICKERS ({placedStickers.length})
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {placedStickers.map((st) => (
              <div
                key={st.id}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.3rem 0.65rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'white',
                  border: '1px solid var(--color-border)',
                  fontSize: '0.85rem',
                }}
              >
                <span>{st.content}</span>
                <button
                  onClick={() => onRemoveSticker(st.id)}
                  style={{ color: 'var(--color-favorite)', display: 'flex', alignItems: 'center' }}
                  title="Delete sticker"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
