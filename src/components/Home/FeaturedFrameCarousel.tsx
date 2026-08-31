import React, { useRef } from 'react';
import type { TemplateData } from '../../types/template';
import { TemplateService } from '../../services/template/templateService';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SakuraBranchSVG, SensuFanSVG } from '../Common/JapaneseDecorAssets';

interface FeaturedFrameCarouselProps {
  onSelectFrame: (template: TemplateData) => void;
  onExploreAllFrames?: () => void;
}

export const FeaturedFrameCarousel: React.FC<FeaturedFrameCarouselProps> = ({
  onSelectFrame,
  onExploreAllFrames,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const featuredFrames = [
    {
      id: 'asia-sakura-memories',
      title: 'Sakura Memories',
      subTitle: '桜の思い出',
      tag: 'JAPAN STYLE',
      photoCount: 5,
      bgGradient: 'linear-gradient(135deg, #FFF0F5 0%, #FFE4E6 100%)',
      borderColor: '#F472B6',
      sampleImg: 'https://images.unsplash.com/photo-1528164344705-47542687990d?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'asia-our-memory-korea',
      title: 'Our Memory',
      subTitle: '우리의 추억',
      tag: 'KOREA STYLE',
      photoCount: 5,
      bgGradient: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
      borderColor: '#38BDF8',
      sampleImg: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'asia-beautiful-time-china',
      title: 'Beautiful Time',
      subTitle: '美好的时光',
      tag: 'CHINA STYLE',
      photoCount: 5,
      bgGradient: 'linear-gradient(135deg, #7A1C28 0%, #991B1B 100%)',
      borderColor: '#F59E0B',
      sampleImg: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'asia-special-moment-fusion',
      title: 'Special Moment',
      subTitle: '특별한 순간',
      tag: 'KOREA × JAPAN',
      photoCount: 5,
      bgGradient: 'linear-gradient(135deg, #FFF5F5 0%, #FFE4E6 100%)',
      borderColor: '#E11D48',
      sampleImg: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'asia-eternal-memory-fusion',
      title: 'Eternal Memory',
      subTitle: '永遠の記憶',
      tag: 'ALL FUSION',
      photoCount: 5,
      bgGradient: 'linear-gradient(135deg, #FBF7EE 0%, #E8DFD1 100%)',
      borderColor: '#78350F',
      sampleImg: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'master-01-sweet-moment',
      title: 'Sweet Moment',
      subTitle: '甘い瞬間',
      tag: 'Japan',
      photoCount: 4,
      bgGradient: 'linear-gradient(135deg, #FFF0F5 0%, #FEE6ED 100%)',
      borderColor: '#F472B6',
      sampleImg: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=300&q=80',
    },
  ];

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleUseFrame = (id: string) => {
    const tpl = TemplateService.getTemplateById(id) || TemplateService.getAllTemplates()[0];
    if (tpl) onSelectFrame(tpl);
  };

  return (
    <div
      style={{
        background: '#FAF5F0',
        borderRadius: '32px',
        border: '1px solid #EFE4D8',
        padding: '2.5rem 1.5rem',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 12px 36px rgba(122, 28, 40, 0.04)',
      }}
    >
      {/* Decorative Japanese Corner Accents */}
      <SakuraBranchSVG style={{ position: 'absolute', top: 0, left: 0, opacity: 0.8 }} width={200} height={150} />
      <SensuFanSVG style={{ position: 'absolute', top: '10px', right: '10px', opacity: 0.7 }} width={130} height={100} />

      {/* Header Section */}
      <div style={{ textAlign: 'center', marginBottom: '2rem', position: 'relative', zIndex: 2 }}>
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.95rem',
            fontWeight: 800,
            color: 'var(--color-burgundy-deep)',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.6rem',
          }}
        >
          <span>🌸</span>
          <span>Bingkai Utama PixBooth</span>
          <span>🌸</span>
        </h2>
        <p style={{ fontSize: '0.92rem', color: '#6B7280', marginTop: '0.4rem', fontWeight: 500 }}>
          Frame-frame pilihan terbaik untuk foto terbaik kamu.
        </p>
      </div>

      {/* Carousel Container with Scroll Arrow Controls */}
      <div style={{ position: 'relative', margin: '0 auto', maxWidth: '1080px' }}>
        {/* Left Arrow Button */}
        <button
          onClick={() => handleScroll('left')}
          style={{
            position: 'absolute',
            left: '-16px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: '#FFFFFF',
            border: '1px solid #E5E7EB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
            color: 'var(--color-burgundy-deep)',
            transition: 'transform 0.2s ease',
          }}
          aria-label="Scroll Left"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Horizontal Card Scroll Track */}
        <div
          ref={scrollRef}
          style={{
            display: 'flex',
            gap: '1.25rem',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            padding: '0.5rem 0.5rem 1rem',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          className="hide-scrollbar"
        >
          {featuredFrames.map((card) => (
            <div
              key={card.id}
              style={{
                flex: '0 0 240px',
                scrollSnapAlign: 'start',
                background: '#FFFFFF',
                borderRadius: '24px',
                padding: '1.1rem 1rem 1.25rem',
                border: '1px solid #F3ECE6',
                boxShadow: '0 8px 24px rgba(122, 28, 40, 0.06)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.85rem',
                transition: 'transform 0.25s ease, boxShadow 0.25s ease',
              }}
            >
              {/* Badges Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                <span
                  style={{
                    background: '#18181B',
                    color: '#FFFFFF',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.65rem',
                    borderRadius: '9999px',
                  }}
                >
                  #{card.photoCount} Foto
                </span>
                <span
                  style={{
                    background: '#FFE4E6',
                    color: '#991B1B',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.65rem',
                    borderRadius: '9999px',
                    border: '1px solid #FECDD3',
                  }}
                >
                  {card.tag}
                </span>
              </div>

              {/* Sample Photo Preview Container */}
              <div
                style={{
                  width: '100%',
                  height: '180px',
                  borderRadius: '16px',
                  background: card.bgGradient,
                  padding: '0.4rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.1)',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={card.sampleImg}
                  alt={card.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    border: `2px solid ${card.borderColor}`,
                  }}
                />
              </div>

              {/* Card Titles */}
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-neutral-dark)', margin: 0 }}>
                  {card.title}
                </h3>
                <span style={{ fontSize: '0.75rem', color: '#9CA3AF', fontWeight: 600 }}>
                  {card.subTitle}
                </span>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleUseFrame(card.id)}
                style={{
                  width: '100%',
                  background: 'var(--color-burgundy-deep)',
                  color: '#FFFFFF',
                  padding: '0.65rem 1rem',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(122, 28, 40, 0.25)',
                  transition: 'background 0.2s ease, transform 0.2s ease',
                }}
              >
                Pakai Bingkai Ini +
              </button>
            </div>
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={() => handleScroll('right')}
          style={{
            position: 'absolute',
            right: '-16px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: '#FFFFFF',
            border: '1px solid #E5E7EB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
            color: 'var(--color-burgundy-deep)',
            transition: 'transform 0.2s ease',
          }}
          aria-label="Scroll Right"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Center Bottom Action Button: Jelajahi Semua Bingkai + */}
      {onExploreAllFrames && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', position: 'relative', zIndex: 2 }}>
          <button
            onClick={onExploreAllFrames}
            style={{
              background: 'var(--color-burgundy-deep)',
              color: '#FFFFFF',
              padding: '0.85rem 2.25rem',
              borderRadius: '9999px',
              fontSize: '0.95rem',
              fontWeight: 800,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(122, 28, 40, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span>Jelajahi Semua Bingkai +</span>
          </button>
        </div>
      )}
    </div>
  );
};
