import React from 'react';
import type { ARFilterType } from '../../services/ai/arFilterService';
import { Sparkles } from 'lucide-react';

interface ARFilterBarProps {
  activeFilter: ARFilterType;
  onSelectFilter: (filter: ARFilterType) => void;
}

interface ARFilterItem {
  id: ARFilterType;
  label: string;
  emoji: string;
  badge: string;
}

export const ARFilterBar: React.FC<ARFilterBarProps> = ({
  activeFilter,
  onSelectFilter,
}) => {
  const filters: ARFilterItem[] = [
    { id: 'none', label: 'Off', emoji: '🚫', badge: 'Normal' },
    { id: 'beauty', label: 'Beauty', emoji: '✨', badge: 'Glow' },
    { id: 'bunny', label: 'Bunny', emoji: '🐰', badge: 'Cute' },
    { id: 'cat', label: 'Cat', emoji: '🐱', badge: 'Meow' },
    { id: 'y2k', label: 'Y2K', emoji: '🕶️', badge: 'Retro' },
    { id: 'angel', label: 'Angel', emoji: '😇', badge: 'Halo' },
    { id: 'sparkles', label: 'Sparkles', emoji: '⭐', badge: 'Anime' },
    { id: 'hearts', label: 'Hearts', emoji: '💖', badge: 'Love' },
  ];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        overflowX: 'auto',
        padding: '0.4rem 0.6rem',
        background: 'rgba(26, 26, 36, 0.75)',
        backdropFilter: 'blur(16px)',
        borderRadius: '9999px',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35)',
        maxWidth: '100%',
      }}
      className="no-scrollbar"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', paddingLeft: '0.4rem', color: '#ffb3c6', fontSize: '0.75rem', fontWeight: 800 }}>
        <Sparkles size={14} />
        <span>AR</span>
      </div>

      {filters.map((item) => {
        const isSelected = activeFilter === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectFilter(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.35rem 0.8rem',
              borderRadius: '9999px',
              border: isSelected ? '2px solid #ff4d6d' : '1px solid rgba(255, 255, 255, 0.12)',
              background: isSelected
                ? 'linear-gradient(135deg, #800020 0%, #d90429 100%)'
                : 'rgba(255, 255, 255, 0.08)',
              color: '#ffffff',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: isSelected ? 'scale(1.06)' : 'scale(1)',
              boxShadow: isSelected ? '0 4px 16px rgba(217, 4, 41, 0.45)' : 'none',
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>{item.emoji}</span>
            <span style={{ fontSize: '0.78rem', fontWeight: isSelected ? 800 : 600 }}>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
