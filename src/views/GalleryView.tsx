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
          gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
          gap: '1.25rem',
          marginTop: '0.5rem',
        }}
      >
        {filteredTemplates.map((template: TemplateData, index: number) => {
          const isFav = favorites.includes(template.id);
          const sampleImg = template.samplePhotos?.[0];
          // Extract flag emoji if available in name
          const flagMatch = template.name.match(/^[\uD83C-\uDBFF\uDC00-\uDFFF]{2}/);
          const flagEmoji = flagMatch ? flagMatch[0] : '✦';
          const cleanTitle = template.name.replace(/^[\uD83C-\uDBFF\uDC00-\uDFFF]{2}\s*/, '');

          return (
            <div
              key={template.id}
              onClick={() => onSelectFrame(template)}
              style={{
                position: 'relative',
                background: '#ffffff',
                borderRadius: 'var(--radius-xl)',
                padding: '0.9rem',
                border: '1.5px solid var(--color-border-soft)',
                boxShadow: '0 12px 32px rgba(92, 6, 18, 0.09)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
                transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              {/* Paper Washi Tape Overlay Decor */}
              <div
                style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: `translateX(-50%) rotate(${index % 2 === 0 ? '-3deg' : '4deg'})`,
                  width: '60px',
                  height: '18px',
                  background: 'rgba(244, 194, 194, 0.65)',
                  borderLeft: '2px dashed rgba(255,255,255,0.8)',
                  borderRight: '2px dashed rgba(255,255,255,0.8)',
                  zIndex: 3,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                }}
              />

              {/* Star Accent on alternating cards */}
              {index % 2 === 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '12px',
                    fontSize: '1.25rem',
                    color: 'var(--color-pink-soft)',
                    zIndex: 4,
                  }}
                >
                  ★
                </span>
              )}

              {/* Card Image Preview with Styled Frame Border */}
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
                  boxShadow: 'inset 0 0 12px rgba(0,0,0,0.08)',
                  border: `2px solid ${template.frameBorderColor || '#ffffff'}`,
                }}
              >
                {sampleImg ? (
                  <img
                    src={sampleImg}
                    alt={template.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ textAlign: 'center', padding: '0.75rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                    <Sparkles size={28} color="var(--color-burgundy-deep)" />
                    <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--color-burgundy-deep)' }}>
                      {cleanTitle}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--color-neutral-sub)' }}>
                      {template.photoSlotsCount} Frame Slots
                    </span>
                  </div>
                )}

                {/* Country Flag Badge Tag */}
                {flagMatch && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '8px',
                      left: '8px',
                      background: 'rgba(255, 255, 255, 0.92)',
                      backdropFilter: 'blur(6px)',
                      padding: '0.2rem 0.5rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.85rem',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                    }}
                  >
                    <span>{flagEmoji}</span>
                    <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--color-neutral-dark)', textTransform: 'uppercase' }}>
                      {template.category}
                    </span>
                  </div>
                )}

                {/* Heart Favorite Button */}
                <button
                  onClick={(e) => toggleFavorite(template.id, e)}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(4px)',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: isFav ? '#D22B2B' : 'var(--color-neutral-sub)',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.12)',
                  }}
                >
                  <Heart size={16} fill={isFav ? '#D22B2B' : 'none'} />
                </button>
              </div>

              {/* Card Footer Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', padding: '0.2rem 0.2rem 0' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.98rem',
                    fontWeight: 800,
                    color: 'var(--color-burgundy-deep)',
                    margin: 0,
                    lineHeight: 1.2,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {template.name}
                </h3>
                <span
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--color-neutral-sub)',
                    fontWeight: 600,
                  }}
                >
                  {template.photoSlotsCount} Photo Slots • {template.style}
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
