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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Photo Filter Grids */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        <label style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-neutral-sub)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Sparkles size={16} color="#6366f1" /> PILIH FILTER WARNA
        </label>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
            gap: '0.6rem',
          }}
        >
          {FILTERS.map((f) => {
            const isActive = selectedFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => onSelectFilter(f.id)}
                className={`category-pill ${isActive ? 'active' : ''}`}
                style={{
                  padding: '0.6rem 0.8rem',
                  fontSize: '0.82rem',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* AI Beauty & Retouch Sliders Panel */}
      <div
        style={{
          background: 'var(--color-pink-soft)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.1rem 1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          border: '1px solid var(--color-border)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.88rem', color: 'var(--color-pink-primary)' }}>
          <Sliders size={16} />
          <span>AI Beauty Retouching (Tingkat Kehalusan & Cahaya)</span>
        </div>

        {/* Skin Smoothness Slider */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600 }}>
            <span>✨ AI Skin Smoothness (Kehalusan Kulit)</span>
            <span style={{ color: 'var(--color-pink-primary)', fontWeight: 700 }}>{skinSmoothness}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={skinSmoothness}
            onChange={(e) => onSkinSmoothnessChange && onSkinSmoothnessChange(Number(e.target.value))}
            style={{ accentColor: 'var(--color-pink-primary)', cursor: 'pointer', width: '100%' }}
          />
        </div>

        {/* Beauty Brightness Slider */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Sun size={14} color="#f59e0b" /> Beauty Studio Brightness (Pencahayaan)
            </span>
            <span style={{ color: 'var(--color-pink-primary)', fontWeight: 700 }}>{beautyBrightness}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={beautyBrightness}
            onChange={(e) => onBeautyBrightnessChange && onBeautyBrightnessChange(Number(e.target.value))}
            style={{ accentColor: 'var(--color-pink-primary)', cursor: 'pointer', width: '100%' }}
          />
        </div>
      </div>
    </div>
  );
};
