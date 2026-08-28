import React, { useState } from 'react';
import type { TemplateData } from '../types/template';
import { TemplateService } from '../services/template/templateService';
import { StorageService } from '../services/storage/storageService';
import { Search, Heart, Camera, Sparkles } from 'lucide-react';

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

      {/* Dual Column Masonry Card Gallery Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1rem',
          marginTop: '0.5rem',
        }}
      >
        {filteredTemplates.map((template: TemplateData, index: number) => {
          const isFav = favorites.includes(template.id);
          const sampleImg = template.samplePhotos?.[0];
          return (
            <div
              key={template.id}
              onClick={() => onSelectFrame(template)}
              style={{
                position: 'relative',
                background: '#ffffff',
                borderRadius: 'var(--radius-lg)',
                padding: '0.75rem',
                border: '1px solid var(--color-border-soft)',
                boxShadow: '0 8px 24px rgba(92, 6, 18, 0.08)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              {/* Star Accent on alternating cards */}
              {index % 2 === 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '12px',
                    fontSize: '1.2rem',
                    color: '#fecdd3',
                    zIndex: 2,
                  }}
                >
                  ★
                </span>
              )}

              {/* Card Image Preview */}
              <div
                style={{
                  width: '100%',
                  aspectRatio: template.aspectRatio === '2:3' ? '2/3' : '1/1',
                  background: template.backgroundColor || '#f5ebe6',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {sampleImg ? (
                  <img
                    src={sampleImg}
                    alt={template.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ textAlign: 'center', padding: '0.5rem' }}>
                    <Sparkles size={24} color="var(--color-burgundy-deep)" />
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginTop: '0.25rem' }}>
                      {template.name}
                    </span>
                  </div>
                )}

                {/* Heart Favorite Badge */}
                <button
                  onClick={(e) => toggleFavorite(template.id, e)}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(4px)',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: isFav ? '#e11d48' : 'var(--color-neutral-sub)',
                  }}
                >
                  <Heart size={16} fill={isFav ? '#e11d48' : 'none'} />
                </button>
              </div>

              {/* Card Title & Slot Info */}
              <div style={{ textAlign: 'center', padding: '0.2rem 0' }}>
                <span
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: 'var(--color-neutral-sub)',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  {template.name} • {template.photoSlotsCount} Slots
                </span>
              </div>
            </div>
          );
        })}
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
