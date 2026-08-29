import React, { useState } from 'react';
import type { TemplateData } from '../types/template';
import { TemplateService } from '../services/template/templateService';
import { StorageService } from '../services/storage/storageService';
import { FrameCard } from '../components/FramePreview/FrameCard';
import { Search, Camera } from 'lucide-react';

interface GalleryViewProps {
  onSelectFrame: (template: TemplateData) => void;
  onGoToCamera: () => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({
  onSelectFrame,
  onGoToCamera,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'recent' | 'favorites' | 'events'>('all');
  const [favorites, setFavorites] = useState<string[]>(() => StorageService.getFavorites());

  const templates = TemplateService.getAllTemplates();

  const filteredTemplates = templates.filter((tpl: TemplateData) => {
    const matchesSearch = tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tpl.category.toLowerCase().includes(searchQuery.toLowerCase());
    if (selectedFilter === 'favorites') {
      return matchesSearch && favorites.includes(tpl.id);
    }
    return matchesSearch;
  });

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = StorageService.toggleFavorite(id);
    setFavorites(updated);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', paddingBottom: '100px', position: 'relative' }}>
      {/* Header Title "My Memories" */}
      <div style={{ margin: '0.5rem 0 0.25rem' }}>
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '2.4rem',
            fontWeight: 800,
            color: 'var(--color-burgundy-deep)',
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          My Memories
        </h1>
      </div>

      {/* Search Input Bar */}
      <div style={{ position: 'relative', width: '100%' }}>
        <Search
          size={18}
          color="var(--color-neutral-sub)"
          style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search memories..."
          style={{
            width: '100%',
            padding: '0.85rem 1rem 0.85rem 2.75rem',
            borderRadius: '9999px',
            border: '1px solid var(--color-border)',
            background: '#fcf8f6',
            fontSize: '0.95rem',
            boxSizing: 'border-box',
            outline: 'none',
          }}
        />
      </div>

      {/* Filter Category Pills (All, Recent, ♥ Favorites, Events) */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
        {[
          { id: 'all', label: 'All' },
          { id: 'recent', label: 'Recent' },
          { id: 'favorites', label: '♥ Favorites' },
          { id: 'events', label: 'Events' },
        ].map((tab) => {
          const isActive = selectedFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id as any)}
              style={{
                padding: '0.45rem 1.15rem',
                borderRadius: '9999px',
                fontSize: '0.88rem',
                fontWeight: isActive ? 800 : 600,
                background: isActive ? '#fecdd3' : '#ffffff',
                color: isActive ? '#881337' : 'var(--color-neutral-dark)',
                border: isActive ? '1px solid #fda4af' : '1px solid var(--color-border)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Gallery Frame Card Grid using 3D FrameCard Renderers */}
      <div className="frame-card-grid">
        {filteredTemplates.map((template: TemplateData) => (
          <FrameCard
            key={template.id}
            template={template}
            isFavorite={favorites.includes(template.id)}
            onToggleFavorite={toggleFavorite}
            onSelect={onSelectFrame}
          />
        ))}
      </div>

      {/* Floating Red Round Camera Action Button */}
      <button
        onClick={onGoToCamera}
        title="Start Photo Session"
        style={{
          position: 'fixed',
          bottom: '88px',
          right: '20px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'var(--color-pink-primary)',
          color: '#ffffff',
          border: 'none',
          boxShadow: '0 8px 24px rgba(211, 47, 47, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 1020,
          transition: 'transform 0.2s ease',
        }}
      >
        <Camera size={26} />
      </button>
    </div>
  );
};
