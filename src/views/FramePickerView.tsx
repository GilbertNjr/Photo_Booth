import React, { useState, useMemo, useEffect } from 'react';
import type { FrameCategory, TemplateData } from '../types/template';
import { TemplateService } from '../services/template/templateService';
import { StorageService } from '../services/storage/storageService';
import { CategoryFilter } from '../components/TemplatePicker/CategoryFilter';
import { SearchBar } from '../components/TemplatePicker/SearchBar';
import { TemplateGrid } from '../components/TemplatePicker/TemplateGrid';
import { FrameModal } from '../components/FramePreview/FrameModal';

interface FramePickerViewProps {
  onSelectFrame: (template: TemplateData) => void;
  isShowingFavoritesOnly?: boolean;
}

export const FramePickerView: React.FC<FramePickerViewProps> = ({
  onSelectFrame,
  isShowingFavoritesOnly = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<FrameCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedTemplateForModal, setSelectedTemplateForModal] = useState<TemplateData | null>(null);

  useEffect(() => {
    setFavorites(StorageService.getFavorites());
  }, []);

  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = StorageService.toggleFavorite(id);
    setFavorites(updated);
  };

  const categoryCounts = useMemo(() => {
    if (!isShowingFavoritesOnly) {
      return TemplateService.getCategoryCounts();
    }
    const allTemplates = TemplateService.getAllTemplates();
    const favTemplates = allTemplates.filter((t) => favorites.includes(t.id));
    const counts: Record<string, number> = { all: favTemplates.length };
    favTemplates.forEach((t) => {
      counts[t.category] = (counts[t.category] || 0) + 1;
    });
    return counts;
  }, [isShowingFavoritesOnly, favorites]);

  const filteredTemplates = useMemo(() => {
    let result = TemplateService.searchTemplates(searchQuery, selectedCategory);
    if (isShowingFavoritesOnly) {
      result = result.filter((t) => favorites.includes(t.id));
    }
    return result;
  }, [searchQuery, selectedCategory, isShowingFavoritesOnly, favorites]);

  const [activeSelectedFrame, setActiveSelectedFrame] = useState<TemplateData | null>(null);

  useEffect(() => {
    if (filteredTemplates.length > 0 && !activeSelectedFrame) {
      setActiveSelectedFrame(filteredTemplates[0]);
    }
  }, [filteredTemplates, activeSelectedFrame]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative', paddingBottom: '90px' }}>
      {/* Header section matching "Choose Your Frame ✦" */}
      <div style={{ textAlign: 'center', margin: '0.5rem 0 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--color-neutral-sub)', fontWeight: 600, cursor: 'pointer' }}>
            ← Back
          </span>
          <span
            onClick={() => {
              const defaultTemplate = activeSelectedFrame || filteredTemplates[0] || TemplateService.getAllTemplates()[0];
              if (defaultTemplate) onSelectFrame(defaultTemplate);
            }}
            style={{ fontSize: '0.88rem', color: 'var(--color-neutral-sub)', fontWeight: 700, cursor: 'pointer' }}
          >
            Skip
          </span>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '2.4rem',
            fontWeight: 800,
            color: 'var(--color-burgundy-deep)',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            marginBottom: '0.35rem',
          }}
        >
          Choose Your Frame ✦
        </h1>

        <p
          style={{
            color: 'var(--color-neutral-sub)',
            fontSize: '0.96rem',
            maxWidth: '520px',
            margin: '0 auto 1rem',
            lineHeight: 1.5,
            fontWeight: 400,
          }}
        >
          Pick a style and make your memories yours.
        </p>
      </div>

      {/* Controls: Search & Category Filters */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box',
        }}
      >
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          categoryCounts={categoryCounts}
        />
      </div>

      {/* Frame Grid */}
      <TemplateGrid
        templates={filteredTemplates}
        favorites={favorites}
        selectedTemplateId={activeSelectedFrame?.id}
        onToggleFavorite={handleToggleFavorite}
        onSelectTemplate={(template) => {
          setActiveSelectedFrame(template);
          setSelectedTemplateForModal(template);
        }}
        isShowingFavoritesOnly={isShowingFavoritesOnly}
      />

      {/* Floating Sticky Bottom "Apply Frame →" Button */}
      {activeSelectedFrame && (
        <div
          style={{
            position: 'fixed',
            bottom: '86px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1010,
            width: 'calc(100% - 32px)',
            maxWidth: '380px',
            display: 'flex',
            justifyContent: 'center',
            filter: 'drop-shadow(0 12px 28px rgba(92, 6, 18, 0.35))',
          }}
        >
          <button
            onClick={() => onSelectFrame(activeSelectedFrame)}
            style={{
              width: '100%',
              background: 'var(--color-burgundy-deep)',
              color: '#ffffff',
              padding: '0.9rem 1.75rem',
              borderRadius: '9999px',
              fontSize: '1.02rem',
              fontWeight: 800,
              border: '2px solid rgba(255, 255, 255, 0.25)',
              boxShadow: '0 8px 24px rgba(92, 6, 18, 0.3)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem',
              transition: 'transform 0.2s ease, background 0.2s ease',
            }}
          >
            <span>Apply Frame</span>
            <span style={{ fontSize: '1.15rem' }}>➔</span>
          </button>
        </div>
      )}

      {/* Template Inspection Modal */}
      <FrameModal
        template={selectedTemplateForModal}
        isOpen={!!selectedTemplateForModal}
        onClose={() => setSelectedTemplateForModal(null)}
        onConfirm={(template) => {
          setSelectedTemplateForModal(null);
          onSelectFrame(template);
        }}
        isFavorite={selectedTemplateForModal ? favorites.includes(selectedTemplateForModal.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
};
