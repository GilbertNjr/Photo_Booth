import React from 'react';
import { ArrowLeft, LayoutGrid, Camera, Palette, Download } from 'lucide-react';
import { ManekiNekoCatSVG } from '../components/Common/JapaneseDecorAssets';

interface HowToUseViewProps {
  onBack?: () => void;
}

export const HowToUseView: React.FC<HowToUseViewProps> = ({ onBack }) => {
  const steps = [
    {
      num: '01',
      title: 'Pilih Frame',
      desc: 'Pilih frame favoritmu yang sesuai dengan gayamu.',
      icon: LayoutGrid,
    },
    {
      num: '02',
      title: 'Ambil Foto',
      desc: 'Ambil foto melalui kamera atau galeri kamu.',
      icon: Camera,
    },
    {
      num: '03',
      title: 'Edit & Hias',
      desc: 'Tambahkan teks, stiker, filter dan dekorasi sesuai selera.',
      icon: Palette,
    },
    {
      num: '04',
      title: 'Simpan & Bagikan',
      desc: 'Simpan hasil fotomu atau cetak dan bagikan ke orang tersayang!',
      icon: Download,
    },
  ];

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
          <span>Cara Pakai</span>
          <span>🌸</span>
        </h2>

        <p style={{ fontSize: '0.92rem', color: '#6B7280', margin: 0, fontWeight: 500 }}>
          Ikuti langkah mudah berikut dan abadikan momen terbaikmu!
        </p>
      </div>

      {/* 4 Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          width: '100%',
        }}
      >
        {steps.map((step) => {
          const IconComponent = step.icon;
          return (
            <div
              key={step.num}
              style={{
                background: '#FFFFFF',
                borderRadius: '24px',
                padding: '1.5rem 1.25rem',
                border: '1px solid #F3ECE6',
                boxShadow: '0 8px 24px rgba(122, 28, 40, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Badge Number */}
              <div
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  color: '#991B1B',
                  background: '#FFE4E6',
                  width: '38px',
                  height: '38px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {step.num}
              </div>

              {/* Title & Desc */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-neutral-dark)', margin: 0 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: 0, lineHeight: 1.5 }}>
                  {step.desc}
                </p>
              </div>

              {/* Icon Illustration Box */}
              <div
                style={{
                  marginTop: 'auto',
                  alignSelf: 'flex-end',
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: '#FFF1F2',
                  border: '1px stroke #FECDD3',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#D90429',
                }}
              >
                <IconComponent size={24} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Light Pink Tips Banner with Maneki Neko Cat */}
      <div
        style={{
          background: 'linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 100%)',
          border: '1px solid #FECDD3',
          borderRadius: '24px',
          padding: '1.25rem 1.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          boxShadow: '0 6px 20px rgba(244, 63, 94, 0.08)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <span style={{ fontSize: '1.5rem' }}>💡</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#991B1B' }}>
              Tips
            </span>
            <p style={{ fontSize: '0.88rem', color: '#881337', margin: 0, fontWeight: 500, lineHeight: 1.4 }}>
              Gunakan pencahayaan cukup dan kamera berkualitas untuk hasil foto terbaik!
            </p>
          </div>
        </div>

        {/* Japanese Lucky Cat Illustration */}
        <div style={{ flexShrink: 0 }}>
          <ManekiNekoCatSVG width={75} height={75} />
        </div>
      </div>
    </div>
  );
};
