import React from 'react';
import { ArrowLeft, Sparkles, Star, Download, Printer, Camera, Heart, Smile, Type } from 'lucide-react';

interface HowToUseViewProps {
  onBack?: () => void;
}

export const HowToUseView: React.FC<HowToUseViewProps> = ({ onBack }) => {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '720px',
        margin: '0 auto',
        padding: '1.5rem 1rem 4rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.75rem',
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
            Cara Pakai
          </h1>
          <Sparkles size={24} color="#F43F5E" fill="#FECDD3" />
        </div>

        <p
          style={{
            fontSize: '0.95rem',
            color: 'var(--color-neutral-sub)',
            margin: 0,
            textAlign: 'center',
            maxWidth: '460px',
            lineHeight: 1.4,
          }}
        >
          Ikuti langkah mudah berikut dan abadikan momen terbaikmu!
        </p>
      </div>

      {/* Step 01: Pilih Frame */}
      <div className="how-to-card">
        <div className="how-to-content">
          <div className="how-to-badge">01</div>
          <div className="how-to-text">
            <h3 className="how-to-title">Pilih Frame</h3>
            <p className="how-to-desc">
              Pilih frame favoritmu yang sesuai dengan gaya dan suasana momenmu.
            </p>
          </div>
        </div>
        <div className="how-to-illustration">
          {/* Mini Frame Strip Illustration */}
          <div className="illust-frame-strip">
            <div className="illust-photo-box" />
            <div className="illust-photo-box" />
            <div className="illust-photo-box" />
            <span className="illust-sparkle">✨</span>
          </div>
        </div>
      </div>

      {/* Step 02: Ambil Foto */}
      <div className="how-to-card">
        <div className="how-to-content">
          <div className="how-to-badge">02</div>
          <div className="how-to-text">
            <h3 className="how-to-title">Ambil Foto</h3>
            <p className="how-to-desc">
              Ambil foto sesuai jumlah yang dibutuhkan dengan hitungan mundur.
            </p>
          </div>
        </div>
        <div className="how-to-illustration">
          {/* Camera + Photo Strip Graphic */}
          <div className="illust-camera-group">
            <div className="illust-camera-body">
              <Camera size={26} color="#800020" />
            </div>
            <div className="illust-mini-strip">
              <div className="illust-mini-photo" />
              <div className="illust-mini-photo" />
            </div>
          </div>
        </div>
      </div>

      {/* Step 03: Edit & Hiasi */}
      <div className="how-to-card">
        <div className="how-to-content">
          <div className="how-to-badge">03</div>
          <div className="how-to-text">
            <h3 className="how-to-title">Edit & Hiasi</h3>
            <p className="how-to-desc">
              Tambahkan teks, stiker, filter, dan dekorasi sesuai selera kamu.
            </p>
          </div>
        </div>
        <div className="how-to-illustration">
          {/* Decorative Edit Badges */}
          <div className="illust-edit-badges">
            <div className="illust-pill-badge">
              <Type size={14} color="#800020" />
              <span>Aa</span>
            </div>
            <div className="illust-pill-badge">
              <Smile size={14} color="#F59E0B" />
              <span>🧸</span>
            </div>
            <div className="illust-pill-badge">
              <Heart size={14} color="#EF4444" fill="#EF4444" />
            </div>
          </div>
        </div>
      </div>

      {/* Step 04: Simpan & Bagikan */}
      <div className="how-to-card">
        <div className="how-to-content">
          <div className="how-to-badge">04</div>
          <div className="how-to-text">
            <h3 className="how-to-title">Simpan & Bagikan</h3>
            <p className="how-to-desc">
              Simpan hasil fotomu atau cetak dan bagikan ke orang tersayang!
            </p>
          </div>
        </div>
        <div className="how-to-illustration">
          {/* Save & Print Badges */}
          <div className="illust-share-group">
            <div className="illust-icon-circle">
              <Download size={16} color="#800020" />
            </div>
            <div className="illust-icon-circle">
              <Printer size={16} color="#800020" />
            </div>
            <div className="illust-mini-strip">
              <div className="illust-mini-photo" />
              <div className="illust-mini-photo" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tips Card */}
      <div
        style={{
          background: '#FFF1F2',
          border: '1px solid #FECDD3',
          borderRadius: '20px',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          boxShadow: '0 6px 16px rgba(244, 63, 94, 0.05)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#E11D48', fontWeight: 800, fontSize: '0.95rem' }}>
          <Star size={18} fill="#E11D48" color="#E11D48" />
          <span>Tips</span>
        </div>
        <p style={{ fontSize: '0.88rem', color: '#9F1239', margin: 0, lineHeight: 1.5, fontWeight: 500 }}>
          Pastikan pencahayaan cukup dan kamera berada di posisi terbaik untuk hasil foto yang maksimal ✨
        </p>
      </div>
    </div>
  );
};
