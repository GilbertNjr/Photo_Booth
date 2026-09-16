import React, { useState, useMemo, useEffect, useRef } from 'react';
import type { FrameCategory, TemplateData, GridAspectRatio } from '../types/template';
import { TemplateService } from '../services/template/templateService';
import { StorageService } from '../services/storage/storageService';
import { LayoutBlueprintService } from '../services/layout/layoutBlueprintService';
import { CategoryFilter } from '../components/TemplatePicker/CategoryFilter';
import { SearchBar } from '../components/TemplatePicker/SearchBar';
import { GridAspectSelector } from '../components/TemplatePicker/GridAspectSelector';
import { TemplateGrid } from '../components/TemplatePicker/TemplateGrid';
import { FrameModal } from '../components/FramePreview/FrameModal';
import { Hero3DFanDisplay } from '../components/Home/Hero3DFanDisplay';
import { Camera, Grid, Sparkles } from 'lucide-react';
import { SessionMetricsService } from '../services/analytics/sessionMetricsService';

import { imageCacheService } from '../services/imageService';

import { HowToUseView } from './HowToUseView';
import { AboutView } from './AboutView';

interface FramePickerViewProps {
  onSelectFrame: (template: TemplateData) => void;
  isShowingFavoritesOnly?: boolean;
  isHomeView?: boolean;
  onExploreAllFrames?: () => void;
}

