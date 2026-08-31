import React from 'react';
import type { TemplateData } from '../../types/template';
import { TemplateService } from '../../services/template/templateService';

interface Hero3DFanDisplayProps {
  onSelectTemplate?: (template: TemplateData) => void;
}

export const Hero3DFanDisplay: React.FC<Hero3DFanDisplayProps> = ({ onSelectTemplate }) => {
  // High quality sample portraits matching mockup photos
  const photosFilmStory = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=75',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=240&q=75',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=75',
  ];

  const photosSpecialDay = [
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=240&q=75',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=75',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=75',
  ];

  const photosSweetMoment = [
    'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=240&q=75',
    'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=240&q=75',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&q=75',
    'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?auto=format&fit=crop&w=240&q=75',
  ];

  const photosOurMemory = [
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=240&q=75',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=240&q=75',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=240&q=75',
  ];

  const handleStripClick = (templateId: string) => {
    const tpl = TemplateService.getTemplateById(templateId) || TemplateService.getAllTemplates()[0];
    if (tpl && onSelectTemplate) {
      onSelectTemplate(tpl);
    }
  };

  return (
    <div className="hero-3d-container">
      {/* 4 Fan-Stacked 3D Photo Strips Matching Mockup Exactly */}
      <div className="hero-fan-wrapper">
        
        {/* Strip 1: Film Story (Dark Charcoal / Black, Tilted -14deg) */}
        <div
          className="hero-strip strip-dark-film"
          onClick={() => handleStripClick('master-04-dark-romance')}
          style={{
            transform: 'perspective(1000px) rotateY(10deg) rotateZ(-12deg) scale(0.92)',
            zIndex: 10,
            background: '#18181B',
            color: '#FFFFFF',
            borderRadius: '16px',
            padding: '0.85rem 0.65rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            cursor: 'pointer',
          }}
          title="Film Story 필름 스토리"
        >
          <div style={{ textTransform: 'uppercase', fontSize: '0.65rem', letterSpacing: '0.1em', opacity: 0.8, textAlign: 'center' }}>
            필름 스토리
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', fontWeight: 800, textAlign: 'center', marginBottom: '0.5rem' }}>
            Film Story
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {photosFilmStory.map((url, i) => (
              <div key={i} style={{ width: '100px', height: '80px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.15)' }}>
                <img src={url} alt="Film story" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', fontSize: '0.65rem' }}>
            <span>Special Day</span>
            <span>📷</span>
          </div>
        </div>

        {/* Strip 2: Special Day (Deep Maroon Burgundy, Elevated Center, Tilted -3deg) */}
        <div
          className="hero-strip strip-burgundy-special"
          onClick={() => handleStripClick('master-02-special-day')}
          style={{
            transform: 'perspective(1000px) rotateY(4deg) rotateZ(-2deg) scale(1.04) translateY(-15px)',
            zIndex: 30,
            background: 'linear-gradient(180deg, #7A1C28 0%, #4A1018 100%)',
            color: '#FFFFFF',
            borderRadius: '18px',
            padding: '0.95rem 0.75rem',
            boxShadow: '0 24px 50px rgba(122, 28, 40, 0.45)',
            cursor: 'pointer',
            border: '1.5px solid rgba(255,255,255,0.2)',
          }}
          title="Special Day 特別 な 日"
        >
          <div style={{ fontSize: '0.7rem', opacity: 0.9, textAlign: 'center', letterSpacing: '0.08em' }}>
            特別 な 日
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 800, textAlign: 'center', marginBottom: '0.5rem' }}>
            Special Day 🌸
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            {photosSpecialDay.map((url, i) => (
              <div key={i} style={{ width: '110px', height: '85px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.2)' }}>
                <img src={url} alt="Special day" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.6rem', fontSize: '0.7rem', fontWeight: 700 }}>
            <span>Special Day 🌸</span>
            <span style={{ fontSize: '0.9rem' }}>📷</span>
          </div>
        </div>

        {/* Strip 3: Sweet Moment (Soft Cream Pinkish, Tilted +8deg) */}
        <div
          className="hero-strip strip-cream-sweet"
          onClick={() => handleStripClick('master-01-sweet-moment')}
          style={{
            transform: 'perspective(1000px) rotateY(-4deg) rotateZ(6deg) scale(0.98)',
            zIndex: 20,
            background: 'linear-gradient(180deg, #FFF0F5 0%, #FEE6ED 100%)',
            color: '#7A1C28',
            borderRadius: '16px',
            padding: '0.85rem 0.65rem',
            boxShadow: '0 20px 40px rgba(122, 28, 40, 0.25)',
            cursor: 'pointer',
            border: '1.5px solid #FBCFE8',
          }}
          title="Sweet Moment 甘 い 瞬間"
        >
          <div style={{ fontSize: '0.68rem', opacity: 0.85, textAlign: 'center', color: '#991B1B' }}>
            甘 い 瞬間
          </div>
          <div style={{ fontFamily: 'Caveat, cursive', fontSize: '1.15rem', fontWeight: 700, textAlign: 'center', marginBottom: '0.4rem', color: '#800020' }}>
            Sweet Moment
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {photosSweetMoment.map((url, i) => (
              <div key={i} style={{ width: '102px', height: '68px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(122, 28, 40, 0.15)' }}>
                <img src={url} alt="Sweet moment" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, textAlign: 'center', marginTop: '0.45rem', color: '#991B1B' }}>
            Sweet Day ✦
          </div>
        </div>

        {/* Strip 4: Our Memory (Soft Blue Periwinkle, Tilted +14deg) */}
        <div
          className="hero-strip strip-blue-memory"
          onClick={() => handleStripClick('master-03-k-drama-moment')}
          style={{
            transform: 'perspective(1000px) rotateY(-10deg) rotateZ(12deg) scale(0.90)',
            zIndex: 10,
            background: 'linear-gradient(180deg, #3B82F6 0%, #1D4ED8 100%)',
            color: '#FFFFFF',
            borderRadius: '16px',
            padding: '0.85rem 0.65rem',
            boxShadow: '0 20px 40px rgba(29, 78, 216, 0.35)',
            cursor: 'pointer',
          }}
          title="Our Memory 우리의 추억"
        >
          <div style={{ fontSize: '0.65rem', opacity: 0.9, textAlign: 'center', letterSpacing: '0.05em' }}>
            우리의 추억
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', fontWeight: 800, textAlign: 'center', marginBottom: '0.5rem' }}>
            Our Memory
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {photosOurMemory.map((url, i) => (
              <div key={i} style={{ width: '98px', height: '78px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.2)' }}>
                <img src={url} alt="Our memory" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', fontSize: '0.65rem' }}>
            <span>Sweet Day</span>
            <span>📷</span>
          </div>
        </div>

      </div>
    </div>
  );
};
