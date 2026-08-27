import React from 'react';
import type { PhotoFilterType } from '../../types/editor';
import { Sparkles } from 'lucide-react';

interface FilterPickerProps {
  selectedFilter: PhotoFilterType;
  onSelectFilter: (filter: PhotoFilterType) => void;
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
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
      <label style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-neutral-sub)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <Sparkles size={16} color="#ff7597" /> PHOTO FILTERS
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
  );
};
