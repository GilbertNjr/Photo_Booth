import React, { useState, useMemo, useEffect } from 'react';
import type { FrameCategory, TemplateData } from '../types/template';
import { TemplateService } from '../services/template/templateService';
import { StorageService } from '../services/storage/storageService';
import { CategoryFilter } from '../components/TemplatePicker/CategoryFilter';
import { SearchBar } from '../components/TemplatePicker/SearchBar';
import { TemplateGrid } from '../components/TemplatePicker/TemplateGrid';
import { FrameModal } from '../components/FramePreview/FrameModal';
import { Sparkles } from 'lucide-react';

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
      {/* Hero Header */}
      <div style={{ textAlign: 'center', margin: '0.5rem 0 1rem' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'var(--color-pink-soft)',
            color: 'var(--color-pink-primary)',
            padding: '0.3rem 0.85rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.82rem',
            fontWeight: 700,
            marginBottom: '0.75rem',
          }}
        >
          <Sparkles size={14} />
          <span>STEP 1 OF 4</span>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '2.5rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: 'var(--color-neutral-dark)',
            lineHeight: 1.15,
          }}
        >
          {isShowingFavoritesOnly ? 'Your Favorite Frames ♡' : 'Choose Your Frame ✨'}
        </h1>

        <p
          style={{
            color: 'var(--color-neutral-sub)',
            fontSize: '1.05rem',
            maxWidth: '560px',
            margin: '0.5rem auto 0',
          }}
        >
          Select an aesthetic template for your photo booth session. Fully customizable with colors, stickers & handwritten captions!
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
