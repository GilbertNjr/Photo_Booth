import React from 'react';
import { Camera, Smile, Image, Heart } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', paddingBottom: '100px', width: '100%', maxWidth: '960px', margin: '0 auto' }}>
      {/* Top Section: Our Story */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          alignItems: 'center',
          marginTop: '1rem',
        }}
      >
        {/* Left Column: Text */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Heart size={32} color="#f43f5e" fill="#fda4af" />
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '2.8rem',
              fontWeight: 800,
              color: 'var(--color-burgundy-deep)',
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            Our Story
          </h1>

          <p
            style={{
              color: 'var(--color-neutral-sub)',
              fontSize: '1.05rem',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            We believe every moment is worth keeping. PixBooth brings the classic, playful experience of a photo booth right to your device, blending modern technology with a nostalgic scrapbook aesthetic.
          </p>
        </div>

        {/* Right Column: Hero Vintage Card Illustration */}
        <div
          style={{
            position: 'relative',
            background: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            padding: '1.75rem',
            boxShadow: '0 16px 40px rgba(92, 6, 18, 0.08)',
            border: '1px solid var(--color-border-soft)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              background: '#fcf6f0',
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
              transform: 'rotate(-2deg)',
            }}
          >
            {/* SVG Vintage Photo Strip Mockup */}
            <div
              style={{
                width: '180px',
                background: '#ffffff',
                padding: '12px 12px 28px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              {[
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&auto=format&fit=crop&q=80',
              ].map((url, i) => (
                <div
                  key={i}
                  style={{
                    width: '100%',
                    height: '80px',
                    background: '#f3ece7',
                    overflow: 'hidden',
                  }}
                >
                  <img src={url} alt="Memory strip sample" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(0.2)' }} />
                </div>
              ))}
              <span style={{ fontSize: '0.65rem', color: '#881337', textAlign: 'center', fontWeight: 800, marginTop: '4px', letterSpacing: '0.05em' }}>
                PIXBOOTH • 2026
              </span>
            </div>
          </div>

          {/* Floating Camera Sticker Badge */}
          <div
            style={{
              position: 'absolute',
              bottom: '-12px',
              right: '-12px',
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: '#ffe4e6',
              border: '2px solid #f43f5e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(244, 63, 94, 0.25)',
              color: '#e11d48',
            }}
          >
            <Camera size={22} />
          </div>
        </div>
      </div>

      {/* Middle Section: Why PixBooth? */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.75rem', marginTop: '1rem' }}>
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '2.2rem',
            fontWeight: 800,
            color: 'var(--color-burgundy-deep)',
            textAlign: 'center',
            margin: 0,
          }}
        >
          Why PixBooth?
        </h2>

        {/* 3 Feature Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
            width: '100%',
          }}
        >
          {/* Card 1 */}
          <div
            style={{
              background: '#faf5f2',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '1rem',
              border: '1px solid rgba(92, 6, 18, 0.05)',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: '#fecdd3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#881337',
              }}
            >
              <Camera size={26} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-burgundy-deep)', margin: 0 }}>
              Aesthetic Frames
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--color-neutral-sub)', lineHeight: 1.5, margin: 0 }}>
              Choose from dozens of high-fidelity, Life4Cuts inspired frames to perfectly border your memories.
            </p>
          </div>

          {/* Card 2 */}
          <div
            style={{
              background: '#faf5f2',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '1rem',
              border: '1px solid rgba(92, 6, 18, 0.05)',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: '#fecdd3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#881337',
              }}
            >
              <Smile size={26} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-burgundy-deep)', margin: 0 }}>
              Custom Stickers
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--color-neutral-sub)', lineHeight: 1.5, margin: 0 }}>
              Decorate your strips with our signature hand-drawn doodles, ribbons, and sparkling accents.
            </p>
          </div>

          {/* Card 3 */}
          <div
            style={{
              background: '#faf5f2',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '1rem',
              border: '1px solid rgba(92, 6, 18, 0.05)',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: '#fecdd3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#881337',
              }}
            >
              <Image size={26} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-burgundy-deep)', margin: 0 }}>
              Instant Memories
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--color-neutral-sub)', lineHeight: 1.5, margin: 0 }}>
              Save, share, or print high-resolution digital strips instantly. Your memories, beautifully preserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
