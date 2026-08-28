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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Hero Header matching PixBooth design */}
      <div style={{ textAlign: 'center', margin: '1rem 0 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '2.75rem',
            fontWeight: 800,
            color: 'var(--color-burgundy-deep)',
            lineHeight: 1.25,
            letterSpacing: '-0.02em',
            marginBottom: '0.85rem',
          }}
        >
          {isShowingFavoritesOnly ? (
            'Bingkai Favorit Saya ♡'
          ) : (
            <>
              Capture the Moment, <br />
              Keep the Memory ✦
            </>
          )}
        </h1>

        <p
          style={{
            color: 'var(--color-neutral-sub)',
            fontSize: '1.02rem',
            maxWidth: '520px',
            margin: '0 auto 1.5rem',
            lineHeight: 1.6,
            fontWeight: 400,
          }}
        >
          Create your own aesthetic photo memories. High-quality digital booth experience right from your device.
        </p>

        {/* Start Taking Photos Red Pill Button */}
        <button
          onClick={() => {
            const defaultTemplate = filteredTemplates[0] || TemplateService.getAllTemplates()[0];
            if (defaultTemplate) onSelectFrame(defaultTemplate);
          }}
          style={{
            background: 'var(--color-pink-primary)',
            color: '#ffffff',
            padding: '0.85rem 2.25rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '1rem',
            fontWeight: 700,
            border: 'none',
            boxShadow: '0 8px 24px rgba(211, 47, 47, 0.22)',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, background 0.2s ease',
            marginBottom: '1rem',
          }}
        >
          Start Taking Photos
        </button>

        {/* Aesthetic Quick Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem' }}>
          {[
            { icon: '✨', label: 'Aesthetic & Cute' },
            { icon: '🖼️', label: 'Multi-Slot Strip' },
            { icon: '🎨', label: 'Filter Foto Realtime' },
            { icon: '🖨️', label: 'Cetak High DPI' },
          ].map((tag, idx) => (
            <span
              key={idx}
              style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                color: 'var(--color-neutral-dark)',
                background: '#ffffff',
                border: '1px solid var(--color-border)',
                padding: '0.25rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              {tag.icon} {tag.label}
            </span>
          ))}
        </div>
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
        onToggleFavorite={handleToggleFavorite}
        onSelectTemplate={(template) => setSelectedTemplateForModal(template)}
        isShowingFavoritesOnly={isShowingFavoritesOnly}
      />

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
