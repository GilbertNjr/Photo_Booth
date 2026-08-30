import React from 'react';
import type { PhotoFilterType } from '../../types/editor';
import { Sparkles, Sliders, Sun } from 'lucide-react';

interface FilterPickerProps {
  selectedFilter: PhotoFilterType;
  onSelectFilter: (filter: PhotoFilterType) => void;
  skinSmoothness?: number;
  onSkinSmoothnessChange?: (val: number) => void;
  beautyBrightness?: number;
  onBeautyBrightnessChange?: (val: number) => void;
}

export const FILTERS: { id: PhotoFilterType; label: string; previewClass?: string }[] = [
  { id: 'original', label: 'Original 🌿' },
  { id: 'bright', label: 'Bright ✨' },
  { id: 'warm', label: 'Warm Sunset 🌅' },
  { id: 'vintage', label: 'Vintage 📷' },
  { id: 'film', label: 'Film Grain 🎞️' },
  { id: 'soft', label: 'Soft Pastel 🌸' },
  { id: 'bw', label: 'B&W Classic 🖤' },
  { id: 'retro', label: 'Retro Pop 🎨' },
];

export const FilterPicker: React.FC<FilterPickerProps> = ({
  selectedFilter,
  onSelectFilter,
  skinSmoothness = 50,
  onSkinSmoothnessChange,
  beautyBrightness = 50,
  onBeautyBrightnessChange,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', boxSizing: 'border-box', overflow: 'hidden' }}>
      {/* Photo Filter Grids */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', width: '100%', boxSizing: 'border-box' }}>
        <label style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--color-neutral-sub)', display: 'flex', alignItems: 'center', gap: '0.4rem', textTransform: 'uppercase' }}>
          <Sparkles size={15} color="#D90429" /> PILIH FILTER WARNA
        </label>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
            gap: '0.5rem',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          {FILTERS.map((f) => {
            const isActive = selectedFilter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => onSelectFilter(f.id)}
                className={`category-pill ${isActive ? 'active' : ''}`}
                style={{
                  padding: '0.55rem 0.6rem',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  justifyContent: 'center',
                  textAlign: 'center',
                  width: '100%',
                  minWidth: 0,
                  boxSizing: 'border-box',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
                title={f.label}
              >
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: 0, display: 'block' }}>
                  {f.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* AI Beauty & Retouch Sliders Panel */}
      <div
        style={{
          background: 'rgba(253, 242, 244, 0.9)',
          borderRadius: '16px',
          padding: '0.9rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.85rem',
          border: '1px solid rgba(217, 4, 41, 0.15)',
          width: '100%',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 800, fontSize: '0.82rem', color: 'var(--color-burgundy-deep)', minWidth: 0 }}>
          <Sliders size={15} style={{ flexShrink: 0 }} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>AI Beauty & Retouching</span>
        </div>

        {/* Skin Smoothness Slider */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', width: '100%', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', width: '100%', minWidth: 0 }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-neutral-dark)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: 0 }}>
              ✨ Kehalusan Kulit (Smooth)
            </span>
            <span style={{ fontSize: '0.78rem', fontWeight: 900, color: 'var(--color-burgundy-deep)', flexShrink: 0 }}>
              {skinSmoothness}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={skinSmoothness}
            onChange={(e) => onSkinSmoothnessChange && onSkinSmoothnessChange(Number(e.target.value))}
            style={{ accentColor: 'var(--color-burgundy-deep)', cursor: 'pointer', width: '100%', margin: 0, boxSizing: 'border-box' }}
          />
        </div>

        {/* Beauty Brightness Slider */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', width: '100%', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', width: '100%', minWidth: 0 }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-neutral-dark)', display: 'flex', alignItems: 'center', gap: '0.3rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: 0 }}>
              <Sun size={14} color="#f59e0b" style={{ flexShrink: 0 }} /> Pencahayaan Studio (Light)
            </span>
            <span style={{ fontSize: '0.78rem', fontWeight: 900, color: 'var(--color-burgundy-deep)', flexShrink: 0 }}>
              {beautyBrightness}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={beautyBrightness}
            onChange={(e) => onBeautyBrightnessChange && onBeautyBrightnessChange(Number(e.target.value))}
            style={{ accentColor: 'var(--color-burgundy-deep)', cursor: 'pointer', width: '100%', margin: 0, boxSizing: 'border-box' }}
          />
        </div>
      </div>
    </div>
  );
};
