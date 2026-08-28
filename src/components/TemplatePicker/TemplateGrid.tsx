import React from 'react';
import type { TemplateData } from '../../types/template';
import { FrameCard } from '../FramePreview/FrameCard';

interface TemplateGridProps {
  templates: TemplateData[];
  favorites: string[];
  selectedTemplateId?: string | null;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectTemplate: (template: TemplateData) => void;
  isShowingFavoritesOnly?: boolean;
}

export const TemplateGrid: React.FC<TemplateGridProps> = ({
  templates,
  favorites,
  selectedTemplateId,
  onToggleFavorite,
  onSelectTemplate,
  isShowingFavoritesOnly = false,
}) => {
  if (templates.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '4rem 1.5rem',
          background: 'white',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-sm)',
          margin: '2rem 0',
        }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
          {isShowingFavoritesOnly ? '♡' : '✨'}
        </div>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 700 }}>
          {isShowingFavoritesOnly ? 'Belum Ada Bingkai Favorit' : 'Tidak Ada Bingkai Ditemukan'}
        </h3>
        <p style={{ color: 'var(--color-neutral-sub)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
          {isShowingFavoritesOnly
            ? 'Klik ikon hati ♡ pada bingkai di Studio untuk menyimpannya di sini!'
            : 'Coba bersihkan pencarian atau pilih kategori lain.'}
        </p>
      </div>
    );
  }

  return (
    <div
      className="frame-card-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
        gap: '1.75rem',
        margin: '1.5rem 0',
      }}
    >
      {templates.map((template) => (
        <FrameCard
          key={template.id}
          template={template}
          isFavorite={favorites.includes(template.id)}
          isSelected={selectedTemplateId === template.id}
          onToggleFavorite={onToggleFavorite}
          onSelect={onSelectTemplate}
        />
      ))}
    </div>
  );
};
