import React from 'react';
import type { PlacedSticker } from '../../types/editor';
import { Smile, Trash2, RotateCw, Maximize2, Move, ZoomIn, ZoomOut } from 'lucide-react';
import { StickerIllustration } from '../Common/StickerIllustration';

interface StickerPickerProps {
  onAddSticker: (content: string) => void;
  placedStickers: PlacedSticker[];
  onRemoveSticker: (id: string) => void;
  onUpdateSticker?: (id: string, updates: Partial<PlacedSticker>) => void;
  selectedStickerId?: string | null;
  onSelectSticker?: (id: string | null) => void;
}

export const STICKER_CATALOG = [
  '🎟️-pink-ticket', 'tag-curious', 'sun-tarot', 'pink-lily', 'cherub-angel', 'butterfly-pink',
  'movie-film-reel', '3d-star-gold', '♥-maroon', 'doodle-sparkle-white', '🎀', '💖',
  '⭐', '🌸', '✨', '🧸', '🐰', '🍰',
  '📸', '👑', '🍓', '🎵', '🦋', '🍒',
];

export const StickerPicker: React.FC<StickerPickerProps> = ({
  onAddSticker,
  placedStickers,
  onRemoveSticker,
  onUpdateSticker,
  selectedStickerId,
  onSelectSticker,
}) => {
  const activeSticker = placedStickers.find((s) => s.id === selectedStickerId);

  const handleAdjustScale = (delta: number) => {
    if (!activeSticker || !onUpdateSticker) return;
    const currentScale = activeSticker.scale || 1;
    const newScale = Math.max(0.3, Math.min(3.5, Math.round((currentScale + delta) * 100) / 100));
    onUpdateSticker(activeSticker.id, { scale: newScale });
  };

  const handleAdjustRotation = (delta: number) => {
    if (!activeSticker || !onUpdateSticker) return;
    const currentRot = activeSticker.rotation || 0;
    const newRot = (currentRot + delta) % 360;
    onUpdateSticker(activeSticker.id, { rotation: newRot });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <label style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-neutral-sub)', display: 'flex', alignItems: 'center', gap: '0.4rem', textTransform: 'uppercase' }}>
          <Smile size={18} color="#f59e0b" /> STIKER SCRAPBOOK & 3D CUTOUT
        </label>
        <span style={{ fontSize: '0.72rem', color: 'var(--color-neutral-sub)', fontWeight: 600 }}>
          Geser, perbesar & putar stiker ✨
        </span>
      </div>

      {/* Catalog Grid with 3D Drop-Shadow Effects */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '0.5rem',
          background: 'var(--color-cream-bg)',
          padding: '0.85rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border-soft)',
          maxHeight: '210px',
          overflowY: 'auto',
        }}
      >
        {STICKER_CATALOG.map((st, i) => (
          <button
            key={i}
            onClick={() => onAddSticker(st)}
            style={{
              minHeight: '44px',
              padding: '0.4rem',
              borderRadius: 'var(--radius-md)',
              background: '#ffffff',
              border: '1.5px solid var(--color-border-soft)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.15))',
              transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.15)';
              e.currentTarget.style.filter = 'drop-shadow(0 8px 16px rgba(0,0,0,0.25))';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.filter = 'drop-shadow(0 4px 6px rgba(0,0,0,0.15))';
            }}
            title="Klik untuk menempelkan stiker"
          >
            <StickerIllustration content={st} size={28} />
          </button>
        ))}
      </div>

      {/* Placed Stickers List & Selected Sticker Controls */}
      {placedStickers.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', background: '#fafaf9', padding: '0.85rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border-soft)' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-neutral-dark)', letterSpacing: '0.04em' }}>
            STIKER TERPASANG ({placedStickers.length})
          </span>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
            {placedStickers.map((st) => {
              const isSelected = st.id === selectedStickerId;
              return (
                <div
                  key={st.id}
                  onClick={() => onSelectSticker?.(st.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.35rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    background: isSelected ? 'var(--color-pink-soft)' : '#ffffff',
                    border: isSelected ? '2px solid var(--color-burgundy-deep)' : '1px solid var(--color-border)',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    boxShadow: isSelected ? '0 4px 12px rgba(128, 0, 32, 0.15)' : 'none',
                  }}
                >
                  <StickerIllustration content={st.content} size={20} />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveSticker(st.id);
                      if (selectedStickerId === st.id) onSelectSticker?.(null);
                    }}
                    style={{ color: 'var(--color-favorite)', display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: '2px' }}
                    title="Hapus Stiker"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Active Selected Sticker Fine-Tuning Sliders & Quick Buttons */}
          {activeSticker && onUpdateSticker && (
            <div style={{ marginTop: '0.5rem', paddingTop: '0.75rem', borderTop: '1px dashed var(--color-border)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-burgundy-deep)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Move size={14} /> Edit Ukuran & Posisi Stiker
                </span>
                <button
                  onClick={() => onRemoveSticker(activeSticker.id)}
                  style={{ fontSize: '0.75rem', color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }}
                >
                  Hapus
                </button>
              </div>

              {/* Scale Control with Tap Buttons (+ / -) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-neutral-sub)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Maximize2 size={13} /> UKURAN STIKER:
                  </span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-burgundy-deep)' }}>
                    {Math.round((activeSticker.scale || 1) * 100)}%
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleAdjustScale(-0.15)}
                    style={{
                      padding: '0.35rem 0.6rem',
                      borderRadius: '8px',
                      border: '1px solid var(--color-border)',
                      background: '#ffffff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.2rem',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                    }}
                    title="Perkecil stiker (-15%)"
                  >
                    <ZoomOut size={13} /> Perkecil
                  </button>

                  <input
                    type="range"
                    min="0.3"
                    max="3.0"
                    step="0.05"
                    value={activeSticker.scale || 1}
                    onChange={(e) => onUpdateSticker(activeSticker.id, { scale: parseFloat(e.target.value) })}
                    style={{ flex: 1, accentColor: 'var(--color-burgundy-deep)' }}
                  />

                  <button
                    onClick={() => handleAdjustScale(0.15)}
                    style={{
                      padding: '0.35rem 0.6rem',
                      borderRadius: '8px',
                      border: '1px solid var(--color-burgundy-deep)',
                      background: 'var(--color-pink-soft)',
                      color: 'var(--color-burgundy-deep)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.2rem',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                    }}
                    title="Perbesar stiker (+15%)"
                  >
                    <ZoomIn size={13} /> Perbesar
                  </button>
                </div>

                {/* Size Presets Pills */}
                <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', paddingTop: '0.2rem' }}>
                  {[0.5, 0.75, 1.0, 1.3, 1.7, 2.2].map((sVal) => {
                    const isCur = Math.abs((activeSticker.scale || 1) - sVal) < 0.05;
                    return (
                      <button
                        key={sVal}
                        onClick={() => onUpdateSticker(activeSticker.id, { scale: sVal })}
                        style={{
                          padding: '0.2rem 0.5rem',
                          borderRadius: '6px',
                          border: isCur ? '1px solid var(--color-burgundy-deep)' : '1px solid #e2e8f0',
                          background: isCur ? 'var(--color-burgundy-deep)' : '#ffffff',
                          color: isCur ? '#ffffff' : '#64748b',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        {Math.round(sVal * 100)}%
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Rotation Controls */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-neutral-sub)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <RotateCw size={13} /> ROTASI / PUTAR:
                  </span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-burgundy-deep)' }}>
                    {activeSticker.rotation || 0}°
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleAdjustRotation(-15)}
                    style={{
                      padding: '0.35rem 0.6rem',
                      borderRadius: '8px',
                      border: '1px solid var(--color-border)',
                      background: '#ffffff',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                    }}
                    title="Putar ke kiri (-15°)"
                  >
                    ↺ -15°
                  </button>

                  <input
                    type="range"
                    min="-180"
                    max="180"
                    step="5"
                    value={activeSticker.rotation || 0}
                    onChange={(e) => onUpdateSticker(activeSticker.id, { rotation: parseInt(e.target.value, 10) })}
                    style={{ flex: 1, accentColor: 'var(--color-burgundy-deep)' }}
                  />

                  <button
                    onClick={() => handleAdjustRotation(15)}
                    style={{
                      padding: '0.35rem 0.6rem',
                      borderRadius: '8px',
                      border: '1px solid var(--color-border)',
                      background: '#ffffff',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                    }}
                    title="Putar ke kanan (+15°)"
                  >
                    ↻ +15°
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
