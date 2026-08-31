import React from 'react';
import { SakuraBranchSVG, PagodaTempleSVG } from '../Common/JapaneseDecorAssets';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        background: '#FAF5F0',
        borderTop: '1px solid #EFE4D8',
        padding: '3rem 1.5rem 2.5rem',
        position: 'relative',
        overflow: 'hidden',
        marginTop: '3rem',
        width: '100%',
      }}
    >
      {/* Decorative Japanese Corner Elements */}
      <SakuraBranchSVG style={{ position: 'absolute', bottom: 0, left: 0, opacity: 0.7 }} width={220} height={160} />
      <PagodaTempleSVG style={{ position: 'absolute', bottom: 0, right: 0, opacity: 0.15 }} width={200} height={160} color="#7A1C28" />

      <div
        style={{
          maxWidth: '1080px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Brand Logo & Name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <img src="/pixbooth-logo.png" alt="Pixbooth Logo" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} />
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.4rem',
              fontWeight: 900,
              color: 'var(--color-burgundy-deep)',
              letterSpacing: '0.08em',
            }}
          >
            PIXBOOTH
          </span>
        </div>

        {/* Tagline */}
        <p style={{ fontSize: '0.9rem', color: '#6B7280', maxWidth: '520px', margin: 0, fontWeight: 500, lineHeight: 1.5 }}>
          Abadikan setiap momen estetik dengan cetakan digital instan beresolusi tinggi ✦
        </p>

        {/* Badges Line */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.65rem', margin: '0.5rem 0' }}>
          <span
            style={{
              background: '#FFFFFF',
              border: '1px solid #F3ECE6',
              padding: '0.45rem 1.1rem',
              borderRadius: '9999px',
              fontSize: '0.82rem',
              fontWeight: 700,
              color: 'var(--color-burgundy-deep)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            🌸 Frame Studio Korea
          </span>
          <span
            style={{
              background: '#FFFFFF',
              border: '1px solid #F3ECE6',
              padding: '0.45rem 1.1rem',
              borderRadius: '9999px',
              fontSize: '0.82rem',
              fontWeight: 700,
              color: 'var(--color-burgundy-deep)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            📷 Kualitas HD DPI
          </span>
          <span
            style={{
              background: '#FFFFFF',
              border: '1px solid #F3ECE6',
              padding: '0.45rem 1.1rem',
              borderRadius: '9999px',
              fontSize: '0.82rem',
              fontWeight: 700,
              color: 'var(--color-burgundy-deep)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
          >
            ⚡ 100% Instan & Gratis
          </span>
        </div>

        {/* Divider */}
        <div style={{ width: '100%', maxWidth: '480px', height: '1px', background: '#EFE4D8', margin: '0.25rem 0' }} />

        {/* Crafted & Copyright Text */}
        <div style={{ fontSize: '0.82rem', color: '#6B7280', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <span>Dibuat dengan ❤️ untuk kenangan terbaik Anda</span>
          <span style={{ fontSize: '0.76rem', color: '#9CA3AF', fontWeight: 600 }}>© 2026 PixBooth Studio ✦</span>
        </div>
      </div>
    </footer>
  );
};
