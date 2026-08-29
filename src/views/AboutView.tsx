import React from 'react';
import { ArrowLeft, Sparkles, LayoutGrid, Wand2, Camera, ShieldCheck, Mail } from 'lucide-react';

interface AboutViewProps {
  onBack?: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onBack }) => {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '720px',
        margin: '0 auto',
        padding: '1.5rem 1rem 4rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        animation: 'fadeIn 0.3s ease-in-out',
      }}
    >
      {/* Top Header */}
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
              transition: 'transform 0.2s ease',
            }}
            title="Kembali"
          >
            <ArrowLeft size={20} />
          </button>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '2.2rem',
              fontWeight: 800,
              color: 'var(--color-burgundy-deep)',
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            Tentang
          </h1>
          <Sparkles size={24} color="#F43F5E" fill="#FECDD3" />
        </div>
      </div>

      {/* Main App Description Card */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: '24px',
          padding: '1.5rem',
          border: '1px solid #F3ECE6',
          boxShadow: '0 8px 24px rgba(92, 6, 18, 0.04)',
          display: 'flex',
          gap: '1.25rem',
          alignItems: 'flex-start',
        }}
      >
        {/* Pink Camera App Icon */}
        <div
          style={{
            width: '68px',
            height: '68px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #FFE4E6 0%, #FECDD3 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#E11D48',
            flexShrink: 0,
            boxShadow: '0 6px 16px rgba(244, 63, 94, 0.18)',
            border: '2px solid #ffffff',
          }}
        >
          <Camera size={34} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-burgundy-deep)', margin: 0 }}>
              PixBooth
            </h2>
            <span style={{ fontSize: '0.85rem', color: '#A1A1AA', fontWeight: 600 }}>v1.0.0</span>
          </div>

          <p style={{ fontSize: '0.92rem', color: 'var(--color-neutral-sub)', lineHeight: 1.6, margin: 0 }}>
            <strong style={{ color: 'var(--color-neutral-dark)' }}>PixBooth</strong> adalah aplikasi web photobooth yang membantu kamu mengabadikan setiap momen berharga dengan berbagai frame aesthetic, lucu, dan customizable.
          </p>
        </div>
      </div>

      {/* 4 Feature Columns Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '1rem',
          width: '100%',
        }}
      >
        {/* Item 1: Frame Unik */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.5rem' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: '#FFF1F2',
              border: '1px solid #FECDD3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#E11D48',
            }}
          >
            <LayoutGrid size={22} />
          </div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--color-neutral-dark)', margin: 0 }}>
            Frame Unik
          </h4>
          <p style={{ fontSize: '0.78rem', color: 'var(--color-neutral-sub)', margin: 0, lineHeight: 1.35 }}>
            Banyak pilihan frame menarik
          </p>
        </div>

        {/* Item 2: Kustomisasi */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.5rem' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: '#FFF1F2',
              border: '1px solid #FECDD3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#E11D48',
            }}
          >
            <Wand2 size={22} />
          </div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--color-neutral-dark)', margin: 0 }}>
            Kustomisasi
          </h4>
          <p style={{ fontSize: '0.78rem', color: 'var(--color-neutral-sub)', margin: 0, lineHeight: 1.35 }}>
            Teks, stiker, filter & warna
          </p>
        </div>

        {/* Item 3: Kualitas Tinggi */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.5rem' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: '#FFF1F2',
              border: '1px solid #FECDD3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#E11D48',
            }}
          >
            <Camera size={22} />
          </div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--color-neutral-dark)', margin: 0 }}>
            Kualitas Tinggi
          </h4>
          <p style={{ fontSize: '0.78rem', color: 'var(--color-neutral-sub)', margin: 0, lineHeight: 1.35 }}>
            Hasil foto jernih dan tajam
          </p>
        </div>

        {/* Item 4: Privasi Aman */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.5rem' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: '#FFF1F2',
              border: '1px solid #FECDD3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#E11D48',
            }}
          >
            <ShieldCheck size={22} />
          </div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--color-neutral-dark)', margin: 0 }}>
            Privasi Aman
          </h4>
          <p style={{ fontSize: '0.78rem', color: 'var(--color-neutral-sub)', margin: 0, lineHeight: 1.35 }}>
            Foto kamu aman dan terlindungi
          </p>
        </div>
      </div>

      {/* Bottom Feedback Box */}
      <div
        style={{
          background: '#FFF7ED',
          border: '1px solid #FFEDD5',
          borderRadius: '22px',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          boxShadow: '0 6px 16px rgba(251, 146, 60, 0.06)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <span style={{ fontSize: '0.92rem', color: '#9A3412', fontWeight: 700 }}>
            Punya saran atau masukan?
          </span>
          <span style={{ fontSize: '0.88rem', color: 'var(--color-neutral-sub)' }}>
            Kirim ke: <strong style={{ color: 'var(--color-burgundy-deep)', fontWeight: 800 }}>support@pixbooth.com</strong>
          </span>
        </div>

        {/* Cute Love Letter Graphic */}
        <div
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            background: '#FFE4E6',
            border: '1px solid #FECDD3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#E11D48',
            fontSize: '1.3rem',
            flexShrink: 0,
          }}
        >
          <Mail size={22} color="#E11D48" />
        </div>
      </div>
    </div>
  );
};
