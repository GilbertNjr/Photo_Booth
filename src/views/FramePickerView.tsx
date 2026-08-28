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
      <div style={{ textAlign: 'center', margin: '0.25rem 0 1.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'linear-gradient(135deg, rgba(255, 117, 151, 0.15), rgba(139, 92, 246, 0.15))',
            color: 'var(--color-pink-primary)',
            padding: '0.4rem 1.1rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.82rem',
            fontWeight: 800,
            marginBottom: '0.85rem',
            border: '1px solid rgba(255, 117, 151, 0.3)',
            boxShadow: '0 4px 12px rgba(255, 117, 151, 0.1)',
            letterSpacing: '0.04em',
          }}
        >
          <Sparkles size={15} />
          <span>KOREAN PHOTO BOOTH KIOSK 📸 • HIGH DPI PRINT</span>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '2.75rem',
            fontWeight: 900,
            letterSpacing: '-0.025em',
            background: 'linear-gradient(135deg, #1e1e24 20%, var(--color-pink-primary) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1.15,
            marginBottom: '0.4rem',
          }}
        >
          {isShowingFavoritesOnly ? 'Bingkai Favorit Saya ♡' : 'Pilih Frame Photobooth ✨'}
        </h1>

        <p
          style={{
            color: 'var(--color-neutral-sub)',
            fontSize: '1.08rem',
            maxWidth: '600px',
            margin: '0 auto 1.25rem',
            lineHeight: 1.5,
            fontWeight: 500,
          }}
        >
          Koleksi bingkai scrapbook aesthetic, polaroid & digicam. Bebas pilih gaya, hias stiker lucu, filter warna & caption tulisan tangan!
        </p>

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
                background: 'rgba(255, 255, 255, 0.85)',
                border: '1px solid var(--color-border-soft)',
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
