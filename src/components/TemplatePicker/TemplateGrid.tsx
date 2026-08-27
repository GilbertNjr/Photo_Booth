import React from 'react';
import type { TemplateData } from '../../types/template';
import { FrameCard } from '../FramePreview/FrameCard';

interface TemplateGridProps {
  templates: TemplateData[];
  favorites: string[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectTemplate: (template: TemplateData) => void;
}

export const TemplateGrid: React.FC<TemplateGridProps> = ({
  templates,
  favorites,
  onToggleFavorite,
  onSelectTemplate,
}) => {
  if (templates.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '4rem 1rem',
          background: 'white',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-sm)',
          margin: '2rem 0',
        }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>✨</div>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 700 }}>
          No frame templates found
        </h3>
        <p style={{ color: 'var(--color-neutral-sub)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
          Try clearing your search or selecting a different category pill.
        </p>
      </div>
    );
  }

  return (
    <div
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
          onToggleFavorite={onToggleFavorite}
          onSelect={onSelectTemplate}
        />
      ))}
    </div>
  );
};
