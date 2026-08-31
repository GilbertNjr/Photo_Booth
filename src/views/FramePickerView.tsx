import React, { useState, useMemo, useEffect, useRef } from 'react';
import type { FrameCategory, TemplateData } from '../types/template';
import { TemplateService } from '../services/template/templateService';
import { StorageService } from '../services/storage/storageService';
import { CategoryFilter } from '../components/TemplatePicker/CategoryFilter';
import { SearchBar } from '../components/TemplatePicker/SearchBar';
import { TemplateGrid } from '../components/TemplatePicker/TemplateGrid';
import { FrameModal } from '../components/FramePreview/FrameModal';
import { Hero3DFanDisplay } from '../components/Home/Hero3DFanDisplay';
import { FeaturedFrameCarousel } from '../components/Home/FeaturedFrameCarousel';
import { HowToUseView } from './HowToUseView';
import { AboutView } from './AboutView';
import { Camera, Grid, Sparkles } from 'lucide-react';
import { imageCacheService } from '../services/imageService';
import { SakuraBranchSVG, JapaneseLanternSVG } from '../components/Common/JapaneseDecorAssets';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedTemplateForModal, setSelectedTemplateForModal] = useState<TemplateData | null>(null);

  const showcaseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFavorites(StorageService.getFavorites());

    // Pre-decode sample images into memory for smooth scrolling
    const sampleUrls = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=70',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=240&q=70',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=240&q=70',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=240&q=70',
    ];
    imageCacheService.preloadBatch(sampleUrls);
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', position: 'relative', paddingBottom: '60px' }}>
      
      {/* 🌸 1. HERO SECTION (Japanese Aesthetic Canvas) */}
      {!isShowingFavoritesOnly && (
        <section
          className="hero-mockup-section"
          style={{
            position: 'relative',
            background: '#FAF5F0',
            borderRadius: '32px',
            border: '1px solid #EFE4D8',
            padding: '3rem 2rem',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center',
          }}
        >
          {/* Japanese Background Artwork */}
          <SakuraBranchSVG style={{ position: 'absolute', top: 0, left: 0, opacity: 0.7 }} width={240} height={180} />
          <JapaneseLanternSVG style={{ position: 'absolute', top: '15px', right: '30px', opacity: 0.8 }} width={60} height={90} />

          {/* Left Hero Text Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', zIndex: 2 }}>
            {/* Welcome Pill Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: '#FFE4E6',
                border: '1px solid #FECDD3',
                color: '#991B1B',
                padding: '0.35rem 0.9rem',
                borderRadius: '9999px',
                fontSize: '0.78rem',
                fontWeight: 800,
                letterSpacing: '0.05em',
                width: 'fit-content',
              }}
            >
              <Sparkles size={14} color="#D90429" />
              <span>WELCOME TO PIXBOOTH</span>
            </div>

            {/* Main Japanese/Korean Style Title */}
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.4rem, 5vw, 3.4rem)',
                fontWeight: 900,
                color: '#18181B',
                lineHeight: 1.15,
                margin: 0,
                letterSpacing: '-0.02em',
              }}
            >
              Abadikan <br />
              <span style={{ color: 'var(--color-burgundy-deep)' }}>Momen,</span> <br />
              Simpan <br />
              <span style={{ color: 'var(--color-burgundy-deep)' }}>Kenangan.</span>
              <span style={{ color: '#D90429', fontWeight: 400 }}> ♡</span>
            </h1>

            {/* Subtitle */}
            <p style={{ fontSize: '1rem', color: '#6B7280', margin: 0, lineHeight: 1.6, maxWidth: '420px', fontWeight: 500 }}>
              Ambil foto, pilih bingkai favoritmu, dan buat kenanganmu jadi lebih berkesan. ✦
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', marginTop: '0.5rem' }}>
              <button
                onClick={() => {
                  const defaultTpl = filteredTemplates[0] || TemplateService.getAllTemplates()[0];
                  if (defaultTpl) onSelectFrame(defaultTpl);
                }}
                style={{
                  background: 'var(--color-burgundy-deep)',
                  color: '#FFFFFF',
                  padding: '0.9rem 1.85rem',
                  borderRadius: '9999px',
                  fontSize: '0.98rem',
                  fontWeight: 800,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(122, 28, 40, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  transition: 'transform 0.2s ease',
                }}
              >
                <Camera size={20} />
                <span>Mulai Ambil Foto ✦</span>
              </button>

              <button
                onClick={handleScrollToShowcase}
                style={{
                  background: '#FFFFFF',
                  color: 'var(--color-burgundy-deep)',
                  border: '1.5px solid #EFE4D8',
                  padding: '0.9rem 1.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.98rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                }}
              >
                <Grid size={18} />
                <span>Pilih Frame</span>
              </button>
            </div>

            {/* User Avatars Social Proof */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginTop: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {[
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80',
                  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80',
                  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=80&q=80',
                  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=80&q=80',
                ].map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt="user avatar"
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      border: '2px solid #FFFFFF',
                      marginLeft: i > 0 ? '-10px' : 0,
                      objectFit: 'cover',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                    }}
                  />
                ))}
              </div>

              <span style={{ fontSize: '0.84rem', color: '#4B5563', fontWeight: 600 }}>
                <strong style={{ color: '#18181B', fontWeight: 800 }}>10K+</strong> momen berkesan telah dibuat <span style={{ color: '#D90429' }}>♥</span>
              </span>
            </div>
          </div>

          {/* Right Hero Visual Column (3D Stacked Fan Photo Strips) */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', zIndex: 2 }}>
            <Hero3DFanDisplay onSelectTemplate={(tpl) => setSelectedTemplateForModal(tpl)} />
          </div>
        </section>
      )}

      {/* 🌸 2. BINGKAI UTAMA PIXBOOTH CAROUSEL SECTION */}
      {isHomeView && !isShowingFavoritesOnly && (
        <section id="featured-carousel-section">
          <FeaturedFrameCarousel
            onSelectFrame={onSelectFrame}
            onExploreAllFrames={handleScrollToShowcase}
          />
        </section>
      )}

      {/* 📖 3. CARA PAKAI SECTION */}
      {isHomeView && !isShowingFavoritesOnly && (
        <section id="how-to-use-section">
          <HowToUseView />
        </section>
      )}

      {/* ℹ️ 4. TENTANG PIXBOOTH SECTION */}
      {isHomeView && !isShowingFavoritesOnly && (
        <section id="about-section">
          <AboutView />
        </section>
      )}

      {/* 🖼️ 5. FULL FRAME CATALOG & EXPLORE ALL FRAMES SHOWCASE */}
      <section id="frame-showcase-section" ref={showcaseRef} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingTop: '1rem' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', fontWeight: 800, color: 'var(--color-burgundy-deep)', margin: 0 }}>
            {isShowingFavoritesOnly ? 'Bingkai Favorit Saya' : 'Katalog Semua Bingkai'}
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#6B7280', marginTop: '0.3rem' }}>
            {isShowingFavoritesOnly ? 'Koleksi bingkai yang sudah kamu sukai.' : 'Eksplor 30 bingkai pilihan untuk berbagai suasana.'}
          </p>
        </div>

        {/* Search & Category Filter */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            categoryCounts={categoryCounts}
          />
        </div>

        {/* Template Grid */}
        <TemplateGrid
          templates={filteredTemplates}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onSelectTemplate={(template) => {
            onSelectFrame(template);
          }}
          isShowingFavoritesOnly={isShowingFavoritesOnly}
        />
      </section>

      {/* Frame Inspection Modal */}
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