export const FramePickerView: React.FC<FramePickerViewProps> = ({
  onSelectFrame,
  isShowingFavoritesOnly = false,
  isHomeView = false,
  onExploreAllFrames,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<FrameCategory | 'all'>('all');
  const [selectedRatio, setSelectedRatio] = useState<GridAspectRatio | 'all'>('all');
  const [selectedSlotsCount, setSelectedSlotsCount] = useState<number | 'all'>('all');
  const [badgeFilter, setBadgeFilter] = useState<'all' | 'best-seller' | 'new'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedTemplateForModal, setSelectedTemplateForModal] = useState<TemplateData | null>(null);
  const [sessionCount, setSessionCount] = useState<string>(SessionMetricsService.getFormattedCount());

  const showcaseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFavorites(StorageService.getFavorites());

    const unsubscribe = SessionMetricsService.subscribe(() => {
      setSessionCount(SessionMetricsService.getFormattedCount());
    });

    // Pre-decode sample images into memory for 60 FPS butter-smooth grid scrolling
    const sampleUrls = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=70',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=240&q=70',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=240&q=70',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=240&q=70',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=70',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=70',
    ];
    imageCacheService.preloadBatch(sampleUrls);

    return unsubscribe;
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

    if (badgeFilter === 'best-seller') {
      result = result.filter((t) => t.isBestSeller || t.isPopular);
    } else if (badgeFilter === 'new') {
      result = result.filter((t) => t.isNew);
    }

    if (selectedRatio !== 'all') {
      result = result.filter((t) => t.aspectRatio === selectedRatio);
    }

    if (selectedSlotsCount !== 'all') {
      result = result.filter((t) => t.photoSlotsCount === selectedSlotsCount);
    }

    // Dynamic adaptation fallback if specific ratio is chosen and has few results
    if (result.length === 0 && selectedRatio !== 'all') {
      const allTemplates = TemplateService.getAllTemplates();
      result = allTemplates.slice(0, 6).map((tpl) =>
        LayoutBlueprintService.adaptTemplate(
          tpl,
          selectedRatio,
          selectedSlotsCount !== 'all' ? selectedSlotsCount : 4
        )
      );
    }

    if (
      isHomeView &&
      !isShowingFavoritesOnly &&
      !searchQuery &&
      selectedCategory === 'all' &&
      selectedRatio === 'all' &&
      selectedSlotsCount === 'all' &&
      badgeFilter === 'all'
    ) {
      const featured = result.filter((t) => t.isBestSeller || t.isNew || t.isPopular);
      return featured.length >= 4 ? featured.slice(0, 4) : result.slice(0, 4);
    }

    return result;
  }, [searchQuery, selectedCategory, isShowingFavoritesOnly, favorites, isHomeView, selectedRatio, selectedSlotsCount, badgeFilter]);

  const [activeSelectedFrame, setActiveSelectedFrame] = useState<TemplateData | null>(null);

  useEffect(() => {
    if (filteredTemplates.length > 0 && !activeSelectedFrame) {
      setActiveSelectedFrame(filteredTemplates[0]);
    }
  }, [filteredTemplates, activeSelectedFrame]);

  const handleScrollToShowcase = () => {
    if (onExploreAllFrames) {
      onExploreAllFrames();
    }
    setTimeout(() => {
      if (showcaseRef.current) {
        showcaseRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative', paddingBottom: '90px' }}>
      {/* 🌟 1. HERO SECTION (2-Column Grid on Laptop/Desktop, Stacked on Mobile) */}
      {!isShowingFavoritesOnly && (
        <section className="hero-mockup-section">
          {/* Left Text Content Box */}
          <div className="hero-text-content">
            <div className="hero-welcome-badge">
              <Sparkles size={14} color="#D90429" />
              <span>WELCOME TO PIXBOOTH</span>
            </div>

            <h1 className="hero-main-title">
              Abadikan Momen, <br />
              <span className="title-highlight">Simpan Kenangan.</span>
              <span className="title-heart-drawn"> ♡</span>
            </h1>

            <p className="hero-subtitle">
              Ambil foto, pilih bingkai favoritmu, dan buat kenanganmu jadi lebih berkesan.
            </p>

            {/* Action Buttons */}
            <div className="hero-action-buttons">
              <button
                className="hero-btn-primary"
                onClick={() => {
                  const defaultTemplate = activeSelectedFrame || filteredTemplates[0] || TemplateService.getAllTemplates()[0];
                  if (defaultTemplate) onSelectFrame(defaultTemplate);
                }}
              >
                <Camera size={18} />
                <span>Mulai Ambil Foto</span>
              </button>

              <button className="hero-btn-secondary" onClick={handleScrollToShowcase}>
                <Grid size={18} />
                <span>Pilih Frame</span>
              </button>
            </div>

            {/* Social Proof Counter */}
            <div className="hero-social-proof">
              <div className="avatar-stack">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" alt="user" />
                <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80" alt="user" />
                <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=80&q=80" alt="user" />
                <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=80&q=80" alt="user" />
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" alt="user" />
              </div>
              <span className="proof-text">
                <strong>{sessionCount}</strong> momen berkesan telah dibuat <span style={{ color: '#D90429' }}>♥</span>
              </span>
            </div>
          </div>

          {/* Right Column: 3D Fan-Stacked Photo Strips */}
          <div className="hero-visual-content">
            <Hero3DFanDisplay onSelectTemplate={(tpl) => setSelectedTemplateForModal(tpl)} />
          </div>
        </section>
      )}

      {/* 🖼️ 2. FRAME SHOWCASE SECTION ("Pilih Bingkai Anda") */}
      <section id="frame-showcase-section" ref={showcaseRef} className="frame-showcase-section">
        {/* Section Header */}
        <div className="showcase-header-centered">
          <h2 className="showcase-title">
            {isShowingFavoritesOnly
              ? 'Bingkai Favorit Saya'
              : isHomeView
              ? 'Bingkai Utama PixBooth'
              : 'Pilih Bingkai Anda'}
          </h2>
          <p className="showcase-subtitle">
            {isHomeView
              ? 'Frame ikonik pilihan terbaik untuk foto studio kamu.'
              : 'Pilih gaya dan jadikan kenangan Anda milik Anda sendiri.'}
          </p>
        </div>

        {/* Search & Category Filter Pills (Shown in All Frames / Search Mode) */}
        {!isHomeView && (
          <div className="showcase-controls">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />

            {/* Quick Badge Filter Tabs: All, Best Seller, New */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button
                className={`category-pill ${badgeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setBadgeFilter('all')}
                style={{
                  background: badgeFilter === 'all' ? 'linear-gradient(135deg, #800020, #B31B38)' : '#FFFFFF',
                  color: badgeFilter === 'all' ? '#FFFFFF' : 'inherit',
                  borderColor: badgeFilter === 'all' ? '#800020' : 'var(--color-border)',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                }}
              >
                <span>🌟 Semua Koleksi</span>
              </button>
              <button
                className={`category-pill ${badgeFilter === 'best-seller' ? 'active' : ''}`}
                onClick={() => setBadgeFilter('best-seller')}
                style={{
                  background: badgeFilter === 'best-seller' ? 'linear-gradient(135deg, #F59E0B, #D97706)' : '#FFFFFF',
                  color: badgeFilter === 'best-seller' ? '#FFFFFF' : 'inherit',
                  borderColor: badgeFilter === 'best-seller' ? '#F59E0B' : 'var(--color-border)',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                }}
              >
                <span>⭐ Best Seller</span>
                <span
                  className="category-count"
                  style={{
                    background: badgeFilter === 'best-seller' ? 'rgba(255,255,255,0.3)' : 'rgba(245,158,11,0.15)',
                    color: badgeFilter === 'best-seller' ? '#fff' : '#D97706',
                  }}
                >
                  {TemplateService.getAllTemplates().filter((t) => t.isBestSeller || t.isPopular).length}
                </span>
              </button>
              <button
                className={`category-pill ${badgeFilter === 'new' ? 'active' : ''}`}
                onClick={() => setBadgeFilter('new')}
                style={{
                  background: badgeFilter === 'new' ? 'linear-gradient(135deg, #EC4899, #8B5CF6)' : '#FFFFFF',
                  color: badgeFilter === 'new' ? '#FFFFFF' : 'inherit',
                  borderColor: badgeFilter === 'new' ? '#EC4899' : 'var(--color-border)',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                }}
              >
                <span>✨ Baru (New)</span>
                <span
                  className="category-count"
                  style={{
                    background: badgeFilter === 'new' ? 'rgba(255,255,255,0.3)' : 'rgba(236,72,153,0.15)',
                    color: badgeFilter === 'new' ? '#fff' : '#EC4899',
                  }}
                >
                  {TemplateService.getAllTemplates().filter((t) => t.isNew).length}
                </span>
              </button>
            </div>

            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              categoryCounts={categoryCounts}
            />
          </div>
        )}

        {/* Dynamic Aspect Ratio & Slot Count Selector */}
        {!isHomeView && (
          <GridAspectSelector
            selectedRatio={selectedRatio}
            selectedSlotsCount={selectedSlotsCount}
            onSelectRatio={setSelectedRatio}
            onSelectSlotsCount={setSelectedSlotsCount}
          />
        )}

        {/* High-Fidelity Frame Template Grid */}
        <TemplateGrid
          templates={filteredTemplates}
          favorites={favorites}
          selectedTemplateId={activeSelectedFrame?.id}
          onToggleFavorite={handleToggleFavorite}
          onSelectTemplate={(template) => {
            onSelectFrame(template);
          }}
          isShowingFavoritesOnly={isShowingFavoritesOnly}
        />

        {/* "Eksplor Semua Bingkai ➔" Button on Home View */}
        {isHomeView && onExploreAllFrames && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.75rem' }}>
            <button
              onClick={onExploreAllFrames}
              className="btn-primary"
              style={{
                padding: '0.85rem 2.25rem',
                borderRadius: '9999px',
                fontSize: '0.95rem',
                fontWeight: 800,
                boxShadow: '0 8px 24px rgba(128, 0, 32, 0.25)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
              }}
            >
              <span>Eksplor Semua Bingkai</span>
              <span style={{ fontSize: '1.1rem' }}>➔</span>
            </button>
          </div>
        )}
      </section>

      {/* 📖 3. CARA PAKAI SECTION (Continuous Scroll on Home View) */}
      {isHomeView && !isShowingFavoritesOnly && (
        <section id="how-to-use-section" className="how-to-use-section" style={{ marginTop: '2.5rem', paddingTop: '1rem', borderTop: '1px dashed rgba(128, 0, 32, 0.15)' }}>
          <HowToUseView />
        </section>
      )}

      {/* ℹ️ 4. TENTANG SECTION (Continuous Scroll on Home View) */}
      {isHomeView && !isShowingFavoritesOnly && (
        <section id="about-section" className="about-section" style={{ marginTop: '2.5rem', paddingTop: '1rem', borderTop: '1px dashed rgba(128, 0, 32, 0.15)' }}>
          <AboutView />
        </section>
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

