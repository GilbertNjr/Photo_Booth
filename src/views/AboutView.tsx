import React from 'react';
import { ArrowLeft, LayoutGrid, Wand2, Camera, ShieldCheck, Mail } from 'lucide-react';

interface AboutViewProps {
  onBack?: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onBack }) => {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1080px',
        margin: '0 auto',
        padding: '2.5rem 1rem 3rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      {/* Section Header */}
      <div style={{ position: 'relative', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
        {onBack && (
          <button
            onClick={onBack}
            style={{
              position: 'absolute',
              left: 0,
              top: '4px',
              background: '#ffffff',
              border: '1px solid var(--color-border)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--color-burgundy-deep)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            }}
            title="Kembali"
          >
            <ArrowLeft size={20} />
          </button>
        )}

        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '2rem',
            fontWeight: 800,
            color: 'var(--color-burgundy-deep)',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span>Tentang PixBooth</span>
          <span>🌸</span>
        </h2>
      </div>

      {/* Main Grid: Left Logo Card + Right 4 Features Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          alignItems: 'stretch',
        }}
      >
        {/* Left App Info Card */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: '1.75rem',
            border: '1px solid #F3ECE6',
            boxShadow: '0 8px 24px rgba(122, 28, 40, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            justifyContent: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: '#FFF1F2',
                border: '1px solid #FECDD3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.35rem',
                flexShrink: 0,
              }}
            >
              <img src="/pixbooth-logo.png" alt="Pixbooth Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-burgundy-deep)', margin: 0 }}>
                  PixBooth
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#9CA3AF', fontWeight: 600 }}>v1.0.0</span>
              </div>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: '#6B7280', lineHeight: 1.6, margin: 0 }}>
            PixBooth adalah aplikasi web photobooth yang membantu kamu mengabadikan setiap momen berharga dengan berbagai frame aesthetic, lucu, dan customizable.
          </p>
        </div>

        {/* Right 4 Features Card */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1rem',
          }}
        >
          {/* Feature 1 */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              padding: '1.25rem',
              border: '1px solid #F3ECE6',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '0.5rem',
            }}
          >
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#FFF1F2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D90429' }}>
              <LayoutGrid size={20} />
            </div>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--color-neutral-dark)', margin: 0 }}>
              Frame Unik
            </h4>
            <span style={{ fontSize: '0.76rem', color: '#6B7280' }}>Bingkai eksklusif berbagai tema</span>
          </div>

          {/* Feature 2 */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              padding: '1.25rem',
              border: '1px solid #F3ECE6',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '0.5rem',
            }}
          >
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#FFF1F2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D90429' }}>
              <Wand2 size={20} />
            </div>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--color-neutral-dark)', margin: 0 }}>
              Kustomisasi
            </h4>
            <span style={{ fontSize: '0.76rem', color: '#6B7280' }}>Teks, stiker, filter & warna</span>
          </div>

          {/* Feature 3 */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              padding: '1.25rem',
              border: '1px solid #F3ECE6',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '0.5rem',
            }}
          >
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#FFF1F2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D90429' }}>
              <Camera size={20} />
            </div>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--color-neutral-dark)', margin: 0 }}>
              Kualitas Tinggi
            </h4>
            <span style={{ fontSize: '0.76rem', color: '#6B7280' }}>Hasil foto jernih dan tajam</span>
          </div>

          {/* Feature 4 */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              padding: '1.25rem',
              border: '1px solid #F3ECE6',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '0.5rem',
            }}
          >
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#FFF1F2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D90429' }}>
              <ShieldCheck size={20} />
            </div>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--color-neutral-dark)', margin: 0 }}>
              Privasi Aman
            </h4>
            <span style={{ fontSize: '0.76rem', color: '#6B7280' }}>Foto kamu aman dan terlindungi</span>
          </div>
        </div>
      </div>

      {/* Bottom Feedback Banner */}
      <div
        style={{
          background: '#FFF7ED',
          border: '1px solid #FFEDD5',
          borderRadius: '24px',
          padding: '1.25rem 1.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          boxShadow: '0 6px 20px rgba(251, 146, 60, 0.08)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <span style={{ fontSize: '0.92rem', color: '#9A3412', fontWeight: 700 }}>
            Punya saran atau masukan?
          </span>
          <span style={{ fontSize: '0.88rem', color: '#6B7280' }}>
            Kirim ke <strong style={{ color: 'var(--color-burgundy-deep)', fontWeight: 800 }}>support@pixbooth.com</strong>
          </span>
        </div>

        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: '#FFE4E6',
            border: '1px solid #FECDD3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#D90429',
            flexShrink: 0,
          }}
        >
          <Mail size={22} color="#D90429" />
        </div>
      </div>
    </div>
  );
};
