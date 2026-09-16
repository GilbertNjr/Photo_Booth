import React, { useState } from 'react';
import { ArrowLeft, Sparkles, LayoutGrid, Wand2, Camera, ShieldCheck, Mail } from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';
import { FeedbackModal } from '../components/Common/FeedbackModal';

interface AboutViewProps {
  onBack?: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onBack }) => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
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
        {/* Official Brand Logo Box */}
        <div
          style={{
            width: '90px',
            height: '90px',
            borderRadius: '20px',
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 8px 24px rgba(217, 4, 41, 0.12)',
            border: '1.5px solid #FCE7F3',
            padding: '0.4rem',
            overflow: 'hidden',
          }}
        >
          <img
            src="/pixbooth-logo.png"
            alt="Pixbooth Official Logo"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-burgundy-deep)', margin: 0 }}>
              PixBooth
            </h2>
            <span style={{ fontSize: '0.85rem', color: '#800020', fontWeight: 700, background: 'rgba(128, 0, 32, 0.08)', padding: '0.1rem 0.5rem', borderRadius: '9999px' }}>
              {APP_CONFIG.version}
            </span>
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

      {/* Bottom Feedback Box (Interactive Banner) */}
      <div
        onClick={() => setIsFeedbackOpen(true)}
        role="button"
        tabIndex={0}
        style={{
          background: 'linear-gradient(135deg, #FFF7ED, #FFF1E6)',
          border: '1.5px solid #FED7AA',
          borderRadius: '22px',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          boxShadow: '0 8px 20px rgba(251, 146, 60, 0.1)',
          cursor: 'pointer',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 12px 28px rgba(251, 146, 60, 0.18)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 8px 20px rgba(251, 146, 60, 0.1)';
        }}
        title="Klik untuk membuka formulir masukan & saran"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <span style={{ fontSize: '0.94rem', color: '#9A3412', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span>Punya saran atau masukan?</span>
            <span style={{ fontSize: '0.75rem', background: '#FFEDD5', color: '#C2410C', padding: '0.1rem 0.45rem', borderRadius: '9999px' }}>
              Klik di sini ✨
            </span>
          </span>
          <span style={{ fontSize: '0.88rem', color: 'var(--color-neutral-sub)' }}>
            Kirim ke: <strong style={{ color: 'var(--color-burgundy-deep)', fontWeight: 800 }}>{APP_CONFIG.supportEmail}</strong>
          </span>
        </div>

        {/* Cute Love Letter Graphic Button */}
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFE4E6, #FECDD3)',
            border: '1px solid #FDA4AF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#E11D48',
            fontSize: '1.3rem',
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(225, 29, 72, 0.15)',
          }}
        >
          <Mail size={22} color="#E11D48" />
        </div>
      </div>

      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
      />
    </div>
  );
};
